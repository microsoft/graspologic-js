"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdFactory = createIdFactory;

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function createIdFactory(seedString) {
  let instanceCount = 0;
  return () => "".concat(seedString, "_").concat(instanceCount++, "_");
}