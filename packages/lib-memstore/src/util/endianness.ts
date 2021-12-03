/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum Endianness {
	Little,
	Big,
}

// https://stackoverflow.com/a/19606031
/**
 * Returns the endianness of the system
 */
export function endianness() {
	const arrayBuffer = new ArrayBuffer(2)
	const uint8Array = new Uint8Array(arrayBuffer)
	const uint16array = new Uint16Array(arrayBuffer)
	uint8Array[0] = 0xaa // set first byte
	uint8Array[1] = 0xbb // set second byte
	if (uint16array[0] === 0xbbaa) return Endianness.Little
	if (uint16array[0] === 0xaabb) return Endianness.Big
	else throw new Error('Something crazy just happened')
}
