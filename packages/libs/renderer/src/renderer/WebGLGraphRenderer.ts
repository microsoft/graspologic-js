/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Deferred, deferred } from '@essex-js-toolkit/toolbox'
import { AnimationLoop } from '@luma.gl/engine'
import { createGLContext } from '@luma.gl/gltools'
import { Subject, Observable } from 'rxjs'
import { createConfiguration, CameraAdjustmentMode, RenderConfiguration, RenderConfigurationOptions, Bounds3D, DEFAULT_WIDTH, DEFAULT_HEIGHT, fastDebounce, ItemBasedRenderable, BoundedRenderable } from '@graspologic/common'
import { processGraph } from '../data'
import {
	NodeComponentColorizer,
	Scene,
	PositionMap,
	InitializeHandler,
	GraphRenderer,
	UsesWebGL,
	DataStore,
	Primitive,
} from '../types'
import { Scenegraph, createDataStore, createDataStoreFromContainer } from './delegates'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { NodesRenderable } from '@graspologic/renderables-nodes'
import {
	Node,
	Edge,
	nodeType,
	edgeType,
	GraphContainer,
	NodeStore,
	EdgeStore,
	AnimatableNode,
	AnimatableEdge,
	Pos3D,
} from '@graspologic/graph'
import { ReaderStore } from '@graspologic/memstore'
import { Camera } from '@graspologic/camera' 

// typings are messed up for this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const invariant = require('invariant')

/**
 * Default world bounds, a 2 x 2 x 2 cube centered on 0, 0, 0
 */
const DEFAULT_BOUNDS = Object.freeze({
	x: {
		min: -1,
		max: 1,
	},
	y: {
		min: -1,
		max: 1,
	},
	z: {
		min: -1,
		max: 1,
	},
})

interface GLOpts {
	gl: WebGL2RenderingContext
}

type AnimationOpts = any

/**
 * A WebGL 2 based graph renderer
 */
export class WebGLGraphRenderer implements GraphRenderer, UsesWebGL {
	// Observable-pattern handler lists
	private _onDirtyEvent = new Subject<void>()
	private _onResize = new Subject<void>()
	private _onLoad = new Subject<void>()
	private _onVertexClickEvent = new Subject<Node | undefined>()
	private _onVertexHoveredEvent = new Subject<Node | undefined>()
	private _hoveredVertex: Node | undefined
	private _dataDomain: Bounds3D = DEFAULT_BOUNDS

	// Plugins
	private _onInitializeHandlers: Array<
		InitializeHandler<GLOpts | AnimationOpts>
	> = []
	private _kickoffDeferred: Deferred<void>
	private kickoff = false
	private initialized = false

	// Logic Delegates
	private animationLoop: AnimationLoop
	private animationProps: AnimationOpts
	private _scene: Scene
	private _camera: Camera

	private nodes: NodesRenderable | undefined
	private edges: EdgesRenderable | undefined

	private _engineTime = 0
	private _lastRenderTime = -1
	private _startTime = Date.now()

	private __destroyed = false
	private animationLoopRunning = false

	/** Returns the current engine time for animation tweening */
	public engineTime = () => this._engineTime
	private _data: DataStore<Primitive>

	// #region construction

	/**
	 * Constructor for WebGLGraphRenderer
	 * @param gl The webgl context
	 * @param config The render configuration
	 * @param data The data to render
	 * @param scene The scene object
	 */
	private constructor(
		public gl: WebGL2RenderingContext,
		public config: RenderConfiguration,
		data: DataStore<Primitive>,
		scene: Scene,
		camera: Camera
	) {
		this._data = data
		data.onRegister(this.handleStoreUpdated)

		this._scene = scene
		this._camera = camera

		this.onInitialize((opts: GLOpts) => {
			this.resize(config.width, config.height)
			this.scene.initialize(opts)
			this.initialized = true
		})

		this._kickoffDeferred = deferred()

		// Pretend all the data has updated
		for (const dataType of data.types()) {
			this.handleStoreUpdated(dataType, data.retrieve(dataType)!)
		}

		// We set up the animation loop here, even though
		// we might not fully use it to render loop, because it does a lot of useful things
		// i.e. sets up the framebuffer and resizing framebuffer/canvas, mouse position
		this.animationLoop = new AnimationLoop({
			gl,
			canvas: gl.canvas,
			useDevicePixels: true,
			createFramebuffer: true,
			onInitialize: (animationProps: AnimationOpts) => {
				this.animationProps = animationProps
				this._onInitializeHandlers.forEach(h => h(animationProps))
			},
			onRender: (animationProps: AnimationOpts) => {
				this.animationProps = animationProps
				if (this.animationLoopRunning) {
					this.render()
				}
			},
		})

		for (const renderable of scene.renderables()) {
			if (renderable instanceof NodesRenderable) {
				this.nodes = renderable
			} else if (renderable instanceof EdgesRenderable) {
				this.edges = renderable
			}
		}

		if (this.nodes) {
			// Event Wiring
			this.nodes.on('nodeHovered', (node): void => {
				this._onVertexHoveredEvent.next(node)
			})
		}

		this.config.onHideDeselectedChanged(this.makeDirty)
		this.onVertexHover.subscribe(node => {
			this._hoveredVertex = node
		})
	}

	/**
	 * Creates a new instance of the GraphRenderer
	 * @param options The options for the render configuration
	 */
	public static createInstance(
		options: Partial<RenderConfigurationOptions> = {},
		data?: GraphContainer,
		gl?: WebGL2RenderingContext,
	): WebGLGraphRenderer {
		if (!gl) {
			const canvas = document.createElement('canvas')
			gl = createGLContext({
				canvas,
				webgl2: true,
				webgl1: false,
			})
		}
		const store = data ? 
			createDataStoreFromContainer(data) :
			createDataStore(
				options.nodeCountHint,
				options.edgeCountHint,
				options.autoBind,
			)

		if (data) {
			processGraph(data, undefined)
		}
			
		const config = createConfiguration(options)
		const camera = new Camera()
		
		/** set up the scene */
		const scene = new Scenegraph(gl!, config, camera, store)

		// create nodes renderable
		const nodes = new NodesRenderable(gl!, config)

		// create edges renderable
		const edges = new EdgesRenderable(gl!, config)
		
		scene.addRenderable(edges, true)
		scene.addRenderable(nodes, true)

		return new WebGLGraphRenderer(gl!, config, store, scene, camera)
	}

	// #endregion

	// #region event handling

	/**
	 * @internal
	 *
	 * Triggers the onVertexClick event
	 */
	public handleClicked(): void {
		invariant(!this.destroyed, 'renderer is destroyed!')
		if (this._hoveredVertex) {
			this._onVertexClickEvent.next(this._hoveredVertex)
		}
	}

	/**
	 * Returns the underlying graph structure
	 */
	public get graph(): GraphContainer {
		return new GraphContainer(
			this._data.retrieve<NodeStore>(nodeType)!,
			this._data.retrieve<EdgeStore>(edgeType)!,
		)
	}

	/**
	 * Gets whether or not the renderere is destroyed
	 */
	public get destroyed() {
		return this.__destroyed
	}

	/**
	 * Gets the camera
	 */
	public get camera(): Camera {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._camera
	}

	/**
	 * Subscribe to dirty changes
	 * @param handler
	 */
	public get onDirty(): Observable<void> {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._onDirtyEvent
	}

	/**
	 * Subscribe to resizes
	 * @param handler
	 */
	public get onResize(): Observable<void> {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._onResize
	}

	/**
	 * Subscribe to loads()
	 * @param handler
	 */
	public get onLoad(): Observable<void> {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._onLoad
	}

	/**
	 * Add an initialization callback
	 */
	public onInitialize<T>(initializeHandler: InitializeHandler<T>): void {
		invariant(!this.destroyed, 'renderer is destroyed!')
		if (this.initialized) {
			initializeHandler(this.animationProps)
		} else {
			this._onInitializeHandlers.push(initializeHandler)
		}
	}

	/**
	 * Observable for when a vertex is clicked on
	 */
	public get onVertexClick(): Observable<Node | undefined> {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._onVertexClickEvent
	}

	/**
	 * Observable for when a vertex is hovered over
	 */
	public get onVertexHover(): Observable<Node | undefined> {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._onVertexHoveredEvent
	}

	/**
	 * Gets the scene, on which nodes and edges can be added
	 */
	public get scene(): Scene {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this._scene
	}

	/**
	 * Returns the canvas behind the graph renderer
	 */
	public get view() {
		invariant(!this.destroyed, 'renderer is destroyed!')
		return this.gl.canvas as HTMLCanvasElement
	}

	// #endregion

	/**
	 * Loads the given graph into the renderer
	 * @param data The graph to load
	 * @param colorizer The colorizer function which determines the color of a node
	 */
	public load(data: GraphContainer, colorizer?: NodeComponentColorizer): void {
		invariant(!this.destroyed, 'renderer is destroyed!')

		// normalize weights and color nodes
		processGraph(data, colorizer)

		this._data.register(nodeType, data.nodes)
		this._data.register(edgeType, data.edges)

		for (const dataType of this._data.types()) {
			this.bindDataToRenderable(dataType, this._data.retrieve(dataType)!)
		}

		this.scene.rebuildSaturation()
		this._onLoad.next()
	}

	/**
	 * Changes the position of the given nodes
	 * @deprecated since the nodestore shares memory with the renderer, this should no longer be necessary
	 * @param newPositions The new positions of the nodes
	 * @param duration The optional duration for how long the transition should take
	 */
	public changePositions(newPositions: PositionMap, duration = 0): void {
		invariant(!this.destroyed, 'renderer is destroyed!')

		let nodePos: { x: number; y: number; z?: number }
		const animateNodePosition = this.graph.nodes.store.config.animation ? 
			(prim: Primitive, newPos: Pos3D) => {
				;(prim as AnimatableNode).animatePosition(newPos, duration)
			} : (prim: Node, newPos: Pos3D) => {
				prim.position = newPos
			}
		const animateSourcePosition = this.graph.edges.store.config.animation ? 
			(prim: Edge, newPos: Pos3D) => {
				;(prim as AnimatableEdge).animateSourcePosition(newPos, duration)
			} : (prim: Edge, newPos: Pos3D) => {
				prim.sourcePosition = newPos
			}
		const animateTargetPosition = this.graph.edges.store.config.animation ? 
			(prim: Edge, newPos: Pos3D) => {
				;(prim as AnimatableEdge).animateTargetPosition(newPos, duration)
			} : (prim: Edge, newPos: Pos3D) => {
				prim.targetPosition = newPos
			}
			

		const position: [number, number, number] = [0, 0, 0]

		// I'm doing (prim as Edge) below, instead of assigning it a variable
		// as it is no additional memory cost at runtime
		for (const prim of this.scene.primitives(undefined, true)) {
			if (prim.type === nodeType) {
				nodePos = newPositions[prim.id || '']
				if (nodePos) {
					position[0] = nodePos.x
					position[1] = nodePos.y
					position[2] = nodePos.z || 0
					animateNodePosition(prim as Node, position)
				}
			} else if (prim.type === edgeType) {
				nodePos = newPositions[(prim as Edge).source!]
				if (nodePos) {
					position[0] = nodePos.x
					position[1] = nodePos.y
					position[2] = nodePos.z || 0
					animateSourcePosition(prim as Edge, position)
				}
				nodePos = newPositions[(prim as Edge).target!]
				if (nodePos) {
					position[0] = nodePos.x
					position[1] = nodePos.y
					position[2] = nodePos.z || 0
					animateTargetPosition(prim as Edge, position)
				}
			}
		}

		this._onLoad.next()

		this.handlePrimitivesChanged()
	}

	/**
	 * Resizes the renderer
	 * @param width The width of the canvas
	 * @param height The height of the canvas
	 */
	public resize(width: number, height: number): void {
		invariant(!this.destroyed, 'renderer is destroyed!')

		width = width || DEFAULT_WIDTH
		height = height || DEFAULT_HEIGHT

		this.config.width = width
		this.config.height = height

		const pixelRatio =
			(typeof window !== 'undefined' && window.devicePixelRatio) || 1

		const canvas = this.view
		canvas.width = width * pixelRatio
		canvas.height = height * pixelRatio

		canvas.style.width = `${width}px`
		canvas.style.height = `${height}px`

		this.camera.resize(width, height)
		this._scene.resize(width, height)

		this.updateWeights()

		this._onResize.next()

		if (this.config.cameraAdjustmentMode === CameraAdjustmentMode.Viewport) {
			this.zoomToViewport()
		} else if (
			this.config.cameraAdjustmentMode === CameraAdjustmentMode.Graph
		) {
			this.zoomToGraph()
		}
	}

	/**
	 * @internal
	 *
	 * Forces the renderables to rebind to their data
	 */
	public rebind() {
		invariant(!this.destroyed, 'renderer is destroyed!')

		for (const renderable of this.scene.renderables()) {
			if (renderable.bindDataToModel) {
				renderable.bindDataToModel(true)
			}
		}

		this.makeDirty()
	}

	/**
	 * Makes the graph renderer "dirty", so on the next render it will repaint itself
	 */
	public makeDirty = () => {
		invariant(!this.destroyed, 'renderer is destroyed!')

		if (!this._scene.needsRedraw) {
			this._scene.makeDirty()
			this._onDirtyEvent.next()
		}
	}

	/**
	 * A wrapper around camera.viewBounds to ensure that the currently loaded graph is in view
	 * @param duration The amount of time to take transitioning to the new view
	 */
	public zoomToGraph(duration = 0) {
		invariant(!this.destroyed, 'renderer is destroyed!')

		const dataBounds = this.updateWeights()
		const cameraBounds = {
			x: {
				...dataBounds.x,
			},
			y: {
				...dataBounds.y,
			},
			...(this.config.is3D ? { z: { ...dataBounds.z } } : {}),
		}

		this.camera.viewBounds(cameraBounds, duration)

		this.makeDirty()
	}

	/**
	 * A wrapper around camera.viewBounds to match the viewport
	 * @param duration The amount of time to take transitioning to the new view
	 */
	public zoomToViewport(duration = 0) {
		invariant(!this.destroyed, 'renderer is destroyed!')

		this.camera.viewBounds(
			{
				x: {
					min: -this.config.width / 2,
					max: this.config.width / 2,
				},
				y: {
					min: -this.config.height / 2,
					max: this.config.height / 2,
				},
			},
			duration,
		)
		this.makeDirty()
	}

	/**
	 * Updates the weights in the graph
	 */
	public updateWeights() {
		invariant(!this.destroyed, 'renderer is destroyed!')

		this._dataDomain = this.computeBounds() as any
		return this._dataDomain
	}

	/**
	 * Starts the animation loop
	 */
	public start() {
		invariant(!this.destroyed, 'renderer is destroyed!')

		this.animationLoopRunning = true
		this.animationLoop.start()
	}

	/**
	 * Stops the animation loop
	 */
	public stop() {
		invariant(!this.destroyed, 'renderer is destroyed!')

		this.animationLoopRunning = false
		this.animationLoop.stop()
	}

	/**
	 * Renders the graph
	 * @param delta The optional *engine time* diff since the last render, changing this will speed up or slow down animations
	 * @returns The delta, either computed or the parameter passed to the function
	 */
	public render(delta?: number): number {
		invariant(!this.destroyed, 'renderer is destroyed!')

		if (!this.view.parentElement) {
			console.log(
				'Graph Renderer is not in the document, yet it is still rendering, destroyed?: ',
				+this.destroyed,
			)
		}

		if (this._lastRenderTime === -1) {
			this._lastRenderTime = Date.now()
		}

		if (!this.kickoff) {
			this.animationLoop.start()
			this._kickoffDeferred.resolve()
			this.kickoff = true
		}

		// Increment the engine time by the amount of physical time that has elapsed
		delta = delta !== undefined ? delta : Date.now() - this._lastRenderTime
		this._engineTime += delta
		this._lastRenderTime = Date.now()
		const time = Date.now() - this._startTime
		if (this.animationProps) {
			const props = {
				startTime: this._startTime,
				time,
				engineTime: this._engineTime,
				gl: this.gl,
				framebuffer: this.animationProps.framebuffer,
				useDevicePixels: this.animationProps.useDevicePixels,
				_mousePosition: this.animationProps._mousePosition,
				weightToPixel: this.computeWeightToPixel(this._dataDomain),
			}

			this.camera.tick(time)

			// Set the enabled states on the nodes/edges
			if (
				this.nodes &&
				!this.camera.isMoving &&
				props._mousePosition &&
				// We only need to compute the picking if there is something actually listening to it
				(this._onVertexClickEvent.observers.length > 0 ||
					this._onVertexHoveredEvent.observers.length > 0)
			) {
				this.nodes.computeHovered(props)
			}

			if (this._scene.needsRedraw) {
				if (this.nodes) {
					this.nodes.enabled =
						this.config.drawNodes &&
						(!this.config.hideNodesOnMove || !this.camera.isMoving)
				}
				if (this.edges) {
					this.edges.enabled =
						this.config.drawEdges &&
						(!this.config.hideEdgesOnMove || !this.camera.isMoving)
				}
			}

			this.animationProps.engineTime = this.engineTime()
			this._scene.render(props)
		}

		return delta
	}

	/**
	 * Returns a promise that is resolved before the first render
	 */
	public awaitKickoff(): Promise<void> {
		invariant(!this.destroyed, 'renderer is destroyed!')

		return this._kickoffDeferred.promise
	}

	/**
	 * Destroy's the graph renderer
	 */
	public destroy() {
		invariant(!this.destroyed, 'renderer is destroyed!')

		if (!this.destroyed) {
			this.__destroyed = true
			this.animationLoop.stop()
			this._data.destroy()
			this._scene.destroy()
		}
	}

	/**
	 * Binds the given data to the renderable which supports it
	 * @param type The type of data
	 * @param store The data store
	 */
	private bindDataToRenderable(type: symbol, store: ReaderStore<any>) {
		// i.e. type: Node, store: NodeStore, renderable: NodeRenderable
		for (const renderable of this.scene.renderables()) {
			const hasData = renderable as any as ItemBasedRenderable
			if (hasData.itemType == type) {
				hasData.data = store
			}
		}
	}

	/**
	 * Handler when the store has been updated
	 * @param type The type of store that was updated
	 * @param store The new store
	 */
	private handleStoreUpdated = (type: symbol, store: ReaderStore<any>) => {

		// Update the data on the renderable
		this.bindDataToRenderable(type, store)

		// Listen for changes to the data
		store.onAddItem(
			fastDebounce(this.handlePrimitivesChanged, 100),
		)
	}

	/**
	 * Handler for when the graphical primitives has changed somehow
	 */
	private handlePrimitivesChanged = () => {
		if (this.config.cameraAdjustmentMode === CameraAdjustmentMode.Graph) {
			this.zoomToGraph()
		}
	}

	/**
	 * Computes the world bounds of the items drawn to screen
	 */
	private computeBounds(): Bounds3D {
		let bounds: Bounds3D | undefined
		for (const renderable of this.scene.renderables()) {
			const boundedRenderable = renderable as any as BoundedRenderable
			if (boundedRenderable.computeBounds != undefined) {
				const newBounds = boundedRenderable.computeBounds()
				if (!bounds) {
					bounds = newBounds
				} else if (newBounds) {
					// X
					bounds.x.max = Math.max(newBounds.x.min, newBounds.x.max, bounds.x.max)
					bounds.x.min = Math.min(newBounds.x.min, newBounds.x.max, bounds.x.min)
					// Y
					bounds.y.max = Math.max(newBounds.y.min, newBounds.y.max, bounds.y.max)
					bounds.y.min = Math.min(newBounds.y.min, newBounds.y.max, bounds.y.min)
					// Z
					bounds.z.max = Math.max(newBounds.z.min, newBounds.z.max, bounds.z.max)
					bounds.z.min = Math.min(newBounds.z.min, newBounds.z.max, bounds.z.min)
				}
			}
		}
		return Object.freeze(bounds || DEFAULT_BOUNDS)
	}

	/**
	 * Computes the weight (0 -> 1) to pixel scale
	 */
	private computeWeightToPixel(bounds: Bounds3D) {
		return (
			Math.max(
				(bounds.x.max - bounds.x.min) / this.config.width,
				(bounds.y.max - bounds.y.min) / this.config.height,
			) / 2.0 || 1
		)
	}
}
