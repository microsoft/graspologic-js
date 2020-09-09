/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorVector } from '@graspologic/renderer'
import { load } from '@thematic/core'

const theme = load()
const scale = theme.scales().nominal(50)

export function colorizer(key: any): ColorVector {
	return scale(key).rgbav() as ColorVector
}
