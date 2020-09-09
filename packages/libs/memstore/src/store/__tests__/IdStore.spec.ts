/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createLayoutBuilder } from '../../specification'
import { ArrayStoreImpl } from '../ArrayStore'
import { IdStore, IdStoreImpl } from '../IdStore'
import { SlotAllocator } from '../SlotAllocator'

describe('IdStore', () => {
	function createBasicLayout() {
		return createLayoutBuilder().addUint8('x').addUint8('y').build()
	}

	function createBasicItemStore(): IdStore {
		const layout = createBasicLayout()
		return new IdStoreImpl(
			new ArrayStoreImpl(layout, { capacity: 3, shared: true }),
			new SlotAllocator(3),
		)
	}

	it('can add items', () => {
		const store = createBasicItemStore()
		let ids = [...store.itemIds()]
		expect(ids).toHaveLength(0)
		const id1 = store.add()
		const id2 = store.add()
		const id3 = store.add()

		ids = [...store.itemIds()]
		expect(ids).toHaveLength(3)
		expect(ids[0]).toEqual(0)
		expect(ids[1]).toEqual(1)
		expect(ids[2]).toEqual(2)
		expect(id1).toEqual(0)
		expect(id2).toEqual(1)
		expect(id3).toEqual(2)
	})

	it('should fire add event when an item is added', () => {
		const store = createBasicItemStore()
		const addedIds: number[] = []
		store.onAddItem(id => {
			addedIds.push(id)
		})
		const id = store.add()
		expect(addedIds).toEqual([id])
	})

	it('should fire remove event when an item is removed', () => {
		const store = createBasicItemStore()
		const id = store.add()

		const removedIds: number[] = []
		store.onRemoveItem(id => {
			removedIds.push(id)
		})

		store.remove(id)

		expect(removedIds).toEqual([id])
	})

	it('should fire remove event for each item on reset', () => {
		const store = createBasicItemStore()
		const ids = [store.add(), store.add(), store.add()]

		const removedIds: number[] = []
		store.onRemoveItem(id => {
			removedIds.push(id)
		})

		store.reset()

		expect(ids.sort()).toEqual(removedIds.sort())
	})
})
