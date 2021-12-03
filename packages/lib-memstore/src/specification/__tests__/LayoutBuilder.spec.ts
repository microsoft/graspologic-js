/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createLayoutBuilder } from '../LayoutBuilder'
import { AttributeType } from '../types'

describe('The Layout Builder', () => {
	it('can build a position vector with component aliases', () => {
		const layout = createLayoutBuilder()
			.addFloat32Vec3('sourcePosition', { components: ['x', 'y', 'z'] })
			.addFloat32Vec3('targetPosition', { components: ['x2', 'y2', 'z2'] })
			.build()

		expect(layout.size).toBe(8)
		expect(layout.stride).toBe(24)

		expect(layout.get('sourcePosition')!.offset).toBe(0)
		expect(layout.get('sourcePosition')!.typedOffset).toBe(0)
		expect(layout.get('x')!.offset).toBe(0)
		expect(layout.get('x')!.typedOffset).toBe(0)
		expect(layout.get('y')!.offset).toBe(4)
		expect(layout.get('y')!.typedOffset).toBe(1)
		expect(layout.get('z')!.offset).toBe(8)
		expect(layout.get('z')!.typedOffset).toBe(2)

		expect(layout.get('targetPosition')!.offset).toBe(12)
		expect(layout.get('x2')!.offset).toBe(12)
		expect(layout.get('x2')!.typedOffset).toBe(3)
		expect(layout.get('y2')!.offset).toBe(16)
		expect(layout.get('y2')!.typedOffset).toBe(4)
		expect(layout.get('z2')!.offset).toBe(20)
		expect(layout.get('z2')!.typedOffset).toBe(5)
	})

	it('can build a color vector with a retyped alias', () => {
		const layout = createLayoutBuilder()
			.addUint8Vec4('color', {
				components: ['a', 'r', 'g', 'b'],
				aliases: [{ name: 'colorInt', type: AttributeType.Uint32 }],
			})
			.build()

		expect(layout.size).toBe(6)
		expect(layout.stride).toBe(4)

		expect(layout.get('color')!.offset).toBe(0)
		expect(layout.get('color')!.typedOffset).toBe(0)
		expect(layout.get('a')!.offset).toBe(0)
		expect(layout.get('a')!.typedOffset).toBe(0)
		expect(layout.get('r')!.offset).toBe(1)
		expect(layout.get('r')!.typedOffset).toBe(1)
		expect(layout.get('g')!.offset).toBe(2)
		expect(layout.get('g')!.typedOffset).toBe(2)
		expect(layout.get('b')!.offset).toBe(3)
		expect(layout.get('b')!.typedOffset).toBe(3)
		expect(layout.get('colorInt')!.offset).toBe(0)
		expect(layout.get('colorInt')!.type).toEqual(AttributeType.Uint32)
	})
})
