/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function getCachedColor(
	colorMap: Map<string | number, number>,
	colorizer: (
		group: number | string | undefined,
		id: number | string | undefined,
	) => number,
	group = 0,
	id = 0,
): number {
	if (!colorMap.has(`${id}_${group}`)) {
		const newColor = colorizer(group, id)
		colorMap.set(group, newColor)
	}
	return colorMap.get(group)!
}
