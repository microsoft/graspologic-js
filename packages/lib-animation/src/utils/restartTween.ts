/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { AttributeName, ArrayStore } from '@graspologic/memstore'

/**
 * @internal
 *
 * Restart a tween
 * @param store The attay store
 * @param storeId The item storeid
 * @param tweenAttribute The tween attribute to read
 * @param startTime The start time of the tween
 * @returns The start time of the tween
 */
export function restartTween(
	store: ArrayStore,
	storeId: number,
	tweenAttribute: AttributeName,
	startTime: number,
) {
	if (process.env.NODE_ENV !== 'production') {
		if (tweenAttribute.indexOf('.tween') < 0) {
			throw new Error(`${tweenAttribute} is not a tween attribute!`)
		}
	}

	store.float32Array[
		(store.getByteOffsetAttr(storeId, tweenAttribute) + 4) / 4
	] = startTime
	return startTime
}
