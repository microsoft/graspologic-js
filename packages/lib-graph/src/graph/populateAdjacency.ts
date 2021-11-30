/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node, Edge, NodeStore, EdgeStore } from '../primitives'
import { NodeIndex, EdgeWeight, AdjacencyMap } from './types'

/**
 * @internal
 * Populates an adjacency map
 * @param nodes the nodes data
 * @param edges the edges data
 * @returns An adjacency map
 */
export function populateAdjacency(
	nodes: NodeStore,
	edges: EdgeStore,
): AdjacencyMap {
	const adj = new Map()
	let node: Node
	for (node of nodes) {
		adj.set(node.storeId, {})
	}

	// Load the adjacency matrix
	let maxWeight = 0.000001
	let sourceList: Record<NodeIndex, EdgeWeight>
	let targetList: Record<NodeIndex, EdgeWeight>

	let edge: Edge
	for (edge of edges) {
		const { sourceIndex, targetIndex, weight } = edge
		sourceList = adj.get(sourceIndex)
		targetList = adj.get(targetIndex)
		if (weight > maxWeight) {
			maxWeight = weight
		}
		sourceList[targetIndex] = weight
		targetList[sourceIndex] = weight
	}

	// Nomalize the edge weights
	let value: Record<string, number>
	let key: string
	for (value of adj.values()) {
		for (key of Object.keys(value)) {
			value[parseInt(key, 10)] /= maxWeight
		}
	}

	return adj
}
