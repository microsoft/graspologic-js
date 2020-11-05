/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { setParameters } from '@luma.gl/gltools'
import { ScreenQuadRenderable } from '@graspologic/renderables-support'
import {
	DataStore,
	Scene,
	Primitive,
} from '../../types'
import { Camera } from '@graspologic/camera'
import {
	Edge,
	Node,
	nodeType,
	edgeType,
	EdgeStore,
	NodeStore,
} from '@graspologic/graph'
import { ReaderStore } from '@graspologic/memstore'
import { Renderable, RenderConfiguration, RenderOptions, Interpolator } from '@graspologic/common'

/**
 * @internal
 *
 * Scenegraph for graph rendering. This contains responsibility for owning, mutating, and
 * rendering the set of renderables and primitives which compose the graph view.
 */
export class Scenegraph implements Scene {
	public _sceneGraphNeedsRedraw = false
	private destroyed = false
	private doubleBufferedRenderables: ScreenQuadRenderable
	private renderables: Renderable[] = []
	private dimensionInterpolator: Interpolator

	// Cache these for quick lookup
	private edgeData!: EdgeStore
	private nodeData!: NodeStore

	/**
	 * Constructor for the SceneGraph
	 * @param gl The gl context
	 * @param config The render configuration
	 * @param camera The camera
	 * @param data The data manager
	 */
	public constructor(
		private gl: WebGLRenderingContext,
		private config: RenderConfiguration,
		private camera: Camera,
		private data: DataStore<Primitive>,
	) {
		this.doubleBufferedRenderables = new ScreenQuadRenderable(gl)
		config.onBackgroundColorChanged(() => this.initialize({ gl: this.gl }))

		data.onRegister(this.handleStoreUpdated)
		this.handleStoreUpdated(edgeType, data.retrieve(edgeType)!)
		this.handleStoreUpdated(nodeType, data.retrieve(nodeType)!)

		this.dimensionInterpolator = new Interpolator(config.interpolationTime)

		// Start off in the correct position
		this.dimensionInterpolator.current = 1

		config.onInterpolationTimeChanged(
			value => (this.dimensionInterpolator.interpolationTime = value),
		)
		config.onIs3DChanged(() => {
			this.dimensionInterpolator.reset()
			this._sceneGraphNeedsRedraw = true
		})
		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredOutSaturationChanged(this.rebuildSaturation)
		this.rebuildSaturation()
	}

	// #region EventHandlers

	/**
	 * Resizes the scene
	 * @param width The width of the scene
	 * @param height The height of the scene
	 */
	public resize(width: number, height: number): void {
		this.config.width = width
		this.config.height = height

		this.doubleBufferedRenderables.resize(width, height)
		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Adds the list of primitives to the scene
	 * @param primitives The list of primitives to add
	 */
	public add(primitives: Primitive | Primitive[]) {
		if (Array.isArray(primitives)) {
			for (let i = 0; i < primitives.length; i++) {
				const primitive = primitives[i]
				if (primitive.type === nodeType) {
					this.nodeData.receive(primitive as Node)
				} else if (primitive.type == edgeType) {
					this.edgeData.receive(primitive as Edge)
				} else {
					this.data.retrieve(primitive.type)?.receive(primitive)
				}
			}
		} else {
			if (primitives.type === nodeType) {
				this.nodeData.receive(primitives as Node)
			} else if (primitives.type == edgeType) {
				this.edgeData.receive(primitives as Edge)
			} else {
				this.data.retrieve(primitives.type)?.receive(primitives)
			}
		}
	}

	/**
	 * Removes the given primitive from the scene
	 * @param primitive The primitive to remove
	 */
	public remove(primitives: Primitive | Primitive[]) {
		if (Array.isArray(primitives)) {
			for (let i = 0; i < primitives.length; i++) {
				const primitive = primitives[i]
				if (primitive.type === nodeType) {
					this.nodeData.remove(primitive.storeId)
				} else if (primitive.type == edgeType) {
					this.edgeData.remove(primitive.storeId)
				} else {
					this.data.retrieve(primitive.type)?.remove(primitive.storeId)
				}
			}
		} else {
			if (primitives.type === nodeType) {
				this.nodeData.remove(primitives.storeId)
			} else if (primitives.type == edgeType) {
				this.edgeData.remove(primitives.storeId)
			} else {
				this.data.retrieve(primitives.type)?.remove(primitives.storeId)
			}
		}
	}

	public clear() {
		// Empty the DM
		for (const store of this.data) {
			store.reset()
		}
		this._sceneGraphNeedsRedraw = true
	}


	/**
	 * @inheritdoc
	 * @see {Scene.primities} 
	 */
	public *primitives(ids?: Set<string>, scan = false): Iterable<Primitive> {
		// TODO: PrimitiveStore should be able to return an iterator
		for (const store of this.data) {
			const iterator = scan ? store.scan() : store
			for (const prim of iterator) {
				if (!ids || ids.has(prim.id || '')) {
					yield prim
				}
			}
		}
	}

	/**
	 * Gets the list of primitives by the given type
	 */
	public *primitivesByType(type: symbol): Iterable<Primitive> {
		const data = this.data.retrieve(type)
		if (data) {
			for (const prim of data) {
				yield prim
			}
		}
	}

	/**
	 * @inheritdoc
	 * @see {Scene.nodes} 
	 */
	public nodes(scan = false): Iterable<Node> {
		return scan ? this.nodeData.scan() : this.nodeData
	}

	/**
	 * @inheritdoc
	 * @see {Scene.edges} 
	 */
	public edges(scan = false): Iterable<Edge> {
		return scan ? this.edgeData.scan() : this.edgeData
	}

	/**
	 * Marks the scene as dirty
	 */
	public makeDirty() {
		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Adds a renderable object that will be added to the rendering pipeline
	 * @param renderable The renderable to add
	 * @param doubleBuffered If the renderable should be double buffered
	 */
	public addRenderable(renderable: Renderable, doubleBuffered = false): void {
		if (doubleBuffered) {
			this.doubleBufferedRenderables.addRenderable(renderable)
		} else {
			this.renderables.push(renderable)
			renderable.resize(this.config.width, this.config.height)
		}
		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Removes a renderable object from the rendering pipeline
	 * @param renderable The renderable to remove
	 */
	public removeRenderable(renderable: Renderable): void {
		this.doubleBufferedRenderables.removeRenderable(renderable)
		this.renderables = this.renderables.filter(r => r !== renderable)
		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Initializes the scene
	 * @param props The initialization props
	 */
	public initialize({ gl }: { gl: WebGLRenderingContext }): void {
		setParameters(gl, {
			clearColor: this.config.backgroundColor,
			clearDepth: [1],
			blendFunc: [
				gl.SRC_ALPHA,
				gl.ONE_MINUS_SRC_ALPHA,
				gl.ONE,
				gl.ONE_MINUS_SRC_ALPHA,
			],
			blendEquation: [gl.FUNC_ADD, gl.FUNC_ADD],
		})
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Renders the scene
	 * @param options The render options
	 */
	public render({
		gl,
		framebuffer,
		useDevicePixels,
		_mousePosition,
		engineTime,
		time,
		weightToPixel,
	}: any): void {
		if (this.needsRedraw) {
			const renderOptions = this.createRenderOptions(
				framebuffer,
				useDevicePixels,
				_mousePosition,
				engineTime,
				time,
				weightToPixel,
			)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
			this.drawRenderables(renderOptions)
		}

		this._sceneGraphNeedsRedraw = false
	}

	/**
	 * Whether or not the scene needs a redraw
	 */
	public get needsRedraw() {
		return (
			this._sceneGraphNeedsRedraw ||
			this.dimensionInterpolator.current < 1.0 ||
			this.camera.isMoving ||
			this.doubleBufferedRenderables.needsRedraw ||
			this.renderables.some(r => r.needsRedraw)
		)
	}

	/**
	 * Destroys the scene
	 */
	public destroy() {
		if (!this.destroyed) {
			this.destroyed = true
			this.renderables.forEach(r => {
				if (r.destroy) {
					r.destroy()
				}
			})
			this.doubleBufferedRenderables.destroy()
		}
	}

	/**
	 * Change the node filter view.
	 *
	 * Nodes in the nodeFilteredIds config map are rendered as normal,
	 * nodes outside of the map are rendered with low opacity.
	 */
	public rebuildSaturation = (): void => {
		const nodes = this.config.nodeFilteredIds
		const allIn = !nodes || nodes.length === 0
		const nodeMap = (nodes || []).reduce((prev, curr) => {
			prev[curr] = true
			return prev
		}, {} as Record<string, boolean>)

		const nodeInSat = this.config.nodeFilteredInSaturation
		const nodeOutSat = this.config.nodeFilteredOutSaturation

		const edgeInSat = this.config.edgeFilteredInSaturation
		const edgeOutSat = this.config.edgeFilteredOutSaturation

		for (const prim of this.primitives(undefined, true)) {
			const nodePrim = prim as Node
			if (prim.type === nodeType) {
				nodePrim.saturation =
					allIn || nodeMap[prim.id! || ''] ? nodeInSat : nodeOutSat
			} else if (prim.type === edgeType) {
				const edgePrim = prim as Edge
				const isSourceIn = allIn || !!nodeMap[edgePrim.source!]
				const isTargetIn = allIn || !!nodeMap[edgePrim.target!]
				edgePrim.saturation = isSourceIn ? edgeInSat : edgeOutSat
				edgePrim.saturation2 = isTargetIn ? edgeInSat : edgeOutSat
			}
		}

		this._sceneGraphNeedsRedraw = true
	}

	/**
	 * Handler when the store has been updated
	 * @param type The type of store that was updated
	 * @param store The new store
	 */
	private handleStoreUpdated = (type: symbol, store: ReaderStore<any>) => {
		if (type === nodeType) {
			this.nodeData = store
		} else {
			this.edgeData = store
		}
	}

	/**
	 * Draws the renderables
	 * @param renderOptions The render options
	 */
	private drawRenderables(renderOptions: RenderOptions): void {
		this.doubleBufferedRenderables.update(this.needsRedraw, renderOptions)
		this.doubleBufferedRenderables.draw()
		this.renderables.forEach(r => r.draw(renderOptions))
	}

	/**
	 * Creates the set of render options to be passed to the renderables
	 * @param canvas The canvas being rendered on
	 * @param framebuffer The frame buffer to draw on
	 * @param useDevicePixels Whether or not to use device pixels
	 * @param _mousePosition The current mouse position
	 * @param engineTime The engine time
	 * @param time The actual time since the start
	 * @param weightToPixel The scale of weight to pixel size
	 */
	private createRenderOptions(
		framebuffer: any,
		useDevicePixels: boolean | number,
		_mousePosition: any,
		engineTime: number,
		time: number,
		weightToPixel: number,
	): RenderOptions {
		this.dimensionInterpolator.tick(time)
		const modelViewMatrix = this.camera
			.computeViewMatrix(this.config.is3D)
			.scale([
				1,
				1,
				this.config.is3D
					? this.dimensionInterpolator.current
					: 1.0 - this.dimensionInterpolator.current,
			])
		const canvasPixelSize: [number, number] = [
			this.config.width,
			this.config.height,
		]
		const renderOptions: RenderOptions = {
			modelViewMatrix: modelViewMatrix,
			projectionMatrix: this.camera.projection,
			interpolation: this.dimensionInterpolator.current,
			hideDeselected: this.config.hideDeselected,
			minRadius: this.config.nodeMinRadius,
			maxRadius: this.config.nodeMaxRadius,
			canvasPixelSize,
			framebuffer,
			useDevicePixels,
			_mousePosition,
			engineTime,
			time,
			weightToPixel,
		}
		return renderOptions
	}
}
