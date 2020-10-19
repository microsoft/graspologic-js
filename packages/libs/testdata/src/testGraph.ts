/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputGraph } from '@graspologic/graph'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const testGraphData = require('../data/testGraph.json')

/**
 * Returns an InputGraph of the test dataset
 * @param includePositions If true, node position info will be included
 */
export function testGraph(includePositions = false): InputGraph {
	const graph: InputGraph = {
		nodes: [],
		edges: [],
	}

	testGraphData.graph.nodes.forEach((n: any) => {
		const size = n.size || n.weight
		const node = {
			id: n.id,
			group: `${n.category}`,
			size,
			weight: size,
		} as any
		if (includePositions) {
			node.x = n.x
			node.y = n.y
			node.z = n.z || 0
		}
		graph.nodes.push(node)
	})

	testGraphData.graph.edges.forEach((e: any) => {
		graph.edges.push({
			source: e.source,
			target: e.target,
			weight: e.weight,
		})
	})
	return graph
}
