/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

export function useDataDimensions(data: number[][]) {
	return useMemo(() => {
		const samplesWide = data[0]?.length
		const samplesHigh = data.length
		return [samplesWide, samplesHigh]
	}, [data])
}
