/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Id, Maybe } from '@graspologic/common'
import { Shape } from '../primitives'

export type NodeId = string
export type NodeIndex = number
export type EdgeWeight = number

/**
 * A graph representation to use for worker-wire transport.
 * Workers should use SharedArrayBuffer to minimize serialization/deserialization
 */
export interface TransportGraph {
	nodes: ArrayBuffer
	edges: ArrayBuffer
}

/**
 * An unprocessed graph
 */
export interface InputGraph {
	nodes: InputNode[]
	edges: InputEdge[]
}

/**
 * An unprocessed node
 */
export interface InputNode {
	id: string
	size?: number
	radius?: number
	weight?: number
	label?: string
	group?: string
	shape?: Shape | 'square' | 'diamond' | 'circle'
	color?: number
	x?: number
	y?: number
	z?: number
}

/**
 * An unprocessed edge
 */
export interface InputEdge {
	source: string
	target: string
	weight?: number

	//#region Colors
	color?: number
	sourceColor?: number

	color2?: number
	targetColor?: number

	//#endregion
}

/**
 * A mapping between every node to the nodes it's connected to
 */
export type AdjacencyMap = Map<NodeIndex, Record<NodeIndex, EdgeWeight>>

/**
 * A mapping between a key and a position object
 */
export type PositionMap = Record<string, { x: number; y: number; z?: number }>
