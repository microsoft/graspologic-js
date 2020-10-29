/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from '@thematic/core'
import { ColorVector, NodeComponentColorizer } from '@graspologic/renderer'

const theme = load()
export function createCategoricalColorizer(): NodeComponentColorizer {
	const scale = theme.scales().nominal(50)
	const map = new Map<string, ColorVector>()
	return (key: string) => {
		let color: ColorVector = map.get(key)
		if (!color) {
			color = scale(key).rgbav()
			map.set(key, color)
		}
		return color
	}
}

export default createCategoricalColorizer()