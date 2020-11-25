/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryLayout } from '../specification'
import { IdStore } from '../store'

/**
 * An object for interacting with the raw data for an item stored in an ArrayStore
 */
export interface MemoryReader {
	/**
	 * The memory layout
	 */
	readonly layout: MemoryLayout

	/**
	 * The type of item
	 */
	readonly type: symbol

	/**
	 * The underlying store
	 */
	readonly store: ReaderStore<any>

	/**
	 * The low-level buffer access to the memory
	 */
	readonly buffer: ArrayBuffer

	/**
	 * The low-level Uint8Array view access to the memory
	 */
	readonly uint8Array: Uint8Array

	/**
	 * The low-level Float32Array view access to the memory
	 */
	readonly float32Array: Float32Array

	/**
	 * The low-level Uint32Array view access to the memory
	 */
	readonly uint32Array: Uint32Array

	/**
	 * The id of the item in the store
	 */
	storeId: number

	/**
	 * The byte offset of the item in the store
	 */
	byteOffset: number

	/**
	 * The word offset of the item in the store
	 */
	wordOffset: number

	/**
	 * Connects this reader to a store instance
	 * @param storeId The new storeid
	 * @param store Thes store
	 */
	connect(storeId: number, store: ReaderStore<any>): void
}

/**
 * An object which can be constructed to produce a MemoryReader
 * @typeparam P The property interface for the item (i.e. Edge, Node)
 */
export interface MemoryReaderClass<P> {
	new (store?: ReaderStore<P>, storeId?: number): P & MemoryReader
}

/**
 * A getter function interface
 */
export type GetterFn<T = any> = () => T

/**
 * A setter function
 * @param value The new value of the property
 */
export type SetterFn<T = any, This = MemoryReader> = (
	this: This,
	value: T,
) => void

export type ReaderItem<P> = P &
	MemoryReader & {
		id?: string
	}

/**
 * A store which provides a list like functionality for interacting with MemoryReader based items
 */
export interface ReaderStore<P> extends IdStore, Iterable<ReaderItem<P>> {
	/**
	 * dynamic property storage
	 */
	propertyBags: Record<number, any>

	/**
	 * Accept an item into the store
	 * @param primitive The primitive to accept into storage
	 */
	receive(primitive: ReaderItem<P>): number

	/**
	 * Get an item at an index
	 * @param index The item index
	 */
	itemAt(index: number): ReaderItem<P>

	/**
	 * Copies data from a store into this store
	 * @param targetId The target item id
	 * @param sourceBuffer The source buffer
	 * @param propertyBag The optional property bag
	 * @param store The store to copy from
	 */
	slurp(
		targetId: number,
		sourceBuffer: ArrayBuffer,
		propertyBag?: any,
		sourceOffset?: number,
	): void

	/**
	 * Creates an iterator that efficiently scans through the items contained in this store
	 *
	 * _NOTE_ Items returned from this iterator should not be stored, as references are re-used for iteration
	 */
	scan(): IterableIterator<ReaderItem<P>>

	/**
	 * Returns a filtered list of items within this store
	 * @param ids The ids of the items to retrieve
	 * @param scan Use scan
	 */
	filter(ids: Set<string>, scan?: boolean): IterableIterator<ReaderItem<P>>
}
