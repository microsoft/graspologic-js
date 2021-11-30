/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../../types'
import { computeRepulsionBarnesHut } from './computeRepulsionBarnesHut'
import { computeRepulsionUnoptimized } from './computeRepulsionUnoptimized'
import { NodeStore } from '@graspologic/graph'

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
