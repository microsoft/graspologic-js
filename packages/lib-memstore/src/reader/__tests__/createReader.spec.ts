/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ReaderStoreImpl, MemoryReader, createReader } from '..'
import { createLayoutBuilder, AttributeType } from '../../specification'
import { ArrayStoreImpl, SlotAllocator } from '../../store'

describe('createReader', () => {
	it('can generate a class', () => {
		interface Pos extends MemoryReader {
			sourcePosition: [number, number]
			x: number
			y: number

			targetPosition: [number, number]
			x2: number
			y2: number

			color: [number, number, number, number]
			a: number
			r: number
			g: number
			b: number
			colorInt: number
		}
		const layout = createLayoutBuilder()
			.addFloat32Vec2('sourcePosition', { components: ['x', 'y'] })
			.addFloat32Vec2('targetPosition', { components: ['x2', 'y2'] })
			.addUint8Vec4('color', {
				components: ['b', 'g', 'r', 'a'],
				aliases: [
					{
						name: 'colorInt',
						type: AttributeType.Uint32,
					},
				],
			})
			.build()

		const Primitive = createReader<Pos>(Symbol('pos'), layout)
		const arrayStore = new ArrayStoreImpl(layout, { capacity: 1 })
		const store = new ReaderStoreImpl<Pos>(
			Primitive,
			arrayStore,
			new SlotAllocator(1, true),
		)

		const inst = store.itemAt(0)
		inst.sourcePosition = [1, 2]
		expect(inst.x).toBe(1)
		expect(inst.y).toBe(2)

		inst.colorInt = 0xff807a78
		expect(inst.a).toBe(255)
		expect(inst.r).toBe(128)
		expect(inst.g).toBe(122)
		expect(inst.b).toBe(120)
		expect(inst.colorInt).toBe(0xff807a78)
	})
})
