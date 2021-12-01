/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeImpl, Position } from '@graspologic/graph'
import chalk from 'chalk'
import { interpolateOranges as getColor } from 'd3-scale-chromatic'
import { DensityGrid, FALLOFF, DIAMETER, GRID_SIZE } from '../DensityGrid'

describe('DensityGrid', () => {
	it('can be constructed', () => {
		const result = new DensityGrid()

		// Inspect the bitmap
		expect(result.bitmap).toHaveLength(GRID_SIZE)
		result.bitmap.forEach(row => expect(row).toHaveLength(GRID_SIZE))
	})

	it('clears out the bitmap on node remove', () => {
		const grid = new DensityGrid()
		const nodePos: Position = { x: 10, y: 10 }
		const node1 = new NodeImpl()
		node1.storeId = 0
		node1.x = 10
		node1.y = 10
		node1.size = 5

		const node2 = new NodeImpl()
		node2.storeId = 1
		node2.x = 10
		node2.y = 10
		node2.size = 5

		expect(grid.checksum).toBe(0)
		expect(grid.size).toBe(0)

		// Empty DG should have to density
		expect(grid.getDensity(node1, nodePos)).toBe(0)

		grid.add(node1)
		expect(grid.checksum).toBeGreaterThan(0)
		expect(grid.size).toBe(1)
		grid.initialLoad = false

		// Density at location should be 1.0 for other nodes
		expect(grid.getDensity(node1, nodePos)).toBe(0.0)
		expect(grid.getDensity(node2, nodePos)).toBe(1.0)

		// remove the node - should clear backing bitmap
		grid.subtract(node1)

		// IEEE floats are imprecise
		expect(grid.checksum).toBeCloseTo(0)
		expect(grid.size).toBe(0)
	})

	it('can compute overlap', () => {
		const grid = new DensityGrid()
		const node1 = new NodeImpl()
		node1.storeId = 0
		node1.x = 10
		node1.y = 0
		node1.size = 3

		const node2 = new NodeImpl()
		node2.storeId = 1
		node2.x = 5
		node2.y = 0
		node2.size = 3

		grid.add(node1)
		grid.add(node2)

		// Density at location should be 1.0 for other nodes
		expect(grid.getOverlap(node1, node1)).toBe(1)
	})
})

describe('getInitialFalloffStructure utility', () => {
	it('can generate a bitmap of falloff values', () => {
		const result = FALLOFF
		expect(result).toHaveLength(DIAMETER + 1)
		result.forEach(row => expect(row).toHaveLength(DIAMETER + 1))

		// get a visual rendering of the density structure
		const falloffRendering = result
			.map(row =>
				row.map(cell => chalk.hex(getColor(cell))('\u25A0 ')).join(''),
			)
			.join('\n')

		console.log(falloffRendering)
		expect(result).toMatchSnapshot()
	})
})
