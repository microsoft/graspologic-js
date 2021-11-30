/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeImpl } from '../../primitives'
import { QuadTree } from '../QuadTree'

describe('The QuadTree Data Structure', () => {
	it('cannot be constructed empty', () => {
		expect(() => new QuadTree([])).toThrow(/there should be at least one node/)
	})

	it('can add a single node', () => {
		const node = new NodeImpl()
		node.mass = 3
		node.x = 7
		node.y = 7

		const qt = new QuadTree([node])

		// node swings mass & center
		expect(qt.mass).toEqual(3)
		expect(qt.cx).toEqual(7)
		expect(qt.cy).toEqual(7)
		expect(qt.isLeaf).toEqual(true)
	})

	it('can add two nodes', () => {
		const n1 = new NodeImpl()
		n1.mass = 3
		n1.x = 7
		n1.y = 7
		const n2 = new NodeImpl()
		n2.mass = 2
		n2.x = 2
		n2.y = 2
		const qt = new QuadTree([n1, n2])

		// node swings mass & center
		expect(qt.mass).toEqual(5)
		expect(qt.cx).toEqual(5)
		expect(qt.cy).toEqual(5)
		expect(qt.isLeaf).toEqual(false)
		expect(qt.neChild!.mass).toEqual(3)
		expect(qt.swChild!.mass).toEqual(2)
	})

	it('can add two nodes at the same point', () => {
		const n1 = new NodeImpl()
		n1.mass = 3
		n1.x = 2
		n1.y = 2
		const n2 = new NodeImpl()
		n2.mass = 2
		n2.x = 2
		n2.y = 2
		const qt = new QuadTree([n1, n2])

		// node swings mass & center
		expect(qt.mass).toEqual(5)
		expect(qt.cx).toBeCloseTo(2, 0.1)
		expect(qt.cy).toBeCloseTo(2, 0.1)
		expect(qt.isLeaf).toEqual(false)
		expect(qt.depth).toBeLessThan(15)
	})
})
