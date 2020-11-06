/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createIdFactory, GL_DEPTH_TEST } from '@graspologic/luma-utils'
import { DirtyableRenderable } from '@graspologic/renderables-base'
import {
	processMinMaxBounds,
	Bounds3D,
	RenderConfiguration,
	RenderOptions,
	ItemBasedRenderable,
	BoundedRenderable,
} from '@graspologic/common'
import { Model } from '@luma.gl/engine'
import { Buffer } from '@luma.gl/webgl'

import createModel from './model'
import { restartTween, readTween } from '@graspologic/animation'
import type { EdgeStore, Edge } from '@graspologic/graph'
import edgeVS from '@graspologic/renderer-glsl/dist/esm/shaders/edge.vs.glsl'
import { edgeType } from '@graspologic/graph'

const getNextId = createIdFactory('EdgesInstance')

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering edges
 */
export class EdgesRenderable
	extends DirtyableRenderable
	implements ItemBasedRenderable, BoundedRenderable {
	private readonly model: Model
	private readonly modelBuffer: Buffer
	private readonly translucentModel: Model
	private readonly translucentModelBuffer: Buffer
	private tweenUntil = 0
	private needsDataBind = true
	private lastEngineTime = 0

	private _data: EdgeStore | undefined

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
	}

	/**
	 * Gets the data type associated with this renderable
	 */
	public get itemType(): symbol {
		return edgeType
	}

	/**
	 * The edge data that should be rendered
	 */
	public get data() {
		return this._data
	}

	/**
	 * Sets the edge data to be rendered
	 */
	public set data(value: EdgeStore | undefined) {
		// We attach this here, because in the onChange handler it can be fired after changes happen
		if (value !== this._data && value) {
			value.onAttributeUpdated(this.handleEdgeAttributeUpdated)
			value.onAddItem(this.handleEdgeAdded)
			value.onRemoveItem(this.handleEdgeRemoved)
			for (const edge of value.scan()) {
				this.handleEdgeAdded(edge)
			}
			this.bindDataToModel(true)
			this.setNeedsRedraw(true)
		}
		this._data = value
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

	public updateEngineTime(engineTime: number) {
		this.lastEngineTime = engineTime
	}

	/**
	 * Draws the EdgeRenderable
	 * @param options The set of render options
	 */
	public draw(options: RenderOptions): void {
		const {
			modelViewMatrix,
			projectionMatrix,
			canvasPixelSize,
			hideDeselected,
			framebuffer,
			engineTime,
		} = options
		if (this.enabled) {
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
		this.setNeedsRedraw(this.tweenUntil > engineTime)
	}

	/**
	 * Computes the bounds of the edges
	 */
	public computeBounds(): Bounds3D | undefined {
		let bounds: Bounds3D | undefined
		// Below is a little more complicated to allow us to set the initial bounds
		// to the first primitives bounds, without doing a "first" check each time
		const iterator = this._data![Symbol.iterator]()
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
		const edge =
			typeof edgeOrIndex === 'number'
				? this.data!.itemAt(edgeOrIndex)
				: edgeOrIndex

		// Assign edge defaults
		edge.saturation = 1
		edge.saturation2 = 1
		edge.visible = true

		this.needsDataBind = true
		this.setNeedsRedraw(true)
	}

	/**
	 * Removes a primitive from the scene
	 * @param primitive The primitive to remove
	 */
	protected handleEdgeRemoved = (edgeOrIndex: number | Edge) => {
		const edge =
			typeof edgeOrIndex === 'number'
				? this.data!.itemAt(edgeOrIndex)
				: edgeOrIndex

		edge.visible = false

		this.needsDataBind = true
		this.setNeedsRedraw(true)
	}

	/**
	 * Handles when an edges attribute is updated
	 */
	protected handleEdgeAttributeUpdated = (
		storeId: number,
		attribute?: string,
		value?: any,
	) => {
		if (!attribute) {
			// This makes sure tweening will renderc
			const posTween = readTween(
				this.data!.store,
				storeId,
				'sourcePosition.tween',
			)
			const targetPositionTween = readTween(
				this.data!.store,
				storeId,
				'targetPosition.tween',
			)
			this.tweenUntil = Math.max(
				this.tweenUntil,
				posTween[0] + posTween[1],
				targetPositionTween[0] + targetPositionTween[1],
			)
		} else {
			// If it just writes 'duration', update it with the engine time
			if (attribute === 'sourcePosition.duration') {
				const engineTime = this.lastEngineTime
				restartTween(
					this.data!.store,
					storeId,
					'sourcePosition.tween',
					engineTime,
				)
				this.tweenUntil = Math.max(this.tweenUntil, value + engineTime)
			} else if (attribute === 'targetPosition.duration') {
				const engineTime = this.lastEngineTime
				restartTween(
					this.data!.store,
					storeId,
					'targetPosition.tween',
					engineTime,
				)
				this.tweenUntil = Math.max(this.tweenUntil, value + engineTime)

				// If they write the whole tween, then update the tween until
			} else if (
				attribute === 'sourcePosition.tween' ||
				attribute === 'targetPosition.tween'
			) {
				this.tweenUntil = Math.max(this.tweenUntil, value[0] + value[1])
			}
		}

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
				const uint8 = this._data!.store.uint8Array
				this.modelBuffer.setData(uint8)
				this.translucentModelBuffer.setData(uint8)

				const instanceCount = this._data!.count
				this.model.setInstanceCount(instanceCount)
				this.translucentModel.setInstanceCount(instanceCount)
			}
		}
		return updated
	}
}
