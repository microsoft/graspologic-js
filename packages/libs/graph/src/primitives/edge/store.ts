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
import { EdgeImpl, AnimatableEdgeImpl } from './impl'
import { edgeMemoryLayout } from './layout'
import { EdgeStore, EdgeStoreConfig } from './types'

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

	// if a store is provided, assume the slots are consumed
	const slotAllocator = new SlotAllocator(
		store.config.capacity!,
		Boolean(config?.allocatedOnCreate),
	)

	const Impl = config?.notifications !== false ? AnimatableEdgeImpl : EdgeImpl
	return new ReaderStoreImpl(Impl, store, slotAllocator)
}
