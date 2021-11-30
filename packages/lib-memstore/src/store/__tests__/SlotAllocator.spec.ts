/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SlotAllocator } from '../SlotAllocator'

function createInstance(capacity: number) {
	return new SlotAllocator(capacity)
}

describe('SlotAllocator', () => {
	it('can start out with ids consumed', () => {
		const a = new SlotAllocator(3, true)
		const used = [...a.used()]
		expect(a.hasFreeSpace).toEqual(false)
		expect(used).toHaveLength(3)
	})

	it('can retrieve free ids', () => {
		const a = createInstance(1)

		// Initial state pre-allocation
		expect(a.hasFreeSpace).toEqual(true)
		let used = [...a.used()]
		expect(used).toHaveLength(0)

		const index = a.alloc()
		used = [...a.used()]
		expect(index).toEqual(0)
		expect(a.hasFreeSpace).toEqual(false)
		expect(used).toHaveLength(1)
		expect(() => a.alloc()).toThrow()
	})

	it('has an accurate used iterator', () => {
		const a = createInstance(3)

		// Initial state pre-allocation
		expect(a.hasFreeSpace).toEqual(true)
		let used = [...a.used()]
		expect(used).toHaveLength(0)

		let index = a.alloc()
		used = [...a.used()]
		expect(index).toEqual(0)
		expect(used).toHaveLength(1)

		index = a.alloc()
		used = [...a.used()]
		expect(index).toEqual(1)
		expect(used).toHaveLength(2)

		index = a.alloc()
		used = [...a.used()]
		expect(index).toEqual(2)
		expect(used).toHaveLength(3)

		expect(a.hasFreeSpace).toEqual(false)
		expect(() => a.alloc()).toThrow()
	})

	it('throws if constructed with an invalid size', () => {
		expect(() => createInstance(0)).toThrow()
		expect(() => createInstance(-1)).toThrow()
	})
	describe('grow', () => {
		it('throws if run with an invalid size', () => {
			expect(() => createInstance(1).grow(-1)).toThrow()
			expect(() => createInstance(1).grow(0)).toThrow()
			expect(() => createInstance(1).grow(null as any)).toThrow()
		})
	})
	describe('reset', () => {
		it('throws if run with an invalid size', () => {
			expect(() => createInstance(1).reset(-1)).toThrow()
			expect(() => createInstance(1).reset(0)).toThrow()
			expect(() => createInstance(1).reset(null as any)).toThrow()
		})
	})
})
