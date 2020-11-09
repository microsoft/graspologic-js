/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Credit to uber - entire file taken from https://github.com/visgl/luma.gl/blob/cfe129864b6a91492ac1b6fe0c854abddcc62f84/modules/core/src/lib/picking-colors.js
const NULL_PICKING_COLOR = new Uint8Array([0, 0, 0])

export type PickingColor = Uint8Array | Uint16Array | Float32Array

// Encodes an index as a Uint8Array([r, g, b]) format picking color
export function encodePickingColor(index: number) {
	return [
		(index + 1) & 255,
		((index + 1) >> 8) & 255,
		((index + 1) >> 16) & 255,
	]
}

// Decodes a picking color in [r, g, b] format to an index
export function decodePickingColor(color: PickingColor) {
	// assert(color instanceof Uint8Array);
	const [i1, i2, i3] = color
	// 1 was added to seperate from no selection
	const index = i1 + i2 * 256 + i3 * 65536 - 1
	return index
}

// Return picking color representing no item at that pixel
export function getNullPickingColor() {
	return NULL_PICKING_COLOR
}
