/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { AttributeName } from '../specification/index.js'
import type { ArrayStore } from './ArrayStore.js'
import type { SlotAllocator } from './SlotAllocator.js'
import type { AttributeUpdatedHandler, AddRemoveItemHandler, Detach } from './types.js'

/**
 * A store which stores ids
 */
export interface IdStore {
	/**
	 * The backing ArrayStore
	 */
	readonly store: ArrayStore

	/**
	 * The count of ids
	 */
	readonly count: number

	/**
	 * Returns an iterator for all of the items contained in this store
	 */
	itemIds(): Iterable<number>

	// Event Handlers
	/**
	 * Calls __handler__ when an attribute is updated
	 * @param handler The attribute updated handler
	 */
	onAttributeUpdated(handler: AttributeUpdatedHandler): () => void

	/**
	 * Calls __handler__ when an item has been added
	 * @param handler The item added handler
	 */
	onAddItem(handler: AddRemoveItemHandler): () => void

	/**
	 * Calls __handler__ when an item has been removed
	 * @param handler The item removed handler
	 */
	onRemoveItem(handler: AddRemoveItemHandler): () => void

	/**
	 * Adds space a new item
	 * @returns The store index of the new item
	 */
	add(): number

	/**
	 * Removes the primitive with the given store id
	 * @param storeId The store id
	 */
	remove(idx: number): void

	/**
	 * Resets the Buffer back to the default state
	 */
	reset(): void

	/**
	 * Destroys this store instance
	 */
	destroy(): void

	/**
	 * Notifies the PrimitiveStore of an Attribute change externally
	 * @param storeId The store id
	 * @param attribute The attribute that changed
	 */
	notify(storeId: number, attribute: AttributeName): void
}

/**
 * __&commat;internal__
 *
 * An implementation of an IdStore
 */
export class IdStoreImpl implements IdStore {
	private _store: ArrayStore
	private _count = 0

	/** a map of available storage slots in the buffer, modeled as alinked list */
	protected slotAllocator: SlotAllocator

	/** callbacks and handlers */
	protected onUpdateHandlers: AttributeUpdatedHandler[] = []
	protected onAddHandlers: AddRemoveItemHandler[] = []
	protected onRemoveHandlers: AddRemoveItemHandler[] = []

	// #region construction

	/**
	 * Constructor for the IdStoreImpl
	 * @param store The backing ArrayStore
	 * @param allocator The allocator for allocating new ids
	 */
	public constructor(store: ArrayStore, allocator: SlotAllocator) {
		this._store = store
		this.slotAllocator = allocator
		this._count = allocator.usedCount
	}

	// #endregion

	/**
	 * @inheritdoc
	 * @see {@link IdStore.store}
	 */
	public get store(): ArrayStore {
		return this._store
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.count}
	 */
	public get count(): number {
		return this._count
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.itemIds}
	 */
	public itemIds(): Iterable<number> {
		return this.slotAllocator.used()
	}

	// #region pubsub events
	/**
	 * @inheritdoc
	 * @see {@link IdStore.onAttributeUpdated}
	 */
	public onAttributeUpdated(handler: AttributeUpdatedHandler): Detach {
		this.onUpdateHandlers.push(handler)
		return () => {
			this.onUpdateHandlers = this.onUpdateHandlers.filter(h => h !== handler)
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.onAddItem}
	 */
	public onAddItem(handler: AddRemoveItemHandler): Detach {
		this.onAddHandlers.push(handler)
		return () => {
			this.onAddHandlers = this.onAddHandlers.filter(h => h !== handler)
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.onRemoveItem}
	 */
	public onRemoveItem(handler: AddRemoveItemHandler): Detach {
		this.onRemoveHandlers.push(handler)
		return () => {
			this.onRemoveHandlers = this.onRemoveHandlers.filter(h => h !== handler)
		}
	}

	// #endregion

	/**
	 * @inheritdoc
	 * @see {@link IdStore.add}
	 */
	public add(events = true): number {
		if (!this.slotAllocator.hasFreeSpace) {
			const prevNumItems = this.store.count
			const newNumItems = prevNumItems + this.store.config.capacity
			this.store.resize(newNumItems)
			this.slotAllocator.grow(newNumItems)
		}

		const itemIndex = this.slotAllocator.alloc()
		this._count++
		if (events) {
			this.fireAddHandlers(itemIndex)
		}
		return itemIndex
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.remove}
	 */
	public remove(idx: number, events = true) {
		if (events) {
			this.fireRemoveHandlers(idx)
		}
		this.slotAllocator.free(idx)
		this._count--
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.reset}
	 */
	public reset() {
		const numItems = this._store.config.capacity!

		for (const id of this.itemIds()) {
			this.fireRemoveHandlers(id)
		}

		this._store.resize(numItems)
		this.slotAllocator.reset(numItems)
		this._count = 0
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.destroy}
	 */
	public destroy() {
		this.store.destroy()
		this.slotAllocator.destroy()
		this.onRemoveHandlers = []
		this.onAddHandlers = []
		this.onUpdateHandlers = []
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.notify}
	 */
	public notify(id: number, attribute?: AttributeName) {
		for (const handler of this.onUpdateHandlers) {
			try {
				handler(id, attribute)
			} catch (e) {
				console.error('caught error', e)
			}
		}
	}

	/**
	 * Raises the add event
	 * @param itemIndex The added item index
	 */
	protected fireAddHandlers(itemIndex: number) {
		this.onAddHandlers.forEach(h => h(itemIndex))
	}

	/**
	 * Raises the add event
	 * @param itemIndex The added item index
	 */
	protected fireRemoveHandlers(itemIndex: number) {
		this.onRemoveHandlers.forEach(h => h(itemIndex))
	}
}
