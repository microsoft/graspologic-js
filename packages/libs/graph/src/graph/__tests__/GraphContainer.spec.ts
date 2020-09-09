/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '../GraphContainer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('./staticGraph.json')

describe('GraphContainer', () => {
	it('can intern a graph', () => {
		const graph = GraphContainer.intern(data)
		const nodeCount = graph.nodes.count
		const edgeCount = graph.edges.count
		expect(nodeCount).toEqual(data.nodes.length)
		expect(edgeCount).toEqual(data.edges.length)
	})

	it('can serialize and deserialize', () => {
		let graph = GraphContainer.intern(data)
		graph = GraphContainer.deserialize(graph.serialize())
		expect(graph.nodes.count).toEqual(data.nodes.length)
		expect(graph.edges.count).toEqual(data.edges.length)
	})
})
