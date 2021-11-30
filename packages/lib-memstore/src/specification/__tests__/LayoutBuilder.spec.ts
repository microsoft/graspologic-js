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

		expect(layout.size).toEqual(8)
		expect(layout.stride).toEqual(24)

		expect(layout.get('sourcePosition')!.offset).toEqual(0)
		expect(layout.get('sourcePosition')!.typedOffset).toEqual(0)
		expect(layout.get('x')!.offset).toEqual(0)
		expect(layout.get('x')!.typedOffset).toEqual(0)
		expect(layout.get('y')!.offset).toEqual(4)
		expect(layout.get('y')!.typedOffset).toEqual(1)
		expect(layout.get('z')!.offset).toEqual(8)
		expect(layout.get('z')!.typedOffset).toEqual(2)

		expect(layout.get('targetPosition')!.offset).toEqual(12)
		expect(layout.get('x2')!.offset).toEqual(12)
		expect(layout.get('x2')!.typedOffset).toEqual(3)
		expect(layout.get('y2')!.offset).toEqual(16)
		expect(layout.get('y2')!.typedOffset).toEqual(4)
		expect(layout.get('z2')!.offset).toEqual(20)
		expect(layout.get('z2')!.typedOffset).toEqual(5)
	})

	it('can build a color vector with a retyped alias', () => {
		const layout = createLayoutBuilder()
			.addUint8Vec4('color', {
				components: ['a', 'r', 'g', 'b'],
				aliases: [{ name: 'colorInt', type: AttributeType.Uint32 }],
			})
			.build()

		expect(layout.size).toEqual(6)
		expect(layout.stride).toEqual(4)

		expect(layout.get('color')!.offset).toEqual(0)
		expect(layout.get('color')!.typedOffset).toEqual(0)
		expect(layout.get('a')!.offset).toEqual(0)
		expect(layout.get('a')!.typedOffset).toEqual(0)
		expect(layout.get('r')!.offset).toEqual(1)
		expect(layout.get('r')!.typedOffset).toEqual(1)
		expect(layout.get('g')!.offset).toEqual(2)
		expect(layout.get('g')!.typedOffset).toEqual(2)
		expect(layout.get('b')!.offset).toEqual(3)
		expect(layout.get('b')!.typedOffset).toEqual(3)
		expect(layout.get('colorInt')!.offset).toEqual(0)
		expect(layout.get('colorInt')!.type).toEqual(AttributeType.Uint32)
	})
})
