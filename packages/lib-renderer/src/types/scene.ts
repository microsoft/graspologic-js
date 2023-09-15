/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Renderable, RenderOptions } from '@graspologic/common'
import type { Edge, Node } from '@graspologic/graph'
import type { Primitive } from './primitives.js'

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
	 * @param ids The list of ids to filter to
	 * @param scan If true, a scan will be used instead of a traditional iterator __NOTE__ scanning reuses object references,
	 * items returned should _not_ be stored
	 */
	primitives(ids?: Set<string>, scan?: boolean): Iterable<Primitive>

	/**
	 * Returns the list of nodes in the scene
	 * @param scan If true, a scan will be used instead of a traditional iterator __NOTE__ scanning reuses object references,
	 * items returned should _not_ be stored
	 */
	nodes(scan?: boolean): Iterable<Node>

	/**
	 * Gets the list of edges contained in the scene
	 * @param scan If true, a scan will be used instead of a traditional iterator __NOTE__ scanning reuses object references,
	 * items returned should _not_ be stored
	 */
	edges(scan?: boolean): Iterable<Edge>

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
