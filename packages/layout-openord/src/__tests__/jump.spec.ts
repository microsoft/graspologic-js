/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { jumpRandom, jumpTowards } from '../jumps'
import { distanceTo } from '@graspologic/graph'

describe('jump utilities', () => {
	it('can execute random jumps', () => {
		const randJump = jumpRandom({ x: 0, y: 0 }, 0.5)
		expect(distanceTo({ x: 0, y: 0 }, randJump)).toBeLessThan(1)
	})

	it('can execute targeted jumps', () => {
		let jump = jumpTowards({ x: 0, y: 0 }, { x: 10, y: 10 }, 0.0)
		expect(jump.x).toEqual(0)
		expect(jump.y).toEqual(0)

		jump = jumpTowards({ x: 0, y: 0 }, { x: 10, y: 10 }, 1.0)
		expect(jump.x).toEqual(10)
		expect(jump.y).toEqual(10)
	})
})
