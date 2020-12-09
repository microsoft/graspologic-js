/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Id, Maybe } from '@graspologic/common'

/**
 * Represents an operation that occurs on a given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns The operation result
 */
export type NodeOperation<T> = (id: Maybe<Id>, group: Maybe<Id>) => T

/**
 * Provides a color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of 0xbbggrraa
 */
export type NodeBGRAColorizer = NodeOperation<number>

/**
 * Provides a component based color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of [r, g, b, a] components
 */
export type NodeComponentColorizer = NodeOperation<
	[number, number, number, number]
>

/**
 * Provides a color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of [r, g, b, a] components or an int color
 */
export type NodeColorizer = NodeBGRAColorizer | NodeComponentColorizer

/**
 * Provides a __radius__ for a node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A number representing the radius of a node.
 * This number is based on the scale of your graph.  For example, if your graph goes from
 * -100 to 100 on the x axis.  A radius of 100 will fill up half of the graph.
 */
export type NodeSizer = NodeOperation<number>

/**
 * A function which provides a __weight__ for a node (from 0 - 1)
 * @param id The id of the node
 * @param group The group of the node
 * @returns A number representing the weight of a node from 0 - 1.
 * The screen size of the node is determined by the nodeMinRadius and nodeMaxRadius config settings which are in pixels.
 */
export type NodeWeighter = NodeOperation<number>

/**
 * An object which provides individual components of a nodes position
 */
export type NodePositioner = {
	/**
	 * Duration of the position transitions from the old positions to the new ones
	 */
	duration: number | undefined

	/**
	 * The x coordinate of a node
	 */
	x: NodeOperation<number>

	/**
	 * The y coordinate of a node
	 */
	y: NodeOperation<number>

	/**
	 * The optional z coordinate of a node
	 */
	z?: NodeOperation<number>
}
