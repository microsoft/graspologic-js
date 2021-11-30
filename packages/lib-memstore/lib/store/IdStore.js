/**
 * __&commat;internal__
 *
 * An implementation of an IdStore
 */
export class IdStoreImpl {
    _store;
    _count = 0;
    /** a map of available storage slots in the buffer, modeled as alinked list */
    slotAllocator;
    /** callbacks and handlers */
    onUpdateHandlers = [];
    onAddHandlers = [];
    onRemoveHandlers = [];
    // #region construction
    /**
     * Constructor for the IdStoreImpl
     * @param store The backing ArrayStore
     * @param allocator The allocator for allocating new ids
     */
    constructor(store, allocator) {
        this._store = store;
        this.slotAllocator = allocator;
        this._count = allocator.usedCount;
    }
    // #endregion
    /**
     * @inheritdoc
     * @see {@link IdStore.store}
     */
    get store() {
        return this._store;
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.count}
     */
    get count() {
        return this._count;
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.itemIds}
     */
    itemIds() {
        return this.slotAllocator.used();
    }
    // #region pubsub events
    /**
     * @inheritdoc
     * @see {@link IdStore.onAttributeUpdated}
     */
    onAttributeUpdated(handler) {
        this.onUpdateHandlers.push(handler);
        return () => {
            this.onUpdateHandlers = this.onUpdateHandlers.filter(h => h !== handler);
        };
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.onAddItem}
     */
    onAddItem(handler) {
        this.onAddHandlers.push(handler);
        return () => {
            this.onAddHandlers = this.onAddHandlers.filter(h => h !== handler);
        };
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.onRemoveItem}
     */
    onRemoveItem(handler) {
        this.onRemoveHandlers.push(handler);
        return () => {
            this.onRemoveHandlers = this.onRemoveHandlers.filter(h => h !== handler);
        };
    }
    // #endregion
    /**
     * @inheritdoc
     * @see {@link IdStore.add}
     */
    add(events = true) {
        if (!this.slotAllocator.hasFreeSpace) {
            const prevNumItems = this.store.count;
            const newNumItems = prevNumItems + this.store.config.capacity;
            this.store.resize(newNumItems);
            this.slotAllocator.grow(newNumItems);
        }
        const itemIndex = this.slotAllocator.alloc();
        this._count++;
        if (events) {
            this.fireAddHandlers(itemIndex);
        }
        return itemIndex;
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.remove}
     */
    remove(idx, events = true) {
        if (events) {
            this.fireRemoveHandlers(idx);
        }
        this.slotAllocator.free(idx);
        this._count--;
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.reset}
     */
    reset() {
        const numItems = this._store.config.capacity;
        for (const id of this.itemIds()) {
            this.fireRemoveHandlers(id);
        }
        this._store.resize(numItems);
        this.slotAllocator.reset(numItems);
        this._count = 0;
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.destroy}
     */
    destroy() {
        this.store.destroy();
        this.slotAllocator.destroy();
        this.onRemoveHandlers = [];
        this.onAddHandlers = [];
        this.onUpdateHandlers = [];
    }
    /**
     * @inheritdoc
     * @see {@link IdStore.notify}
     */
    notify(id, attribute) {
        for (const handler of this.onUpdateHandlers) {
            try {
                handler(id, attribute);
            }
            catch (e) {
                console.error('caught error', e);
            }
        }
    }
    /**
     * Raises the add event
     * @param itemIndex The added item index
     */
    fireAddHandlers(itemIndex) {
        this.onAddHandlers.forEach(h => h(itemIndex));
    }
    /**
     * Raises the add event
     * @param itemIndex The added item index
     */
    fireRemoveHandlers(itemIndex) {
        this.onRemoveHandlers.forEach(h => h(itemIndex));
    }
}
