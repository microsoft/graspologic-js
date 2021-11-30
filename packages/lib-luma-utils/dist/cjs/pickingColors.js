"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodePickingColor = decodePickingColor;
exports.encodePickingColor = encodePickingColor;
exports.getNullPickingColor = getNullPickingColor;

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/web.dom-collections.iterator.js");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// Credit to uber - entire file taken from https://github.com/visgl/luma.gl/blob/cfe129864b6a91492ac1b6fe0c854abddcc62f84/modules/core/src/lib/picking-colors.js
const NULL_PICKING_COLOR = new Uint8Array([0, 0, 0]); // Encodes an index as a Uint8Array([r, g, b]) format picking color

function encodePickingColor(index) {
  return [index + 1 & 255, index + 1 >> 8 & 255, index + 1 >> 16 & 255];
} // Decodes a picking color in [r, g, b] format to an index


function decodePickingColor(color) {
  // assert(color instanceof Uint8Array);
  const [i1, i2, i3] = color; // 1 was added to seperate from no selection

  const index = i1 + i2 * 256 + i3 * 65536 - 1;
  return index;
} // Return picking color representing no item at that pixel


function getNullPickingColor() {
  return NULL_PICKING_COLOR;
}