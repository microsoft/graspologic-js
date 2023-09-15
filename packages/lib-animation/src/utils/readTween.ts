/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { AttributeName, ArrayStore } from '@graspologic/memstore'

/**
 * @internal
 *
 * Read a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @returns The duration and start time of the tween
 */
export function readTween(
	store: ArrayStore,
	storeId: number,
	tweenAttribute: AttributeName,
) {
	const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4
	return [
		store.float32Array[baseTypedOffset],
		store.float32Array[baseTypedOffset + 1],
	] as [number, number]
}

/**
 * @internal
 *
 * Reads the computed end time of the given tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @returns The computed end time of the tween
 */
//
export function readTweenEndTime(
	store: ArrayStore,
	storeId: number,
	tweenAttribute: AttributeName,
) {
	const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4
	return (
		store.float32Array[baseTypedOffset] +
		store.float32Array[baseTypedOffset + 1]
	)
}
