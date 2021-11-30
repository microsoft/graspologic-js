"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEdgeStore = createEdgeStore;

var _impl = require("./impl");

var _layout = require("./layout");

var _memstore = require("@graspologic/memstore");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * Returns a data buffer to keep track of Edges
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Edge objects
 */
function createEdgeStore(config) {
  const store = new _memstore.ArrayStoreImpl(_layout.edgeMemoryLayout, config);
  const slotAllocator = new _memstore.SlotAllocator( // We use the store capacity, cause it does some defaulting
  store.config.capacity, // If the user explicitly wanted capacity of 0,
  // ignore the allocatedOnCreate and assume nothing is used
  (config === null || config === void 0 ? void 0 : config.capacity) === 0 ? false : Boolean(config === null || config === void 0 ? void 0 : config.allocatedOnCreate));
  const Impl = (config === null || config === void 0 ? void 0 : config.animation) !== false ? _impl.AnimatableEdgeImpl : _impl.EdgeImpl;
  return new _memstore.ReaderStoreImpl(Impl, store, slotAllocator);
}