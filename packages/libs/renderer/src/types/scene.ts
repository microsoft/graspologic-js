/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { EventEmitter, Renderable, Maybe } from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'

export interface SceneEvents {
	'scene:renderableAdded'(renderable: Renderable): void
	'scene:renderableRemoved'(renderable: Renderable): void
}

/**
 * Represents a collection of primitives/renderables that are rendered
 * on the graph
 */
export interface Scene extends Renderable, EventEmitter<SceneEvents> {
	/**
	 * Gets the graph used in the scene
	 */
	graph: Maybe<GraphContainer>

	/**
	 * Adds a renderable object that will be added to the rendering pipeline
	 * @param renderable The renderable to add
	 * @param doubleBuffered If the renderable should be double buffered
	 */
	addRenderable(renderable: Renderable, doubleBuffered?: boolean): void

	/**
	 * Removes a renderable object from the rendering pipeline
	 * @param renderable The renderable to remove
	 */
	removeRenderable(renderable: Renderable): void

	/**
	 * Gets the list of renderables contained in this scene
	 */
	renderables(): Iterable<Renderable>

	/**
	 * @internal
	 *
	 * Initializes the scene
	 * @param props The initialization props
	 */
	initialize(props: { gl: WebGLRenderingContext }): void

	/**
	 * @internal
	 *
	 * Rebuilds the node/edge saturation
	 */
	rebuildSaturation(): void
}
