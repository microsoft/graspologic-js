/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName } from '../specification';
import { ArrayStore } from './ArrayStore';
import { SlotAllocator } from './SlotAllocator';
import { AttributeUpdatedHandler, AddRemoveItemHandler, Detach } from './types';
/**
 * A store which stores ids
 */
export interface IdStore {
    /**
     * The backing ArrayStore
     */
    readonly store: ArrayStore;
    /**
     * The count of ids
     */
    readonly count: number;
    /**
     * Returns an iterator for all of the items contained in this store
     */
    itemIds(): Iterable<number>;
    /**
     * Calls __handler__ when an attribute is updated
     * @param handler The attribute updated handler
     */
    onAttributeUpdated(handler: AttributeUpdatedHandler): () => void;
    /**
     * Calls __handler__ when an item has been added
     * @param handler The item added handler
     */
    onAddItem(handler: AddRemoveItemHandler): () => void;
    /**
     * Calls __handler__ when an item has been removed
     * @param handler The item removed handler
     */
    onRemoveItem(handler: AddRemoveItemHandler): () => void;
    /**
     * Adds space a new item
     * @returns The store index of the new item
     */
    add(): number;
    /**
     * Removes the primitive with the given store id
     * @param storeId The store id
     */
    remove(idx: number): void;
    /**
     * Resets the Buffer back to the default state
     */
    reset(): void;
    /**
     * Destroys this store instance
     */
    destroy(): void;
    /**
     * Notifies the PrimitiveStore of an Attribute change externally
     * @param storeId The store id
     * @param attribute The attribute that changed
     */
    notify(storeId: number, attribute: AttributeName): void;
}
/**
 * __&commat;internal__
 *
 * An implementation of an IdStore
 */
export declare class IdStoreImpl implements IdStore {
    private _store;
    private _count;
    /** a map of available storage slots in the buffer, modeled as alinked list */
    protected slotAllocator: SlotAllocator;
    /** callbacks and handlers */
    protected onUpdateHandlers: AttributeUpdatedHandler[];
    protected onAddHandlers: AddRemoveItemHandler[];
    protected onRemoveHandlers: AddRemoveItemHandler[];
    /**
     * Constructor for the IdStoreImpl
     * @param store The backing ArrayStore
     * @param allocator The allocator for allocating new ids
     */
    constructor(store: ArrayStore, allocator: SlotAllocator);
    /**
     * @inheritdoc
     * @see {@link IdStore.store}
     */
    get store(): ArrayStore;
    /**
     * @inheritdoc
     * @see {@link IdStore.count}
     */
    get count(): number;
    /**
     * @inheritdoc
     * @see {@link IdStore.itemIds}
     */
    itemIds(): Iterable<number>;
    /**
     * @inheritdoc
     * @see {@link IdStore.onAttributeUpdated}
     */
    onAttributeUpdated(handler: AttributeUpdatedHandler): Detach;
    /**
     * @inheritdoc
     * @see {@link IdStore.onAddItem}
     */
    onAddItem(handler: AddRemoveItemHandler): Detach;
    /**
     * @inheritdoc
     * @see {@link IdStore.onRemoveItem}
     */
    onRemoveItem(handler: AddRemoveItemHandler): Detach;
    /**
     * @inheritdoc
     * @see {@link IdStore.add}
     */
    add(events?: boolean): number;
    /**
     * @inheritdoc
     * @see {@link IdStore.remove}
     */
    remove(idx: number, events?: boolean): void;
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
    /**
     * @inheritdoc
     * @see {@link IdStore.notify}
     */
    notify(id: number, attribute?: AttributeName): void;
    /**
     * Raises the add event
     * @param itemIndex The added item index
     */
    protected fireAddHandlers(itemIndex: number): void;
    /**
     * Raises the add event
     * @param itemIndex The added item index
     */
    protected fireRemoveHandlers(itemIndex: number): void;
}
