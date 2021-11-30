let _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IdStoreImpl, SlotAllocator } from '../store';
/**
 * @inheritdoc
 * @see {@link ReaderStore}
 */

_Symbol$iterator = Symbol.iterator;
export class ReaderStoreImpl extends IdStoreImpl {
  /**
   * Constructor for the ReaderStoreImpl
   * @param itemClass The class of the item, used when constructing new items
   * @param store The underlying store to use
   * @param allocator The allocator to use for allocating new ids
   */
  constructor(itemClass, store, allocator = new SlotAllocator(store.config.capacity)) {
    super(store, allocator);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "itemClass", void 0);

    _defineProperty(this, "propertyBags", {});

    this.items = new Array(store.config.capacity);
    this.itemClass = itemClass; // reconnect items on resize

    store.onResize(() => {
      this.items.forEach(i => i && i.connect(i.storeId, this));
    });
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.receive}
   */


  receive(primitive) {
    const storeId = this.add(false);
    this.slurp(storeId, primitive.buffer, primitive.byteOffset);
    primitive.connect(storeId, this);
    this.fireAddHandlers(storeId);
    return storeId;
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.itemAt}
   */


  itemAt(storeId) {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.slotAllocator.has(storeId)) {
        throw new Error(`Element ${storeId} does not exist`);
      }
    }

    return this.items[storeId] || (this.items[storeId] = this.createConnectedItem(storeId));
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.createConnectedItem}
   */


  createConnectedItem(storeId) {
    if (!this.propertyBags[storeId]) {
      this.propertyBags[storeId] = {};
    }

    return new this.itemClass(this, storeId);
  }

  *[_Symbol$iterator]() {
    let idx;

    for (idx of this.itemIds()) {
      yield this.itemAt(idx);
    }
  }

  *scan() {
    let idx;
    let item;

    if (this.count > 0) {
      item = this.createConnectedItem(0);
    }

    if (item) {
      for (idx of this.itemIds()) {
        if (!this.propertyBags[idx]) {
          this.propertyBags[idx] = {};
        }

        item.connect(idx, this);
        yield item;
      }
    }
  }
  /**
   * @inheritdoc
   * @see {@link ReaderStore.slurp}
   */


  slurp(targetId, sourceBuffer, propertyBag = {}, sourceOffset = 0) {
    this.store.slurp(targetId, sourceBuffer, sourceOffset);

    if (propertyBag) {
      this.propertyBags[targetId] = propertyBag;
    } else {
      this.propertyBags[targetId] = undefined;
    } // All the attributes for this item were updated


    this.notify(targetId);
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.add}
   */


  add(events = true) {
    const id = super.add(false);
    this.propertyBags[id] = {};

    if (events) {
      this.fireAddHandlers(id);
    }

    return id;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.remove}
   */


  remove(idx) {
    super.remove(idx); // TODO - handle with onRemove hook?
    // this.writeBool(idx, this.visibleAttrib as T, false)

    this.propertyBags[idx] = undefined;
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.reset}
   */


  reset() {
    super.reset();
    this.propertyBags = {};
  }
  /**
   * @inheritdoc
   * @see {@link IdStore.destroy}
   */


  destroy() {
    super.destroy();
    this.propertyBags = {};
  }

}