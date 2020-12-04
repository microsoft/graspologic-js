/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// This is causing problems downstream for some reason
// @ts-ignore
import { setParameters } from '@luma.gl/gltools'
import { Scene, SceneEvents } from '../../types'
import {
	EventEmitterImpl,
	Maybe,
	Renderable,
	RenderConfiguration,
	RenderOptions,
} from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'
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
	private _graph: Maybe<GraphContainer>

	/**
	 * Constructor for the SceneGraph
	 * @param gl The gl context
	 * @param config The render configuration
	 */
	public constructor(
		private gl: WebGLRenderingContext,
		private config: RenderConfiguration,
	) {
		super()
		this.doubleBufferedRenderables = new ScreenQuadRenderable(gl)
		config.onBackgroundColorChanged(() => this.initialize({ gl: this.gl }))
	}

	public get graph() {
		return this._graph
	}

	public set graph(value: Maybe<GraphContainer>) {
		this._graph = value

		for (const renderable of this.renderables()) {
			renderable.graph = value
		}
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
		renderable.graph = this.graph
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
		renderable.graph = undefined
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
}
