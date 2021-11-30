'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.testGraph = void 0
// eslint-disable-next-line @typescript-eslint/no-var-requires
const testGraphData = require('../data/testGraph.json')
/**
 * Returns an InputGraph of the test dataset
 * @param includePositions If true, node position info will be included
 */
function testGraph(includePositions = false) {
	const graph = {
		nodes: [],
		edges: [],
	}
	testGraphData.graph.nodes.forEach(n => {
		const size = n.size || n.weight
		const node = {
			id: n.id,
			group: `${n.category}`,
			size,
			weight: size,
		}
		if (includePositions) {
			node.x = n.x
			node.y = n.y
			node.z = n.z || 0
		}
		graph.nodes.push(node)
	})
	testGraphData.graph.edges.forEach(e => {
		graph.edges.push({
			source: e.source,
			target: e.target,
			weight: e.weight,
		})
	})
	return graph
}
exports.testGraph = testGraph
