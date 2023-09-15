/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	ArrayStore,
	MemoryReader} from '@graspologic/memstore';
import {
	ArrayStoreImpl,
	SlotAllocator,
	ReaderStoreImpl
} from '@graspologic/memstore'
import { NodeImpl, AnimatableNodeImpl } from './impl/index.js'
import { nodeMemoryLayout } from './layout.js'
import type { NodeStoreConfig, NodeStore, Node } from './types.js'

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
	const slotAllocator = new SlotAllocator(
		// We use the store capacity, cause it does some defaulting
		store.config.capacity!,

		// If the user explicitly wanted capacity of 0,
		// ignore the allocatedOnCreate and assume nothing is used
		config?.capacity === 0 ? false : Boolean(config?.allocatedOnCreate),
	)

	const Impl = config?.animation !== false ? AnimatableNodeImpl : NodeImpl
	return new ReaderStoreImpl<MemoryReader & Node>(Impl, store, slotAllocator)
}
