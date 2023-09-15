/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ArrayStore} from '../store/index.js';
import { IdStoreImpl, SlotAllocator } from '../store/index.js'
import type { MemoryReaderClass, ReaderStore, MemoryReader } from './types.js'

/**
 * @inheritdoc
 * @see {@link ReaderStore}
 */
export class ReaderStoreImpl<P extends MemoryReader>
	extends IdStoreImpl
	implements ReaderStore<P> {
	private items: P[]
	private itemClass: MemoryReaderClass<P>
	public propertyBags: Record<number, any> = {}

	/**
	 * Constructor for the ReaderStoreImpl
	 * @param itemClass The class of the item, used when constructing new items
	 * @param store The underlying store to use
	 * @param allocator The allocator to use for allocating new ids
	 */
	public constructor(
		itemClass: MemoryReaderClass<P>,
		store: ArrayStore,
		allocator: SlotAllocator = new SlotAllocator(store.config.capacity),
	) {
		super(store, allocator)
		this.items = new Array(store.config.capacity)
		this.itemClass = itemClass

		// reconnect items on resize
		store.onResize(() => {
			this.items.forEach(i => i && i.connect(i.storeId, this))
		})
	}

	/**
	 * @inheritdoc
	 * @see {@link ReaderStore.receive}
	 */
	public receive(primitive: P) {
		const storeId = this.add(false)
		this.slurp(storeId, primitive.buffer, primitive.byteOffset)
		primitive.connect(storeId, this)
		this.fireAddHandlers(storeId)
		return storeId
	}

	/**
	 * @inheritdoc
	 * @see {@link ReaderStore.itemAt}
	 */
	public itemAt(storeId: number): P {
		if (process.env.NODE_ENV !== 'production') {
			if (!this.slotAllocator.has(storeId)) {
				throw new Error(`Element ${storeId} does not exist`)
			}
		}
		return (
			this.items[storeId] ||
			(this.items[storeId] = this.createConnectedItem(storeId))
		)
	}

	/**
	 * @inheritdoc
	 * @see {@link ReaderStore.createConnectedItem}
	 */
	private createConnectedItem(storeId: number): P {
		if (!this.propertyBags[storeId]) {
			this.propertyBags[storeId] = {}
		}
		return new this.itemClass(this, storeId)
	}

	public *[Symbol.iterator](): Iterator<P> {
		let idx: number
		for (idx of this.itemIds()) {
			yield this.itemAt(idx)
		}
	}

	public *scan(): IterableIterator<P> {
		let idx: number
		let item: P | undefined
		if (this.count > 0) {
			item = this.createConnectedItem(0)
		}
		if (item) {
			for (idx of this.itemIds()) {
				if (!this.propertyBags[idx]) {
					this.propertyBags[idx] = {}
				}
				item.connect(idx, this)
				yield item
			}
		}
	}

	/**
	 * @inheritdoc
	 * @see {@link ReaderStore.slurp}
	 */
	public slurp(
		targetId: number,
		sourceBuffer: ArrayBuffer,
		propertyBag: any = {},
		sourceOffset = 0,
	): void {
		this.store.slurp(targetId, sourceBuffer, sourceOffset)

		if (propertyBag) {
			this.propertyBags[targetId] = propertyBag
		} else {
			this.propertyBags[targetId] = undefined
		}

		// All the attributes for this item were updated
		this.notify(targetId)
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.add}
	 */
	public add(events = true): number {
		const id = super.add(false)
		this.propertyBags[id] = {}
		if (events) {
			this.fireAddHandlers(id)
		}
		return id
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.remove}
	 */
	public remove(idx: number) {
		super.remove(idx)
		// TODO - handle with onRemove hook?
		// this.writeBool(idx, this.visibleAttrib as T, false)
		this.propertyBags[idx] = undefined
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.reset}
	 */
	public reset() {
		super.reset()
		this.propertyBags = {}
	}

	/**
	 * @inheritdoc
	 * @see {@link IdStore.destroy}
	 */
	public destroy() {
		super.destroy()
		this.propertyBags = {}
	}
}
