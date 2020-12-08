/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Scene } from './scene'
import { Camera } from '@graspologic/camera'
import {
	EventEmitter,
	RenderConfiguration,
	UserInteractionType,
} from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'
import type { NodesRenderableEvents } from '@graspologic/renderables-nodes'

export type InitializeHandler<T> = (context: T) => void

/**
 * An interface indicating that a renderer uses WebGL
 */
export interface UsesWebGL {
	/**
	 * Returns the webgl context
	 */
	readonly gl: WebGLRenderingContext
}

export interface GraphRendererEvents extends NodesRenderableEvents {
	dirty(): void
	resize(): void
	load(): void
}

/**
 * Renderer for rendering a graph
 */
export interface GraphRenderer extends EventEmitter<GraphRendererEvents> {
	/**
	 * Gets the camera
	 */
	readonly camera: Camera

	/**
	 * Gets whether or not the renderer has been destroyed
	 */
	readonly destroyed: boolean

	/**
	 * Returns the underlying graph structure
	 */
	readonly graph: GraphContainer

	/**
	 * Gets the current render configuration
	 */
	config: RenderConfiguration

	/**
	 * Gets the scene, on which nodes and edges can be added
	 */
	scene: Scene

	/**
	 * Returns the canvas behind the graph renderer
	 */
	view: HTMLElement

	/**
	 * Handles the given user interaction
	 * @param type The user interaction type
	 */
	handleUserInteraction(type: UserInteractionType): void

	/**
	 * Add an initialization callback
	 */
	onInitialize<T>(initializeHandler: InitializeHandler<T>): void

	// #endregion

	/**
	 * Loads the given graph into the renderer
	 * @param data The graph to load
	 */
	load(data: GraphContainer): void

	/**
	 * Resizes the renderer
	 * @param width The width of the canvas
	 * @param height The height of the canvas
	 */
	resize(width: number, height: number): void

	/**
	 * Makes the graph renderer "dirty", so on the next render it will repaint itself
	 */
	makeDirty(): void

	/**
	 * A wrapper around camera.fitToView to ensure that the currently loaded graph is in view
	 * @param duration The amount of time to take transitioning to the new view
	 */
	zoomToGraph(duration?: number): void

	/**
	 * A wrapper around camera.fitToView to match the viewport
	 * @param duration The amount of time to take transitioning to the new view
	 */
	zoomToViewport(duration?: number): void

	/**
	 * Updates the weights in the graph
	 */
	updateWeights(): void

	/**
	 * Starts the animation loop
	 */
	start(): void

	/**
	 * Stops the animation loop
	 */
	stop(): void

	/**
	 * Renders the graph
	 * @param delta The optional *engine time* diff since the last render, changing this will speed up or slow down animations
	 * @returns The delta, either computed or the parameter passed to the function
	 */
	render(delta?: number): number

	/**
	 * Returns a promise that is resolved before the first render
	 */
	awaitKickoff(): Promise<void>

	/**
	 * Destroy's the graph renderer
	 */
	destroy(): void

	/**
	 * @internal
	 *
	 * Forces a re-bind to the underlying data store
	 */
	rebind(): void
}

export enum VisualDimensions {
	TwoD = '2D',
	ThreeD = '3D',
}
