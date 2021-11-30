/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

export function useDataRange(data: number[]): [number, number] {
	return useMemo(() => [Math.min(...data), Math.max(...data)], [data])
}
