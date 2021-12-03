/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo, RefObject } from 'react'

export function useDrawingContext(ref: RefObject<HTMLCanvasElement>) {
	return useMemo(() => ref.current && ref.current.getContext('2d'), [
		ref,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		ref && ref.current,
	])
}
