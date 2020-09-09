/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DensityGrid } from './DensityGrid'

/**
 * @internal
 *
 * Generates a sample bitmap from the given density grid
 * @param densityGrid The density grid to sample
 * @param rate The sampling rate. 1=full sample. 2=skip every other row+column
 */
export function sampleBitmap(densityGrid: DensityGrid, rate: number) {
	const bitmap = densityGrid.bitmap
	const result: number[][] = []

	for (let rowIndex = 0; rowIndex < bitmap.length; rowIndex += rate) {
		const row: number[] = []
		result.push(row)

		for (let colIndex = 0; colIndex < bitmap[0].length; colIndex += rate) {
			row.push(bitmap[rowIndex][colIndex])
		}
	}

	return result
}
