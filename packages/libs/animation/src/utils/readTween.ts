/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName, ArrayStore } from '@graspologic/memstore'

/**
 * @internal
 *
 * Read a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @returns The start time of the tween
 */
export function readTween(
	store: ArrayStore,
	storeId: number,
	tweenAttribute: AttributeName,
) {
	if (process.env.NODE_ENV !== 'production') {
		if (tweenAttribute.indexOf('.tween') < 0) {
			throw new Error(`${tweenAttribute} is not a tween attribute!`)
		}
	}

	const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4
	return [
		store.float32Array[baseTypedOffset],
		store.float32Array[baseTypedOffset + 1],
	] as [number, number]
}
