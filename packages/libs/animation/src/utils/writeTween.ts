/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeName, ArrayStore } from '@graspologic/memstore'

/**
 * @internal
 *
 * Writes a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @param duration The duration of the tween
 * @param startTime The start time of the tween
 * @returns The start time of the tween
 */
export function writeTween(
	store: ArrayStore,
	storeId: number,
	tweenAttribute: AttributeName,
	duration: number,
	startTime: number,
) {
	if (process.env.NODE_ENV !== 'production') {
		if (tweenAttribute.indexOf('.tween') < 0) {
			throw new Error(`${tweenAttribute} is not a tween attribute!`)
		}
	}

	const baseTypedOffset = store.getByteOffsetAttr(storeId, tweenAttribute) / 4
	store.float32Array[baseTypedOffset] = duration
	store.float32Array[baseTypedOffset + 1] = startTime
}
