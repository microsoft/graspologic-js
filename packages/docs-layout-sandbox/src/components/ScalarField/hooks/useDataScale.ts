/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { useMemo } from 'react'

export function useDataScale(
	snapshot: number[][],
): ScaleLinear<number, number> {
	const [, max] = useMemo(() => {
		let minVal = Number.MAX_SAFE_INTEGER
		let maxVal = Number.MIN_SAFE_INTEGER
		for (let y = 0; y < snapshot.length; ++y) {
			minVal = Math.min(minVal, ...snapshot[y])
			maxVal = Math.max(maxVal, ...snapshot[y])
		}
		return [minVal, maxVal]
	}, [snapshot])

	return useMemo(() => scaleLinear().domain([0, max]).range([0, 1]), [max])
}
