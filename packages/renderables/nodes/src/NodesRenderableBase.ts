/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model } from '@luma.gl/engine'
// This is causing problems downstream for some reason
// @ts-ignore
import { cssToDevicePixels } from '@luma.gl/gltools'
import { Buffer, Framebuffer, readPixelsToArray } from '@luma.gl/webgl'
import createModel from './model'
import {
	RenderOptions,
	EventsMixin,
	UserInteractionType,
	Maybe,
} from '@graspologic/common'
import { Node, nodeType, NodeStore } from '@graspologic/graph'
import {
	createIdFactory,
	GL_DEPTH_TEST,
	encodePickingColor,
	decodePickingColor,
	PickingColor,
	GL_RGBA,
	GL_UNSIGNED_BYTE,
} from '@graspologic/luma-utils'
import { DataboundRenderable } from '@graspologic/renderables-base'

import nodeVS from '@graspologic/renderer-glsl/dist/esm/shaders/node.vs.glsl'

const getNextId = createIdFactory('NodesInstance')
const RENDERER_BACKGROUND_INDEX = 16777214

/**
 * The event interface for the NodesRenderable
 */
export interface NodesRenderableEvents {
	'node:hover'(node: Node | undefined): void
	'node:click'(node: Node | undefined): void
}

// The base nodes renderable class
const NodesBase = EventsMixin<
	NodesRenderableEvents,
	DataboundRenderable<NodeStore>
>(DataboundRenderable as any)

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export class NodesRenderableBase extends NodesBase {
	private readonly model: Model
	private readonly modelBuffer: Buffer
	private readonly translucentModel: Model
	private readonly translucentModelBuffer: Buffer
	private needsDataBind = true

	private pickingSelectedColor: PickingColor | undefined

	/**
	 * Constructor
	 * @param gl The gl context the nodes should be rendered to
	 * @param config The render configuration
	 * @param id The id of the renderable
	 */
	public constructor(private gl: WebGLRenderingContext, id = getNextId()) {
		super()

		const { model, buffer } = createModel(gl, id, nodeVS)
		this.model = model
		this.modelBuffer = buffer

		const {
			model: translucentModel,
			buffer: translucentModelBuffer,
		} = createModel(gl, getNextId(), nodeVS, {
			ALPHA_MODE: 1,
		})

		this.translucentModel = translucentModel
		this.translucentModelBuffer = translucentModelBuffer
	}

	/**
	 * Gets the data type associated with this renderable
	 */
	public get itemType(): symbol {
		return nodeType
	}

	public prepare(options: RenderOptions) {
		const { engineTime, _mousePosition, isCameraMoving, framebuffer } = options

		if (this.data) {
			this.data.engineTime = engineTime || 0

			if (
				!isCameraMoving &&
				_mousePosition &&
				// We only need to compute the picking if there is something actually listening to it
				(this.hasListeners('node:hover') || this.hasListeners('node:click'))
			) {
				this.computeHovered(framebuffer, _mousePosition)
				this.setNeedsRedraw(true)
			}
		}
	}

	/**
	 * Draws the NodesRenderable
	 * @param options The set of render options
	 */
	public render(options: RenderOptions) {
		const {
			modelViewMatrix,
			projectionMatrix,
			config: {
				hideDeselected,
				nodeMinRadius,
				nodeMaxRadius,
				nodeOutline,
				nodeFilteredIds,
			},
			framebuffer,
			canvasPixelSize,
			engineTime,
			weightToPixel,
		} = options
		if (this.shouldRender(options)) {
			this.bindDataToModel()

			// Keep looping redraws until tweening is done
			this.setNeedsRedraw(true)

			const drawConfig = {
				parameters: {
					blend: true,
					depthMask: true,
					[GL_DEPTH_TEST]: true,
				},
				uniforms: {
					uModelView: modelViewMatrix,
					uProjection: projectionMatrix,
					uScreenSize: canvasPixelSize,
					uMinRadius: nodeMinRadius * weightToPixel,
					uMaxRadius: nodeMaxRadius * weightToPixel,
					uTime: engineTime,
					uOutline: nodeOutline ? 1.0 : 0.0,
				},
				framebuffer,
			}
			this.model.draw(drawConfig)
			if (!hideDeselected && nodeFilteredIds && nodeFilteredIds.length > 0) {
				drawConfig.parameters.depthMask = false
				this.translucentModel.draw(drawConfig)
			}
		}
	}

	/**
	 * Binds the data in our databuffer to the model
	 * @param force Force a reload of all the data
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

				const instanceCount = this.data.store.count
				this.model.setInstanceCount(instanceCount)
				this.translucentModel.setInstanceCount(instanceCount)
			}
		}
		return updated
	}

	/**
	 * Handles the given type of user interaction
	 * @param type The type of user interaction
	 */
	public handleUserInteraction(type: UserInteractionType) {
		if (type === 'click') {
			this.emit(
				'node:click',
				this.getNodeByPickingColor(this.pickingSelectedColor),
			)
		}
	}

	/**
	 * Handles when new data has been set on the renderable
	 */
	protected handleSetData(value: NodeStore | undefined): void {
		// We attach this here, because in the onChange handler it is fired after the changes happen
		if (value) {
			value.onAddItem(this.handleNodeAdded)
			value.onRemoveItem(this.handleNodeRemoved)
			value.onAttributeUpdated(this.handleNodeAttributeUpdated)
			for (const node of value.scan()) {
				this.handleNodeAdded(node)
			}
		}
		this.bindDataToModel(true)
		this.setNeedsRedraw(true)
	}

	/**
	 * Handler for when a node is added
	 * @param primitive The primitive to add
	 */
	protected handleNodeAdded = (nodeOrIndex: number | Node) => {
		if (this.enabled && this.data) {
			const node =
				typeof nodeOrIndex === 'number'
					? this.data.itemAt(nodeOrIndex)
					: nodeOrIndex

			// Assign node defaults
			node.saturation = 1
			node.visible = true
			node.pickingColor = encodePickingColor(node.storeId) as [
				number,
				number,
				number,
			]
			this.needsDataBind = true
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Removes a primitive from the scene
	 * @param primitive The primitive to remove
	 */
	protected handleNodeRemoved = (nodeOrIndex: number | Node) => {
		if (this.enabled && this.data) {
			const node =
				typeof nodeOrIndex === 'number'
					? this.data.itemAt(nodeOrIndex)
					: nodeOrIndex

			// Hide the node
			node.visible = false

			this.needsDataBind = true
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Handler for when an attribute for a node is updated
	 */
	private handleNodeAttributeUpdated = () => {
		if (this.enabled && this.data) {
			this.needsDataBind = true
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Compares two picking colors to see if they are equal
	 * @param color1 The first picking color
	 * @param color2 The second picking color
	 */
	private _comparePickingColors(
		color1: PickingColor | undefined,
		color2: PickingColor | undefined,
	) {
		if (color1 && color2) {
			return (
				color1[0] === color2[0] &&
				color1[1] === color2[1] &&
				color1[2] === color2[2]
			)
		}
		return color1 === color2
	}

	/**
	 * Runs the hovered logic to determine what node is being hovered over
	 * @param param0
	 */
	private computeHovered(framebuffer: Framebuffer, mousePosition: any): any {
		framebuffer.clear({ color: [0, 0, 0, 0], depth: true })
		// Render picking colors
		/* eslint-disable camelcase */
		this.model.setUniforms({ picking_uActive: 1 })
		this.model.draw({
			framebuffer,
			parameters: {
				depthMask: true,
				[GL_DEPTH_TEST]: true,
			},
		})
		this.model.setUniforms({ picking_uActive: 0 })
		const devicePixels = cssToDevicePixels(this.gl, mousePosition)
		const deviceX = devicePixels.x + Math.floor(devicePixels.width / 2)
		const deviceY = devicePixels.y + Math.floor(devicePixels.height / 2)

		const pickingSelectedColor = readPixelsToArray(framebuffer, {
			sourceX: deviceX,
			sourceY: deviceY,
			sourceWidth: 1,
			sourceHeight: 1,
			sourceFormat: GL_RGBA,
			sourceType: GL_UNSIGNED_BYTE,
		})

		if (
			!this._comparePickingColors(
				pickingSelectedColor,
				this.pickingSelectedColor,
			)
		) {
			this.pickingSelectedColor = pickingSelectedColor || undefined
			this.emit(
				'node:hover',
				this.getNodeByPickingColor(this.pickingSelectedColor),
			)
		}
		return this.pickingSelectedColor
	}

	/**
	 * Gets the node with the given picking color
	 * @param pickingColor The picking color
	 */
	private getNodeByPickingColor(
		pickingColor: Maybe<PickingColor>,
	): Node | undefined {
		const idx = pickingColor ? decodePickingColor(pickingColor) : -1
		return idx !== RENDERER_BACKGROUND_INDEX && idx >= 0 && this.data
			? this.data.itemAt(idx)
			: undefined
	}

	/**
	 * Determines if the renderable should be rendered
	 * @param options The render options
	 */
	private shouldRender({
		isCameraMoving,
		config: { drawNodes, hideNodesOnMove },
	}: RenderOptions) {
		return this.enabled && drawNodes && (!hideNodesOnMove || !isCameraMoving)
	}
}
