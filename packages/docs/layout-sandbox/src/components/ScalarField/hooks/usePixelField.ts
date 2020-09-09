/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'

export function usePixelField(
	data: number[][],
	drawPixel: (x: number, y: number) => void,
	...deps: any[]
) {
	useEffect(() => {
		const height = data.length
		const width = data[0]?.length

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; ++x) {
				drawPixel(x, y)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drawPixel, data, ...deps])
}
