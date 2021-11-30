/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IdStoreImpl, ArrayStore, SlotAllocator } from '../store';
import { MemoryReaderClass, ReaderStore, MemoryReader } from './types';
/**
 * @inheritdoc
 * @see {@link ReaderStore}
 */
export declare class ReaderStoreImpl<P extends MemoryReader> extends IdStoreImpl implements ReaderStore<P> {
    private items;
    private itemClass;
    propertyBags: Record<number, any>;
    /**
     * Constructor for the ReaderStoreImpl
     * @param itemClass The class of the item, used when constructing new items
     * @param store The underlying store to use
     * @param allocator The allocator to use for allocating new ids
     */
    constructor(itemClass: MemoryReaderClass<P>, store: ArrayStore, allocator?: SlotAllocator);
    /**
     * @inheritdoc
     * @see {@link ReaderStore.receive}
     */
    receive(primitive: P): number;
    /**
     * @inheritdoc
     * @see {@link ReaderStore.itemAt}
     */
    itemAt(storeId: number): P;
    /**
     * @inheritdoc
     * @see {@link ReaderStore.createConnectedItem}
     */
    private createConnectedItem;
    [Symbol.iterator](): Iterator<P>;
    scan(): IterableIterator<P>;
    /**
     * @inheritdoc
     * @see {@link ReaderStore.slurp}
     */
    slurp(targetId: number, sourceBuffer: ArrayBuffer, propertyBag?: any, sourceOffset?: number): void;
    /**
     * @inheritdoc
     * @see {@link IdStore.add}
     */
    add(events?: boolean): number;
    /**
     * @inheritdoc
     * @see {@link IdStore.remove}
     */
    remove(idx: number): void;
    /**
     * @inheritdoc
     * @see {@link IdStore.reset}
     */
    reset(): void;
    /**
     * @inheritdoc
     * @see {@link IdStore.destroy}
     */
    destroy(): void;
}
