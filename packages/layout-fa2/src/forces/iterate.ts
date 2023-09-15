/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Node, NodeStore, EdgeStore } from '@graspologic/graph'
import type { FA2Configuration, ForceMetrics } from '../types.js'
import { applyForces } from './applyForces.js'
import { computeAttraction } from './computeAttraction.js'
import { computeGravity } from './computeGravity.js'
import { computeRepulsion } from './computeRepulsion/index.js'

/**
 * @internal
 *
 * Runs a single iteration of the FA2 algorithm
 * @param nodes The node data
 * @param edges The edge data
 * @param config The layout configuration
 *
 * @returns The applied forces
 */
export function iterate(
	nodes: NodeStore,
	edges: EdgeStore,
	config: FA2Configuration,
): ForceMetrics {
	resetDeltas(nodes)

	// Compute Forces
	const repulseStart = performance.now()
	const repulsion = computeRepulsion(nodes, config)
	const repulseEnd = performance.now()
	const gravity = computeGravity(nodes, config)
	const gravityEnd = performance.now()
	const attraction = computeAttraction(nodes, edges, config)
	const attractionEnd = performance.now()

	console.log(
		'perf - repulsion=%s, gravity=%s, attraction=%s',
		repulseEnd - repulseStart,
		gravityEnd - repulseEnd,
		attractionEnd - gravityEnd,
	)

	return applyForces(nodes, config, repulsion, gravity, attraction)
}

/**
 * Resets the delta properties on all the nodes
 * @param nodes The node data to reset the deltas on
 */
function resetDeltas(nodes: NodeStore) {
	let node: Node
	for (node of nodes) {
		node.dx = 0
		node.dy = 0
	}
}
