/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Edge, Node } from '@graspologic/graph'
import { Renderable, RenderOptions, Primitive } from '../internal'

/**
 * Represents a collection of primitives/renderables that are rendered
 * on the graph
 */
export interface Scene {
	/**
	 * Whether or not the scene needs a redraw
	 */
	needsRedraw: boolean

	/**
	 * Adds the list of primitives to the scene
	 * @param primitives The list of primitives to add
	 */
	add(primitives: Primitive | Primitive[]): void

	/**
	 * Removes the given primitive from the sene
	 * @param primitive The primitive to remove
	 */
	remove(primitive: Primitive): void

	/**
	 * Clears the set of primitives loaded into the scene
	 */
	clear(): void

	/**
	 * Gets the list of primitives contained in the scene
	 */
	primitives(): Iterable<Primitive>
	/**
	 * Returns the list of nodes in the scene
	 */
	nodes(): Iterable<Node>

	/**
	 * Gets the list of edges contained in the scene
	 */
	edges(): Iterable<Edge>

	/**
	 * Returns the primitives with the given ids
	 */
	getPrimitives<T>(ids: Set<string>): Iterable<Primitive>

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
	 * Tells the scene that a resize has occurred
	 * @param width The width of the scene
	 * @param height The height of the scene
	 */
	resize(width: number, height: number): void

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
	 * Renders the scene
	 * @param options The render options
	 */
	render(options: Partial<RenderOptions>): void

	/**
	 * @internal
	 *
	 * Marks the scene as dirty
	 */
	makeDirty(): void

	/**
	 * @internal
	 *
	 * Destroys the scene
	 */
	destroy(): void

	/**
	 * @internal
	 *
	 * Rebuilds the node/edge saturation
	 */
	rebuildSaturation(): void
}
