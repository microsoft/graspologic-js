/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model } from '@luma.gl/engine'
import { Buffer } from '@luma.gl/webgl'

import createModel from './model'
import { RenderOptions, Maybe } from '@graspologic/common'
import type { Edge, EdgeStore } from '@graspologic/graph'
import { edgeType } from '@graspologic/graph'
import { createIdFactory, GL_DEPTH_TEST } from '@graspologic/luma-utils'
import { DataboundRenderable } from '@graspologic/renderables-base'
import edgeVS from '@graspologic/renderer-glsl/dist/esm/shaders/edge.vs.glsl'

const getNextId = createIdFactory('EdgesInstance')

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering edges
 */
export class EdgesRenderableBase extends DataboundRenderable<EdgeStore> {
	private readonly model: Model
	private readonly modelBuffer: Buffer
	private readonly translucentModel: Model
	private readonly translucentModelBuffer: Buffer
	private needsDataBind = true

	/**
	 * Constructor for EdgesRenderable
	 * @param gl The gl context the edges should be rendered to
	 * @param id The id of the renderable
	 */
	public constructor(gl: WebGLRenderingContext, id = getNextId()) {
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
	}

	/**
	 * Returns true if edges behind other edges should not be rendered
	 */
	protected get edgeDepthWrite(): boolean {
		return true
	}

	/**
	 * Returns true if the edges should be rendered using a constant width
	 */
	protected get edgeConstantWidth(): boolean {
		return false
	}

	/**
	 * Returns the min edge with
	 */
	protected get edgeMinWidth(): number {
		return 1
	}

	/**
	 * Returns the max edge with
	 */
	protected get edgeMaxWidth(): number {
		return 5
	}

	/**
	 * Returns the alpha used for the edges
	 */
	protected get edgeAlpha(): number {
		return 1
	}

	/**
	 * Returns true if edges should be anti-aliased
	 */
	protected get edgeAntialias(): boolean {
		return true
	}

	/**
	 * Gets the data type associated with this renderable
	 */
	public get itemType(): symbol {
		return edgeType
	}

	public handleSetData(value: Maybe<EdgeStore>) {
		// We attach this here, because in the onChange handler it is fired after the changes happen
		if (value) {
			value.onAddItem(this.handleEdgeAdded)
			value.onRemoveItem(this.handleEdgeRemoved)
			value.onAttributeUpdated(this.handleEdgeAttributeUpdated)
			for (const edge of value.scan()) {
				this.handleEdgeAdded(edge)
			}
		}
		this.bindDataToModel(true)
		this.setNeedsRedraw(true)
	}

	public prepare({ engineTime }: RenderOptions) {
		if (this.data) {
			this.data.engineTime = engineTime
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
	 * Handler for when a node is added
	 * @param primitive The primitive to add
	 */
	protected handleEdgeAdded = (edgeOrIndex: number | Edge) => {
		if (this.data) {
			const edge =
				typeof edgeOrIndex === 'number'
					? this.data.itemAt(edgeOrIndex)
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
		if (this.data) {
			const edge =
				typeof edgeOrIndex === 'number'
					? this.data.itemAt(edgeOrIndex)
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
		if (this.data) {
			updated = forceAll || this.needsDataBind
			if (updated) {
				this.needsDataBind = false
				const uint8 = this.data.store.uint8Array
				this.modelBuffer.setData(uint8)
				this.translucentModelBuffer.setData(uint8)

				const instanceCount = this.data.count
				this.model.setInstanceCount(instanceCount)
				this.translucentModel.setInstanceCount(instanceCount)
			}
		}
		return updated
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
