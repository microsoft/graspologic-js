/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorVector, Id, Maybe } from '@graspologic/renderer'
import { load } from '@thematic/core'

const theme = load()
const scale = theme.scales().nominal(50)

export function colorizer(id: Maybe<Id>, group: Maybe<Id>): ColorVector {
	return scale(group!).rgbav() as ColorVector
}
