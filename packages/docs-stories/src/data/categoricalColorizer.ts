/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorVector, NodeComponentColorizer } from '@graspologic/renderer'
import { load } from '@thematic/core'

const theme = load()
export function createCategoricalColorizer(): NodeComponentColorizer {
	const scale = theme.scales().nominal(50)
	const map = new Map<string, ColorVector>()
	return (_id: string, group: string) => {
		let color: ColorVector = map.get(group)
		if (!color) {
			color = scale(group).rgbav()
			map.set(group, color)
		}
		return color
	}
}

export default createCategoricalColorizer()
