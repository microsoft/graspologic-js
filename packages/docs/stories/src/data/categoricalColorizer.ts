/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from '@thematic/core'
import { ColorVector } from '@graspologic/renderer'

const theme = load()
const scale = theme.scales().nominal(50)

export default function colorizer(key: any): ColorVector {
	return scale(key).rgbav() as ColorVector
}
