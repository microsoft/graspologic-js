/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeImpl, AnimatableNodeImpl } from './impl'
import { nodeMemoryLayout } from './layout'
import { NodeStoreConfig, NodeStore } from './types'
import {
	ArrayStore,
	ArrayStoreImpl,
	SlotAllocator,
	ReaderStoreImpl,
} from '@graspologic/memstore'

/**
 * @internal
 *
 * Returns a data buffer to keep track of Nodes
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Node objects
 */
export function createNodeStore(config?: Partial<NodeStoreConfig>): NodeStore {
	const store: ArrayStore = new ArrayStoreImpl(nodeMemoryLayout, config)

	// if a store is provided, assume the slots are consumed
	const slotAllocator = new SlotAllocator(
		store.config.capacity!,
		Boolean(config?.allocatedOnCreate),
	)
	const Impl = config?.notifications !== false ? AnimatableNodeImpl : NodeImpl
	return new ReaderStoreImpl(Impl, store, slotAllocator)
}
