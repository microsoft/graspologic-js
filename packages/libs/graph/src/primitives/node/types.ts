/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputNode } from '../../graph'
import { Pos3D, Shape, Pos2D } from '../types'
import { MemoryReader, ReaderStore, StoreConfig } from '@graspologic/memstore'

/**
 * An interface representing a node
 */
export interface Node extends MemoryReader {
	/**
	 * The id of the node
	 */
	id: string | undefined

	/**
	 * The group of a node
	 */
	group: string | undefined

	/**
	 * The node label
	 */
	label: string | undefined

	/**
	 * The weight of a node, from 0 - 1
	 * @defaultValue 1
	 */
	weight: number

	/**
	 * The radius of a node from 0 - 1. If __radius__ is > 0 it will be used to size the nodes, otherwise __weight__ will be used
	 * @defaultValue 0
	 */
	radius: number

	/**
	 * The size of the node
	 * @alias radius
	 * @defaultValue 0
	 */
	size: number

	// Colors

	/**
	 * Returns the color in int32 hex format 0xAABBGGRR
	 * For example, 0xFF00FF00 would be fully opaque green
	 */
	color: number

	// Position

	/**
	 * The center position of the node
	 * @defaultValue [0, 0, 0]
	 */
	position: Pos3D

	/**
	 * The x value of the node
	 * @defaultValue 0
	 */
	x: number

	/**
	 * The y value of the node
	 * @defaultValue 0
	 */
	y: number

	/**
	 * The z value of the node
	 * @defaultValue 0
	 */
	z: number

	// Rendering Properties
	/**
	 * The saturation of the node
	 * @defaultValue 1
	 */
	saturation: number

	/**
	 * The shape of the node
	 * @defaultValue Shape.Circle
	 */
	shape: Shape

	// #region internal

	/**
	 * @internal
	 * Whether or not the node position is fixed, and shouldn't be moved
	 */
	fixed: boolean

	/**
	 * @internal
	 *
	 * The id of the edge in the EdgeStore
	 */
	storeId: number

	/**
	 * @internal
	 * The visibility flag for the edge
	 * @remarks
	 * Used by the stores to mark an edge as removed
	 */
	visible: boolean

	/**
	 * @internal
	 * The unique picking color for the node, used for click/hover handling
	 */
	pickingColor: [number, number, number]

	// #region Layout

	/**
	 * @internal
	 * The mass of the node
	 */
	mass: number

	/**
	 * @internal
	 * A property used with ForceAtlas2 that represents convergence
	 */
	convergence: number

	/**
	 * @internal
	 * A property used with ForceAtlas2 that represents forces being applied in the x direction
	 */
	dx: number

	/**
	 * @internal
	 * A property used with ForceAtlas2 that represents forces being applied in the y direction
	 */
	dy: number

	/**
	 * @internal
	 * A property used with ForceAtlas2 that represents previous forces applied in the x direction
	 */
	old_dx: number

	/**
	 * @internal
	 * A property used with ForceAtlas2 that represents previous forces applied in the y direction
	 */
	old_dy: number

	// #endregion

	// #endregion

	/**
	 * Lodas the node from the given raw input data
	 * @param data The raw data for the node
	 */
	load(data: InputNode): void
}

/**
 * The type representing a NodeStore
 */
export interface NodeStore extends ReaderStore<Node> {
	/**
	 * The current engine time
	 */
	engineTime?: number
}

/**
 * The NodeStore configuration options
 */
export type NodeStoreConfig = StoreConfig

/**
 * An interface describing a Node that can be animated
 */
export interface AnimatableNode extends Node {
	/**
	 * Animates the node to the given position over the duration
	 * @param position The position to animate to
	 * @param duration The duration to animate over
	 */
	animatePosition(position: Pos3D | Pos2D, duration?: number): void

	/**
	 * Animates the node to the given position over the duration
	 * @param x The x component
	 * @param y The y component
	 * @param z The z component
	 * @param duration The duration to animate over
	 */
	animatePositionComponents(
		x: number,
		y: number,
		z?: number,
		duration?: number,
	): void

	/**
	 * Animates the node to the given color over the duration
	 * @param color The color to animate to
	 * @param duration The duration to animate over
	 */
	animateColor(color: number, duration?: number): void
}
