/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function getColor(
	colorMap: Map<number, number>,
	colorizer: (key: number) => number,
	key = 0,
): number {
	if (!colorMap.has(key)) {
		const newColor = colorizer(key)
		colorMap.set(key, newColor)
	}
	return colorMap.get(key)!
}
