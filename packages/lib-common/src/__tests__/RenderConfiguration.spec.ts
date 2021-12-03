/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createConfiguration } from '../RenderConfiguration'

// crappy shim for immediate RAF
;(global as any).requestAnimationFrame = (cb: any) => cb()

describe('RenderConfiguration', () => {
	it('can be constructed', () => {
		const inst = createConfiguration()
		expect(inst).toBeDefined()
	})

	it('can copy out a config object', () => {
		const inst = createConfiguration()
		inst.is3D = true
		const clone = inst.copy()
		expect(clone).toBeDefined()
		expect(clone.is3D).toBeTruthy()
	})

	it('can load config object', () => {
		const inst = createConfiguration()

		// detect prop changes on is3D
		let triggerVal: boolean | undefined
		inst.onIs3DChanged(val => {
			triggerVal = val
		})

		inst.load({ is3D: true })
		expect(inst.is3D).toBeTruthy()
		expect(triggerVal).toBeTruthy()
	})
})
