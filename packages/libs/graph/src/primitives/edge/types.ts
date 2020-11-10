/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputEdge } from '../../graph'
import { Pos2D, Pos3D } from '../types'
import { MemoryReader, ReaderStore, StoreConfig } from '@graspologic/memstore'

/**
 * An interface representing an edge
 */
export interface Edge extends MemoryReader {
	/**
	 * The id of the edge
	 */
	id: string | undefined

	/**
	 * The source node id
	 */
	source: string | undefined

	/**
	 * The target node id
	 */
	target: string | undefined

	/**
	 * The weight of the edge, from 0 - 1
	 *
	 * @defaultValue 1
	 */
	weight: number

	/**
	 * The source color in int32 hex format 0xAABBGGRR
	 * For example, 0xFF00FF00 would be fully opaque green
	 * @defaultValue 0xFF000000
	 */
	color: number

	/**
	 * The target color in int32 hex format 0xAABBGGRR
	 * For example, 0xFF00FF00 would be fully opaque green
	 * @defaultValue 0xFF000000
	 */
	color2: number

	/**
	 * The source saturation, from 0 - 1
	 * @defaultValue 1
	 */
	saturation: number

	/**
	 * The target saturation, from 0 - 1
	 * @defaultValue 1
	 */
	saturation2: number

	/**
	 * The source node position
	 * @defaultValue [0, 0, 0]
	 */
	sourcePosition: Pos2D | Pos3D

	/**
	 * The target node position
	 * @defaultValue [0, 0, 0]
	 */
	targetPosition: Pos2D | Pos3D

	// #region internal

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
	 * The data?
	 * TODO: Is this even used?
	 */
	data: any | undefined

	/**
	 * @internal
	 * The original weight
	 */
	trueWeight: number

	/**
	 * @internal
	 * The source node index
	 */
	sourceIndex: number

	/**
	 * @internal
	 * The target node index
	 */
	targetIndex: number

	// #endregion

	/**
	 * Loads the edge from the given raw input data
	 * @param data The raw data for the edge
	 * @param nodeIndexMap The index mapping for node ids to indices
	 * @param defaultEdgeWeight The default edge weight to use
	 */
	load(
		data: InputEdge,
		nodeIndexMap: Map<string, number>,
		defaultEdgeWeight?: number,
	): void
}

/**
 * The type for the edge store
 */
export type EdgeStore = ReaderStore<Edge>

export interface AnimatableEdge extends Edge {
	/**
	 * Animates the source position to __position__ over __duration__
	 * @param position The position to animate to
	 * @param duration The duration to animate over
	 */
	animateSourcePosition(position: Pos3D | Pos2D, duration?: number): void

	/**
	 * Animates the target position to __position__ over __duration__
	 * @param position The position to animate to
	 * @param duration The duration to animate over
	 */
	animateTargetPosition(position: Pos3D | Pos2D, duration?: number): void
}

/**
 * The EdgeStore configuration options
 */
export type EdgeStoreConfig = StoreConfig
