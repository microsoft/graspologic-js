/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { internGraph } from '../internGraph'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const graph = require('./staticGraph.json')

describe('internGraph', () => {
	it('can intern a static graph', () => {
		const interned = internGraph(graph)
		expect(interned).toBeDefined()
		expect(interned.nodes.count).toEqual(graph.nodes.length)
		expect(interned.edges.count).toEqual(graph.edges.length)
	})
})
