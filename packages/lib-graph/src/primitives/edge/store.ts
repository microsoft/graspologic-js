/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ArrayStoreImpl,
	SlotAllocator,
	ArrayStore,
	ReaderStoreImpl,
} from '@graspologic/memstore'
import { EdgeImpl, AnimatableEdgeImpl } from './impl/index.js'
import { edgeMemoryLayout } from './layout.js'
import { EdgeStore, EdgeStoreConfig } from './types.js'

/**
 * @internal
 *
 * Returns a data buffer to keep track of Edges
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Edge objects
 */
export function createEdgeStore(config?: Partial<EdgeStoreConfig>): EdgeStore {
	const store: ArrayStore = new ArrayStoreImpl(edgeMemoryLayout, config)
	const slotAllocator = new SlotAllocator(
		// We use the store capacity, cause it does some defaulting
		store.config.capacity!,

		// If the user explicitly wanted capacity of 0,
		// ignore the allocatedOnCreate and assume nothing is used
		config?.capacity === 0 ? false : Boolean(config?.allocatedOnCreate),
	)

	const Impl = config?.animation !== false ? AnimatableEdgeImpl : EdgeImpl
	return new ReaderStoreImpl(Impl, store, slotAllocator)
}
