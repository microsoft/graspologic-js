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
	Bounds3D,
	RenderOptions,
	RenderConfiguration,
	BoundedRenderable,
	EventsMixin,
	UserInteractionType,
	Maybe,
} from '@graspologic/common'
import { Node, nodeType, GraphContainer } from '@graspologic/graph'
import {
	createIdFactory,
	GL_DEPTH_TEST,
	encodePickingColor,
	decodePickingColor,
	PickingColor,
	GL_RGBA,
	GL_UNSIGNED_BYTE,
} from '@graspologic/luma-utils'
import { DirtyableRenderable } from '@graspologic/renderables-base'

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
const NodesBase = EventsMixin<NodesRenderableEvents, DirtyableRenderable>(
	DirtyableRenderable,
)

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export class NodesRenderable extends NodesBase implements BoundedRenderable {
	private readonly model: Model
	private readonly modelBuffer: Buffer
	private readonly translucentModel: Model
	private readonly translucentModelBuffer: Buffer
	private needsDataBind = true
	private _graph: Maybe<GraphContainer>

	private pickingSelectedColor: PickingColor | undefined

	/**
	 * Constructor
	 * @param gl The gl context the nodes should be rendered to
	 * @param config The render configuration
	 * @param id The id of the renderable
	 */
	public constructor(
		private gl: WebGLRenderingContext,
		protected config: RenderConfiguration,
		id = getNextId(),
	) {
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

		config.onNodeMinRadiusChanged(this.makeDirtyHandler)
		config.onNodeMaxRadiusChanged(this.makeDirtyHandler)
		config.onNodeOutlineChanged(this.makeDirtyHandler)
		config.onDrawNodesChanged(this.makeDirtyHandler)
		config.onHideNodesOnMoveChanged(this.makeDirtyHandler)
		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
	}

	public get graph() {
		return this._graph
	}

	public set graph(value: Maybe<GraphContainer>) {
		// We attach this here, because in the onChange handler it is fired after the changes happen
		if (value !== this._graph && value) {
			this._graph = value
			if (value) {
				value.nodes.onAttributeUpdated(this.handleNodeAttributeUpdated)
				value.nodes.onAddItem(this.handleNodeAdded)
				value.nodes.onRemoveItem(this.handleNodeRemoved)
				let node: Node
				for (node of value.nodes.scan()) {
					this.handleNodeAdded(node)
				}
			}
			this.rebuildSaturation()
			this.bindDataToModel(true)
			this.setNeedsRedraw(true)
		}
		this._graph = value
	}

	/**
	 * Gets the data type associated with this renderable
	 */
	public get itemType(): symbol {
		return nodeType
	}

	public prepare(options: RenderOptions) {
		const { engineTime, _mousePosition, isCameraMoving, framebuffer } = options

		if (this.graph) {
			this.graph.nodes.engineTime = engineTime || 0

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
	 * Computes the bounds of the nodes
	 */
	public computeBounds(): Bounds3D | undefined {
		let bounds: Bounds3D | undefined
		let hasWeights = false
		let node: Node
		let radius = 0
		if (this.graph) {
			for (node of this.graph.nodes.scan()) {
				radius = node.radius || 0
				if (!radius) {
					hasWeights = true
				}

				if (!bounds) {
					bounds = {
						x: {
							min: node.x - radius,
							max: node.x + radius,
						},
						y: {
							min: node.y - radius,
							max: node.y + radius,
						},
						z: {
							min: node.z - radius,
							max: node.z + radius,
						},
					}
				} else {
					bounds!.x.min = Math.min(bounds!.x.min, node.x - radius)
					bounds!.x.max = Math.max(bounds!.x.max, node.x + radius)

					bounds!.y.min = Math.min(bounds!.y.min, node.y - radius)
					bounds!.y.max = Math.max(bounds!.y.max, node.y + radius)

					bounds!.z.min = Math.min(bounds!.z.min, node.z - radius)
					bounds!.z.max = Math.max(bounds!.z.max, node.z + radius)
				}
			}
			const scale = hasWeights
				? this.config.nodeMaxRadius /
				  Math.min(this.config.width, this.config.height)
				: 0
			if (bounds) {
				const xWeightPadding = ((bounds.x.max - bounds.x.min) * scale) / 2.0
				const yWeightPadding = ((bounds.y.max - bounds.y.min) * scale) / 2.0
				return {
					x: {
						min: bounds.x.min - xWeightPadding,
						max: bounds.x.max + xWeightPadding,
					},
					y: {
						min: bounds.y.min - yWeightPadding,
						max: bounds.y.max + yWeightPadding,
					},
					z: {
						min: bounds.z.min - yWeightPadding,
						max: bounds.z.max + yWeightPadding,
					},
				}
			}
		}
	}

	/**
	 * Binds the data in our databuffer to the model
	 * @param force Force a reload of all the data
	 */
	public bindDataToModel(forceAll = false) {
		let updated = false
		if (this.graph) {
			updated = forceAll || this.needsDataBind
			if (updated) {
				this.needsDataBind = false
				const uint8 = this.graph.nodes!.store.uint8Array
				this.modelBuffer.setData(uint8)
				this.translucentModelBuffer.setData(uint8)

				const instanceCount = this.graph.nodes.store.count
				this.model.setInstanceCount(instanceCount)
				this.translucentModel.setInstanceCount(instanceCount)
			}
		}
		return updated
	}

	public rebuildSaturation() {
		if (this.graph) {
			const nodes = this.config.nodeFilteredIds
			const allIn =
				!nodes || nodes.length === 0 || nodes.length === this.graph.nodes.count

			const nodeInSat = this.config.nodeFilteredInSaturation
			const nodeOutSat = this.config.nodeFilteredOutSaturation

			// IMPORTANT: the (prim as <type>) stuff avoids an extra `const node = prim as Node` call
			// Performance shortcut for everything in / out
			if (allIn) {
				for (const node of this.graph.nodes.scan()) {
					node.saturation = nodeInSat
				}
			} else {
				const nodeMap = (nodes || []).reduce((prev, curr) => {
					prev[curr] = true
					return prev
				}, {} as Record<string, boolean>)
				for (const node of this.graph.nodes.scan()) {
					node.saturation = nodeMap[node.id! || ''] ? nodeInSat : nodeOutSat
				}
			}
		}
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
	 * Handler for when a node is added
	 * @param primitive The primitive to add
	 */
	protected handleNodeAdded = (nodeOrIndex: number | Node) => {
		if (this.enabled && this.graph) {
			const node =
				typeof nodeOrIndex === 'number'
					? this.graph.nodes.itemAt(nodeOrIndex)
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
		if (this.enabled && this.graph) {
			const node =
				typeof nodeOrIndex === 'number'
					? this.graph.nodes.itemAt(nodeOrIndex)
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
		if (this.enabled) {
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
		return idx !== RENDERER_BACKGROUND_INDEX && idx >= 0 && this.graph
			? this.graph.nodes.itemAt(idx)
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
