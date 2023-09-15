/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DEFAULT_CAPACITY } from './defaults.js'

/**
 * A class for managing id allocation
 */
export class SlotAllocator {
	private availableIndices: Map<number, number | undefined> = new Map()
	private nextAvailableIndex: number | undefined

	private capacity = 0

	/**
	 * Constructor for the SlotAllocator
	 * @param capacity The number of ids to support
	 * @param consumed If true, the allocator is assumed to be full
	 * @throws If an invalid capacity is passed to the constructor
	 */
	public constructor(capacity: number = DEFAULT_CAPACITY, consumed = false) {
		if (capacity == null || capacity <= 0) {
			throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`)
		}
		this.capacity = capacity

		// if the allocator starts out consumed, don't reset its capacity
		if (!consumed) {
			this.reset(capacity)
		}
	}

	/**
	 * Resets the allocator back to the default state
	 * @param capacity The number of items to support
	 * @throws If an invalid capacity is passed to the function
	 */
	public reset(capacity: number) {
		if (capacity == null || capacity <= 0) {
			throw new Error(`Invalid capacity ${capacity}, capacity must be > 0`)
		}

		this.capacity = capacity
		for (let i = 0; i < this.capacity - 1; i++) {
			this.availableIndices.set(i, i + 1)
		}
		this.availableIndices.set(this.capacity - 1, -1)
		this.nextAvailableIndex = 0
	}

	/**
	 * Grow the capacity of the slot allocator by __newCapacity__
	 * @param newCapacity The new capacity of the allocator
	 * @throws If an invalid capacity is passed to the function
	 */
	public grow(newCapacity: number) {
		if (newCapacity == null || newCapacity <= 0) {
			throw new Error(
				`Invalid capacity ${newCapacity}, newCapacity must be > 0`,
			)
		}

		for (let i = this.capacity; i < newCapacity - 1; i++) {
			this.availableIndices.set(i, i + 1)
		}
		this.nextAvailableIndex = this.capacity
		this.capacity = newCapacity
	}

	/**
	 * Returns true if there are available ids
	 */
	public get hasFreeSpace() {
		return this.nextAvailableIndex != null
	}

	/**
	 * Frees __index__ for re-use
	 * @param index The index to free
	 * @throws An error for an invalid index
	 */
	public free(index: number) {
		if (index == null || index < 0 || index > this.capacity - 1) {
			throw new Error(`Invalid index ${index}`)
		}
		this.availableIndices.set(index, this.nextAvailableIndex)
		this.nextAvailableIndex = index
	}

	/**
	 * Allocates a new index
	 *
	 * @throws An error if there is no space available
	 */
	public alloc(): number {
		if (this.nextAvailableIndex == null) {
			throw new Error('error allocating index, no space available')
		}
		const freeIndex = this.nextAvailableIndex
		this.nextAvailableIndex =
			this.availableIndices.get(freeIndex)! > 0
				? this.availableIndices.get(freeIndex)
				: undefined
		this.availableIndices.delete(freeIndex)
		return freeIndex
	}

	/**
	 * Returns an iterator for the used slots
	 */
	public *used(): Iterable<number> {
		// Shortcut
		if (
			this.availableIndices.size === 0 &&
			(this.nextAvailableIndex === -1 || this.nextAvailableIndex === undefined)
		) {
			for (let i = 0; i < this.capacity; ++i) {
				yield i
			}
		} else {
			for (let i = 0; i < this.capacity; ++i) {
				if (!this.availableIndices.has(i) && this.nextAvailableIndex !== i) {
					yield i
				}
			}
		}
	}

	/**
	 * Returns true if the given index has been allocated
	 * @param index The index to check
	 */
	public has(index: number) {
		return (
			index >= 0 && index < this.capacity && !this.availableIndices.has(index)
		)
	}

	/**
	 * Returns the number of used indices
	 */
	public get usedCount() {
		return this.capacity - this.availableIndices.size
	}

	/**
	 * Destroy's the allocator
	 */
	public destroy() {
		this.availableIndices = new Map()
		this.nextAvailableIndex = -1
	}
}
