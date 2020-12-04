/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model } from '@luma.gl/engine'
import { Buffer } from '@luma.gl/webgl'

import createModel from './model'
import {
	processMinMaxBounds,
	Bounds3D,
	RenderConfiguration,
	RenderOptions,
	BoundedRenderable,
	Maybe,
} from '@graspologic/common'
import type { Edge, GraphContainer } from '@graspologic/graph'
import { edgeType } from '@graspologic/graph'
import { createIdFactory, GL_DEPTH_TEST } from '@graspologic/luma-utils'
import { DirtyableRenderable } from '@graspologic/renderables-base'
import edgeVS from '@graspologic/renderer-glsl/dist/esm/shaders/edge.vs.glsl'

const getNextId = createIdFactory('EdgesInstance')

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering edges
 */
export class EdgesRenderable
	extends DirtyableRenderable
	implements BoundedRenderable {
	private readonly model: Model
	private readonly modelBuffer: Buffer
	private readonly translucentModel: Model
	private readonly translucentModelBuffer: Buffer
	private needsDataBind = true

	private _graph: Maybe<GraphContainer>

	/**
	 * Constructor for EdgesRenderable
	 * @param gl The gl context the edges should be rendered to
	 * @param config The render configuration
	 * @param id The id of the renderable
	 */
	public constructor(
		gl: WebGLRenderingContext,
		protected config: RenderConfiguration,
		id = getNextId(),
	) {
		super()
		const { model, buffer } = createModel(gl, id, edgeVS)
		this.model = model
		this.modelBuffer = buffer

		const {
			model: translucentModel,
			buffer: translucentModelBuffer,
		} = createModel(gl, getNextId(), edgeVS, {
			ALPHA_MODE: 1,
		})

		this.translucentModel = translucentModel
		this.translucentModelBuffer = translucentModelBuffer

		config.onDrawEdgesChanged(this.makeDirtyHandler)
		config.onHideEdgesOnMoveChanged(this.makeDirtyHandler)
		config.onEdgeConstantWidthChanged(this.makeDirtyHandler)
		config.onEdgeDepthWriteChanged(this.makeDirtyHandler)
		config.onEdgeAlphaChanged(this.makeDirtyHandler)
		config.onEdgeAntialiasChanged(this.makeDirtyHandler)
		config.onEdgeMinWidthChanged(this.makeDirtyHandler)
		config.onEdgeMaxWidthChanged(this.makeDirtyHandler)
		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredOutSaturationChanged(this.rebuildSaturation)
	}

	/**
	 * Gets the data type associated with this renderable
	 */
	public get itemType(): symbol {
		return edgeType
	}

	public get graph() {
		return this._graph
	}

	public set graph(value: Maybe<GraphContainer>) {
		// We attach this here, because in the onChange handler it is fired after the changes happen
		if (value !== this._graph) {
			this._graph = value
			if (value) {
				value.edges.onAddItem(this.handleEdgeAdded)
				value.edges.onRemoveItem(this.handleEdgeRemoved)
				value.edges.onAttributeUpdated(this.handleEdgeAttributeUpdated)
				for (const edge of value.edges.scan()) {
					this.handleEdgeAdded(edge)
				}
			}
			this.rebuildSaturation()
			this.bindDataToModel(true)
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Returns true if edges behind other edges should not be rendered
	 */
	protected get edgeDepthWrite(): boolean {
		return this.config.edgeDepthWrite
	}

	/**
	 * Returns true if the edges should be rendered using a constant width
	 */
	protected get edgeConstantWidth(): boolean {
		return this.config.edgeConstantWidth
	}

	/**
	 * Returns the min edge with
	 */
	protected get edgeMinWidth(): number {
		return this.config.edgeMinWidth
	}

	/**
	 * Returns the max edge with
	 */
	protected get edgeMaxWidth(): number {
		return this.config.edgeMaxWidth
	}

	/**
	 * Returns the alpha used for the edges
	 */
	protected get edgeAlpha(): number {
		return this.config.edgeAlpha
	}

	/**
	 * Returns true if edges should be anti-aliased
	 */
	protected get edgeAntialias(): boolean {
		return this.config.edgeAntialias
	}

	public prepare({ engineTime }: RenderOptions) {
		if (this.graph) {
			this.graph.edges.engineTime = engineTime
		}
	}

	/**
	 * Draws the EdgeRenderable
	 * @param options The set of render options
	 */
	public render(options: RenderOptions): void {
		const {
			modelViewMatrix,
			projectionMatrix,
			canvasPixelSize,
			config: { hideDeselected },
			framebuffer,
			engineTime,
		} = options
		if (this.shouldRender(options)) {
			this.bindDataToModel()

			const drawConfig = {
				parameters: {
					depthMask: this.edgeDepthWrite,
					[GL_DEPTH_TEST]: true,
					blend: true,
				},
				uniforms: {
					uModelView: modelViewMatrix,
					uProjection: projectionMatrix,
					uScreenSize: canvasPixelSize,
					uConstantSize: this.edgeConstantWidth ? 1 : 0,
					uMinWidth: this.edgeMinWidth,
					uMaxWidth: this.edgeMaxWidth,
					uAlpha: this.edgeAlpha,
					uAntialias: this.edgeAntialias ? 1 : 0,
					uTime: engineTime,
				},
				framebuffer,
			}
			this.model.draw(drawConfig)
			if (!hideDeselected) {
				drawConfig.parameters.depthMask = false
				this.translucentModel.draw(drawConfig)
			}
		}
		this.setNeedsRedraw(true)
	}

	/**
	 * Computes the bounds of the edges
	 */
	public computeBounds(): Bounds3D | undefined {
		let bounds: Bounds3D | undefined
		// Below is a little more complicated to allow us to set the initial bounds
		// to the first primitives bounds, without doing a "first" check each time
		if (this.graph) {
			const iterator = this.graph.edges[Symbol.iterator]()
			if (iterator) {
				let result = iterator.next()
				if (result.value) {
					bounds = this.computeEdgeBounds(result.value)
				}
				while (!result.done) {
					const primBounds = this.computeEdgeBounds(result.value)

					processMinMaxBounds(bounds!, primBounds)

					result = iterator.next()
				}
			}
		}
		return bounds
	}

	/**
	 * Computes the given edges bounds
	 * @param edge The edge to compute the bounds for
	 */
	private computeEdgeBounds(edge: Edge) {
		const source = edge.sourcePosition
		const target = edge.targetPosition
		const rangeX =
			source[0] < target[0] ? [source[0], target[0]] : [target[0], source[0]]
		const rangeY =
			source[1] < target[1] ? [source[1], target[1]] : [target[1], source[1]]
		const rangeZ =
			source[2]! < target[2]! ? [source[2], target[2]] : [target[2], source[2]]
		return {
			x: {
				min: rangeX[0],
				max: rangeX[1],
			},
			y: {
				min: rangeY[0],
				max: rangeY[1],
			},
			z: {
				min: rangeZ[0]!,
				max: rangeZ[1]!,
			},
		}
	}

	/**
	 * Handler for when a node is added
	 * @param primitive The primitive to add
	 */
	protected handleEdgeAdded = (edgeOrIndex: number | Edge) => {
		if (this.graph) {
			const edge =
				typeof edgeOrIndex === 'number'
					? this.graph.edges.itemAt(edgeOrIndex)
					: edgeOrIndex

			// Assign edge defaults
			edge.saturation = 1
			edge.saturation2 = 1
			edge.visible = true

			this.needsDataBind = true
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Removes a primitive from the scene
	 * @param primitive The primitive to remove
	 */
	protected handleEdgeRemoved = (edgeOrIndex: number | Edge) => {
		if (this.graph) {
			const edge =
				typeof edgeOrIndex === 'number'
					? this.graph.edges.itemAt(edgeOrIndex)
					: edgeOrIndex

			edge.visible = false

			this.needsDataBind = true
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Handles when an edges attribute is updated
	 */
	protected handleEdgeAttributeUpdated = (
		storeId: number,
		attribute?: string,
	) => {
		this.needsDataBind = true
		this.setNeedsRedraw(true)
	}

	/**
	 * Binds the data in our databuffer to the model
	 * @param forceAll Force all the attributes to return
	 */
	public bindDataToModel(forceAll = false) {
		let updated = false
		if (this.graph) {
			updated = forceAll || this.needsDataBind
			if (updated) {
				this.needsDataBind = false
				const uint8 = this.graph.edges.store.uint8Array
				this.modelBuffer.setData(uint8)
				this.translucentModelBuffer.setData(uint8)

				const instanceCount = this.graph.edges.count
				this.model.setInstanceCount(instanceCount)
				this.translucentModel.setInstanceCount(instanceCount)
			}
		}
		return updated
	}

	private rebuildSaturation() {
		if (this.graph) {
			const nodes = this.config.nodeFilteredIds
			const allIn =
				!nodes || nodes.length === 0 || nodes.length === this.graph.nodes.count

			const edgeInSat = this.config.edgeFilteredInSaturation
			const edgeOutSat = this.config.edgeFilteredOutSaturation

			if (allIn) {
				for (const edge of this.graph.edges.scan()) {
					edge.saturation = edgeInSat
					edge.saturation2 = edgeInSat
				}
			} else {
				const nodeMap = (nodes || []).reduce((prev, curr) => {
					prev[curr] = true
					return prev
				}, {} as Record<string, boolean>)
				for (const edge of this.graph.edges.scan()) {
					edge.saturation = !!nodeMap[edge.source!] ? edgeInSat : edgeOutSat
					edge.saturation2 = !!nodeMap[edge.target!] ? edgeInSat : edgeOutSat
				}
			}
		}
	}

	/**
	 * Determines if the renderable should be rendered
	 * @param options The render options
	 */
	private shouldRender({
		isCameraMoving,
		config: { drawEdges, hideEdgesOnMove },
	}: RenderOptions) {
		return this.enabled && drawEdges && (!hideEdgesOnMove || !isCameraMoving)
	}
}
