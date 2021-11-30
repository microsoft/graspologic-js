"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_TYPE_TO_BYTES = void 0;
exports.getAttributeTypeByteSize = getAttributeTypeByteSize;

var _types = require("./types");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * A mapping from AttributeType to the number of bytes required to store it
 */
const DATA_TYPE_TO_BYTES = {
  [_types.AttributeType.Float32]: 4,
  [_types.AttributeType.Uint32]: 4,
  [_types.AttributeType.Uint8]: 1
};
/**
 * @internal
 *
 * Gets the size in bytes for the given data type
 * @param type The data type to inspect
 */

exports.DATA_TYPE_TO_BYTES = DATA_TYPE_TO_BYTES;

function getAttributeTypeByteSize(type) {
  return DATA_TYPE_TO_BYTES[type];
}