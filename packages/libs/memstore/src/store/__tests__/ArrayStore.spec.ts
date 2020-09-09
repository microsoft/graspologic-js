/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createLayoutBuilder } from '../../specification'
import { ArrayStoreImpl } from '../ArrayStore'

describe('ArrayStore', () => {
	function createBasicLayout() {
		return createLayoutBuilder()
			.addFloat32('x')
			.addFloat32('y')
			.addUint8('fixed')
			.build()
	}

	it('can be created with the correct buffer size', () => {
		const store = new ArrayStoreImpl(createBasicLayout(), {
			capacity: 2,
		})
		expect(store).toBeDefined()
		expect(store.dataView.byteLength).toEqual(store.bytesPerItem * 2)
		expect(store.count).toEqual(2)
	})

	it('can be destroyed', () => {
		const store = new ArrayStoreImpl(createBasicLayout(), {
			capacity: 2,
		})
		expect(store).toBeDefined()
		expect(store.dataView.byteLength).toEqual(store.bytesPerItem * 2)
		store.destroy()
		expect(store.dataView.byteLength).toEqual(0)
	})

	it('throws on invalid item data indices', () => {
		const store = new ArrayStoreImpl(createBasicLayout(), {
			capacity: 2,
		})
		expect(() => store.itemData(-1)).toThrow()
		expect(() => store.itemData(2 * store.bytesPerItem)).toThrow()
	})

	it('returns correct byte offsets', () => {
		const store = new ArrayStoreImpl(createBasicLayout(), {
			capacity: 2,
		})
		let offset = store.getByteOffset(1)
		expect(offset).toEqual(12 /* x + y + bool + padding */)

		offset = store.getByteOffsetAttr(1, 'x')
		expect(offset).toEqual(12)

		offset = store.getByteOffsetAttr(1, 'y')
		expect(offset).toEqual(12 + 4)

		offset = store.getByteOffsetAttr(1, 'fixed')
		expect(offset).toEqual(12 + 8)
	})
})
