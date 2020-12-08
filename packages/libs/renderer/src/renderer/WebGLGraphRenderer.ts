/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Deferred, deferred } from '@essex-js-toolkit/toolbox'
import { AnimationLoop } from '@luma.gl/engine'
// This is causing problems downstream for some reason
// @ts-ignore
import { createGLContext } from '@luma.gl/gltools'
import { processGraph } from '../data'
import {
	NodeComponentColorizer,
	Scene,
	InitializeHandler,
	GraphRenderer,
	UsesWebGL,
	GraphRendererEvents,
} from '../types'
import { Scenegraph } from './delegates'
import { Camera } from '@graspologic/camera'
import {
	createConfiguration,
	CameraAdjustmentMode,
	RenderConfiguration,
	RenderConfigurationOptions,
	Bounds3D,
	Bounds2D,
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	BoundedRenderable,
	Interpolator,
	RenderOptions,
	EventEmitterImpl,
	UserInteractionType,
	Renderable,
	EventEmitter,
	DEFAULT_NODE_COUNT_HINT,
	DEFAULT_EDGE_COUNT_HINT,
	Disconnect,
} from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'

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
export class WebGLGraphRenderer
	extends EventEmitterImpl<GraphRendererEvents>
	implements GraphRenderer, UsesWebGL {
	// Observable-pattern handler lists
	private dimensionInterpolator: Interpolator
	private _dataBounds: Bounds3D = DEFAULT_BOUNDS

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

	private _engineTime = 0
	private _lastRenderTime = -1
	private _startTime = Date.now()
	private _forceDraw = false

	private __destroyed = false
	private animationLoopRunning = false
	private primitivesDirty = false

	/** Returns the current engine time for animation tweening */
	public engineTime = () => this._engineTime
	private _graph: GraphContainer
	private graphListeners: Disconnect[] = []

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
		graph: GraphContainer,
		scene: Scene,
		camera: Camera,
	) {
		super()
		this._graph = graph

		this.subscribeToGraphEvents()

		this._scene = scene
		this._camera = camera

		this.onInitialize((opts: GLOpts) => {
			this.resize(config.width, config.height)
			this.scene.initialize(opts)
			this.initialized = true
		})

		for (const renderable of scene.renderables()) {
			this.handleRenderableAdded(renderable)
		}

		scene.on('scene:renderableAdded', this.handleRenderableAdded)
		scene.on('scene:renderableRemoved', this.handleRenderableRemoved)

		this._kickoffDeferred = deferred()

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

		this.dimensionInterpolator = new Interpolator(config.interpolationTime)

		// Start off in the correct position
		this.dimensionInterpolator.current = 1

		// Pipe all scene events to the renderable
		scene.pipe(this as any)

		config.onInterpolationTimeChanged(
			value => (this.dimensionInterpolator.interpolationTime = value),
		)
		config.onIs3DChanged(() => {
			this.dimensionInterpolator.reset()
		})

		this.config.onHideDeselectedChanged(this.makeDirty)

		scene.graph = graph
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

		if (data) {
			processGraph(data, undefined)
		}

		data =
			data ||
			GraphContainer.create(
				options.nodeCountHint != null
					? options.nodeCountHint
					: DEFAULT_NODE_COUNT_HINT,
				options.edgeCountHint != null
					? options.edgeCountHint
					: DEFAULT_EDGE_COUNT_HINT,
				true,
			)

		const config = createConfiguration(options)
		const camera = new Camera()

		/** set up the scene */
		const scene = new Scenegraph(gl!, config)

		return new WebGLGraphRenderer(gl!, config, data, scene, camera)
	}

	// #endregion

	// #region event handling

	/**
	 * @internal
	 *
	 * Triggers the onVertexClick event
	 */
	public handleUserInteraction(type: UserInteractionType): void {
		invariant(!this.destroyed, 'renderer is destroyed!')
		for (const renderable of this.scene.renderables()) {
			if (renderable.handleUserInteraction) {
				renderable.handleUserInteraction(type)
			}
		}
	}

	/**
	 * Returns the underlying graph structure
	 */
	public get graph(): GraphContainer {
		return this._graph
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

		this._graph = data

		this.subscribeToGraphEvents()

		this.scene.graph = data

		this.emit('load')
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

		this.emit('resize')

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
			this._forceDraw = true
			this.emit('dirty')
		}
	}

	/**
	 * A wrapper around camera.fitToView to ensure that the currently loaded graph is in view
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

		this.camera.fitToView(cameraBounds, duration)

		this.makeDirty()
	}

	/**
	 * A wrapper around camera.fitToView to match the viewport
	 * @param duration The amount of time to take transitioning to the new view
	 */
	public zoomToViewport(duration = 0) {
		invariant(!this.destroyed, 'renderer is destroyed!')

		this.camera.fitToView(
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

		this._dataBounds = this.computeBounds() as any
		return this._dataBounds
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
			this.dimensionInterpolator.tick(time)
			const props = this.buildRenderOptions(time)
			this.animationProps.engineTime = props.engineTime

			if (
				this.primitivesDirty &&
				this.config.cameraAdjustmentMode === CameraAdjustmentMode.Graph
			) {
				this.zoomToGraph()
			}

			this._forceDraw = false
			this.primitivesDirty = false
			this.camera.tick(time)

			if (this.scene.prepare) {
				this.scene.prepare(props)
			}

			this.scene.render(props)
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
			this.graph.destroy()

			if (this.scene.destroy) {
				this.scene.destroy()
			}
		}
	}

	/**
	 * Handles a renderable added to the scene
	 * @param renderable The renderable that was added
	 */
	private handleRenderableAdded = (renderable: Renderable) => {
		const events = renderable as Partial<EventEmitter<any>>
		if (events.pipe) {
			events.pipe(this as any)
		}
	}

	/**
	 * Handles a renderable removed to the scene
	 * @param renderable The renderable that was removed
	 */
	private handleRenderableRemoved = (renderable: Renderable) => {
		const events = renderable as Partial<EventEmitter<any>>
		if (events.unpipe) {
			events.unpipe(this as any)
		}
	}

	/**
	 * Handler for when the graphical primitives has changed somehow
	 */
	private handlePrimitivesChanged = () => (this.primitivesDirty = true)

	/**
	 * Computes the world bounds of the items drawn to screen
	 */
	private computeBounds(): Bounds3D {
		if (this.config.dataBounds) {
			return {
				...this.config.dataBounds,
				z: this.config.dataBounds.z || DEFAULT_BOUNDS.z,
			}
		} else {
			let bounds: Bounds3D | undefined
			for (const renderable of this.scene.renderables()) {
				const boundedRenderable = (renderable as any) as BoundedRenderable
				if (boundedRenderable.computeBounds !== undefined) {
					const newBounds = boundedRenderable.computeBounds()
					if (!bounds) {
						bounds = newBounds
					} else if (newBounds) {
						// X
						bounds.x.max = Math.max(
							newBounds.x.min,
							newBounds.x.max,
							bounds.x.max,
						)
						bounds.x.min = Math.min(
							newBounds.x.min,
							newBounds.x.max,
							bounds.x.min,
						)
						// Y
						bounds.y.max = Math.max(
							newBounds.y.min,
							newBounds.y.max,
							bounds.y.max,
						)
						bounds.y.min = Math.min(
							newBounds.y.min,
							newBounds.y.max,
							bounds.y.min,
						)
						// Z
						bounds.z.max = Math.max(
							newBounds.z.min,
							newBounds.z.max,
							bounds.z.max,
						)
						bounds.z.min = Math.min(
							newBounds.z.min,
							newBounds.z.max,
							bounds.z.min,
						)
					}
				}
			}
			return Object.freeze(bounds || DEFAULT_BOUNDS)
		}
	}

	/**
	 * Builds the current render options
	 */
	private buildRenderOptions(currentTime: number): RenderOptions {
		const modelViewMatrix = this.camera
			.computeViewMatrix(this.config.is3D)
			.scale([
				1,
				1,
				this.config.is3D
					? this.dimensionInterpolator.current
					: 1.0 - this.dimensionInterpolator.current,
			])

		return {
			time: currentTime,
			engineTime: this._engineTime,
			framebuffer: this.animationProps.framebuffer,
			useDevicePixels: this.animationProps.useDevicePixels,
			_mousePosition: this.animationProps._mousePosition,
			weightToPixel: this.computeWeightToPixel(this._dataBounds),
			projectionMatrix: this.camera.projection,
			modelViewMatrix,
			config: this.config,
			isCameraMoving: this.camera.isMoving,
			canvasPixelSize: [this.config.width, this.config.height],
			forceRender:
				this._forceDraw ||
				this.camera.isMoving ||
				this.dimensionInterpolator.current < 1.0,
		}
	}

	/**
	 * Computes the weight (0 -> 1) to pixel scale
	 */
	private computeWeightToPixel(bounds: Bounds2D) {
		return (
			// Scale the weight based on if the graph was fit to the screen
			Math.max(
				// Pretend the x axis was stretched to fit the width
				(bounds.x.max - bounds.x.min) / this.config.width,

				// Pretend the y axis was stretched to fit the width
				(bounds.y.max - bounds.y.min) / this.config.height,
			) / 2.0 || 1
		)
	}

	/**
	 * Subscribes to the graph events
	 * @param graph The graph to subscribe to
	 */
	private disconnectGraphEvents() {
		for (const disconnect of this.graphListeners) {
			disconnect()
		}
		this.graphListeners = []
	}

	/**
	 * Subscribes to the graph events
	 */
	private subscribeToGraphEvents() {
		this.disconnectGraphEvents()

		this.graphListeners.push(
			this.graph.nodes.onAddItem(this.handlePrimitivesChanged),
		)
		this.graphListeners.push(
			this.graph.nodes.onAttributeUpdated(this.handlePrimitivesChanged),
		)
		this.graphListeners.push(
			this.graph.nodes.onRemoveItem(this.handlePrimitivesChanged),
		)
	}
}
