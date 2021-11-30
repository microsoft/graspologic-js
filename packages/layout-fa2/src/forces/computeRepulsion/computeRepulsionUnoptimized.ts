/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../../types'
import { computeNodeRepulsion } from './computeNodeRepulsion'
import { NodeStore } from '@graspologic/graph'

/**
 * @internal
 *
 * O(n^2) repulsion - check force against all nodes
 * @params The node data
 * @params The layout configuration
 * @returns The computed repulsion
 */
export function computeRepulsionUnoptimized(
	nodes: NodeStore,
	config: FA2Configuration,
): number {
	// O(n^2) iteration
	let nid1: number
	let nid2: number
	for (nid1 = 0; nid1 < nodes.count; ++nid1) {
		for (nid2 = 0; nid2 < nid1; ++nid2) {
			computeNodeRepulsion(nodes.itemAt(nid1), nodes.itemAt(nid2), config)
		}
	}
	return 0
}
