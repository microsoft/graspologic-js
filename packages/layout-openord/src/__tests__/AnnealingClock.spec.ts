/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AnnealingClock } from '../AnnealingClock'
import { AnnealingPhase } from '../types'

describe('Annealing Clock', () => {
	it('can be constructed', () => {
		const clock = new AnnealingClock()
		expect(clock).toBeDefined()
		expect(clock.isComplete).toBeFalsy()
		expect(clock.phase).toEqual(AnnealingPhase.Initial)
		expect(clock.iteration).toBe(0)
		expect(clock.phaseIteration).toBe(0)
		expect(clock.targetPhaseIterations).toBe(1)

		clock.tick()
		expect(clock.iteration).toBe(1)
		expect(clock.phaseIteration).toBe(0)
		expect(clock.phase).toEqual(AnnealingPhase.Liquid)

		for (let i = 0; i < 199; i++) {
			clock.tick()
			expect(clock.phase).toEqual(AnnealingPhase.Liquid)
		}

		clock.tick()
		expect(clock.phase).toEqual(AnnealingPhase.Expansion)
	})
})
