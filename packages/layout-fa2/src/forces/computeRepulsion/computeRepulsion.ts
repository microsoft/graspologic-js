/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { NodeStore } from '@graspologic/graph'
import type { FA2Configuration } from '../../types.js'
import { computeRepulsionBarnesHut } from './computeRepulsionBarnesHut.js'
import { computeRepulsionUnoptimized } from './computeRepulsionUnoptimized.js'

/**
 * @internal
 *
 * Computes graph repulsion
 * @param nodes The set of nodes
 * @param config The force atlas 2 configuration
 * @returns The amount of repulsion in the graph
 */
export function computeRepulsion(
	nodes: NodeStore,
	config: FA2Configuration,
): number {
	return config.barnesHutOptimize
		? computeRepulsionBarnesHut(nodes, config)
		: computeRepulsionUnoptimized(nodes, config)
}
