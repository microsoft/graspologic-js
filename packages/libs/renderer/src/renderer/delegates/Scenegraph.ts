/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// This is causing problems downstream for some reason
// @ts-ignore
import { setParameters } from '@luma.gl/gltools'
import { DataStore, Scene, Primitive, SceneEvents } from '../../types'
import {
	EventEmitterImpl,
	Renderable,
	RenderConfiguration,
	RenderOptions,
} from '@graspologic/common'
import {
	Edge,
	Node,
	nodeType,
	edgeType,
	EdgeStore,
	NodeStore,
} from '@graspologic/graph'
import { ReaderStore } from '@graspologic/memstore'
import { ScreenQuadRenderable } from '@graspologic/renderables-support'

/**
 * @internal
 *
 * Scenegraph for graph rendering. This contains responsibility for owning, mutating, and
 * rendering the set of renderables and primitives which compose the graph view.
 */
export class Scenegraph extends EventEmitterImpl<SceneEvents> implements Scene {
	private destroyed = false
	private doubleBufferedRenderables: ScreenQuadRenderable
	private nonDoubleBufferedRenderables: Renderable[] = []

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
		private data: DataStore<Primitive>,
	) {
		super()
		this.doubleBufferedRenderables = new ScreenQuadRenderable(gl)
		config.onBackgroundColorChanged(() => this.initialize({ gl: this.gl }))

		data.onRegister(this.handleStoreUpdated)
		this.handleStoreUpdated(edgeType, data.retrieve(edgeType)!)
		this.handleStoreUpdated(nodeType, data.retrieve(nodeType)!)

		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredOutSaturationChanged(this.rebuildSaturation)
		this.rebuildSaturation()
	}

	/**
	 * @inheritdoc
	 * @see {@link Renderable.enabled}
	 */
	public get enabled() {
		// Can't disable me!
		return true
	}

	// #region EventHandlers

	/**
	 * Resizes the scene
	 * @param width The width of the scene
	 * @param height The height of the scene
	 */
	public resize(width: number, height: number): void {
		this.doubleBufferedRenderables.resize(width, height)
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
				} else if (primitive.type === edgeType) {
					this.edgeData.receive(primitive as Edge)
				} else {
					this.data.retrieve(primitive.type)?.receive(primitive)
				}
			}
		} else {
			if (primitives.type === nodeType) {
				this.nodeData.receive(primitives as Node)
			} else if (primitives.type === edgeType) {
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
				} else if (primitive.type === edgeType) {
					this.edgeData.remove(primitive.storeId)
				} else {
					this.data.retrieve(primitive.type)?.remove(primitive.storeId)
				}
			}
		} else {
			if (primitives.type === nodeType) {
				this.nodeData.remove(primitives.storeId)
			} else if (primitives.type === edgeType) {
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
	}

	/**
	 * @inheritdoc
	 * @see {Scene.primities}
	 */
	public *primitives(ids?: Set<string>, scan = false): Iterable<Primitive> {
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
	 * @see {Scene.renderables}
	 */
	public *renderables(): IterableIterator<Renderable> {
		for (const renderable of this.nonDoubleBufferedRenderables) {
			yield renderable
		}

		// doubledBufferedRenderables should be transparent to the user
		// so we just render the renderables within it
		for (const renderable of this.doubleBufferedRenderables.renderables()) {
			yield renderable
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
	 * Adds a renderable object that will be added to the rendering pipeline
	 * @param renderable The renderable to add
	 * @param doubleBuffered If the renderable should be double buffered
	 */
	public addRenderable(renderable: Renderable, doubleBuffered = false): void {
		if (doubleBuffered) {
			this.doubleBufferedRenderables.addRenderable(renderable)
		} else {
			this.nonDoubleBufferedRenderables.push(renderable)
			renderable.resize(this.config.width, this.config.height)
		}
		this.emit('scene:renderableAdded', renderable)
	}

	/**
	 * Removes a renderable object from the rendering pipeline
	 * @param renderable The renderable to remove
	 */
	public removeRenderable(renderable: Renderable): void {
		this.doubleBufferedRenderables.removeRenderable(renderable)
		this.nonDoubleBufferedRenderables = this.nonDoubleBufferedRenderables.filter(
			r => r !== renderable,
		)
		this.emit('scene:renderableRemoved', renderable)
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
	}

	/**
	 * @inheritdoc
	 * @see {@link Renderable.prepare}
	 */
	public prepare(renderOptions: RenderOptions) {
		this.doubleBufferedRenderables.prepare(renderOptions)

		for (const renderable of this.nonDoubleBufferedRenderables) {
			if (renderable.prepare) {
				renderable.prepare(renderOptions)
			}
		}
	}

	/**
	 * Renders the scene
	 * @param options The render options
	 */
	public render(renderOptions: RenderOptions): void {
		const { forceRender } = renderOptions

		if (this.needsRedraw || forceRender) {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
			this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
			this.doubleBufferedRenderables.render()

			for (const renderable of this.nonDoubleBufferedRenderables) {
				renderable.render(renderOptions)
			}
		}
	}

	/**
	 * Whether or not the scene needs a redraw
	 */
	public get needsRedraw() {
		return (
			this.doubleBufferedRenderables.needsRedraw ||
			this.nonDoubleBufferedRenderables.some(r => r.needsRedraw)
		)
	}

	/**
	 * Destroys the scene
	 */
	public destroy() {
		if (!this.destroyed) {
			this.destroyed = true
			this.nonDoubleBufferedRenderables.forEach(r => {
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
		const allIn =
			!nodes || nodes.length === 0 || nodes.length === this.nodeData.count

		const nodeInSat = this.config.nodeFilteredInSaturation
		const nodeOutSat = this.config.nodeFilteredOutSaturation

		const edgeInSat = this.config.edgeFilteredInSaturation
		const edgeOutSat = this.config.edgeFilteredOutSaturation

		// IMPORTANT: the (prim as <type>) stuff avoids an extra `const node = prim as Node` call
		// Performance shortcut for everything in / out
		if (allIn) {
			for (const prim of this.primitives(undefined, true)) {
				if (prim.type === nodeType) {
					;(prim as Node).saturation = nodeInSat
				} else if (prim.type === edgeType) {
					;(prim as Edge).saturation = edgeInSat
					;(prim as Edge).saturation2 = edgeInSat
				}
			}
		} else {
			const nodeMap = (nodes || []).reduce((prev, curr) => {
				prev[curr] = true
				return prev
			}, {} as Record<string, boolean>)
			for (const prim of this.primitives(undefined, true)) {
				if (prim.type === nodeType) {
					;(prim as Node).saturation = nodeMap[prim.id! || '']
						? nodeInSat
						: nodeOutSat
				} else if (prim.type === edgeType) {
					;(prim as Edge).saturation = !!nodeMap[(prim as Edge).source!]
						? edgeInSat
						: edgeOutSat
					;(prim as Edge).saturation2 = !!nodeMap[(prim as Edge).target!]
						? edgeInSat
						: edgeOutSat
				}
			}
		}
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
}
