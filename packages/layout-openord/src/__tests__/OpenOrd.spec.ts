/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '@graspologic/graph'
import { lesMisGraph } from '@graspologic/testdata'
import { openOrd } from '../executeLayout'

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('OpenOrd Layout', () => {
	it('can layout a small graph', async () => {
		jest.setTimeout(10000)
		const graph = GraphContainer.intern(lesMisGraph())
		await openOrd(graph, undefined, undefined, global)

		let atOriginCount = 0
		// verify a layout occurred
		for (const n of graph.nodes) {
			if (n.x === 0 && n.y === 0) {
				atOriginCount++
			}
		}
		expect(atOriginCount).toBeLessThan(10)
	})
})
