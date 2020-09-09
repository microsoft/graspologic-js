/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { linear } from '../easings'
// @ts-ignore
import vs from './tween.glsl'
export const tween = {
	name: 'tween-module',
	vs,
	fs: null,
	dependencies: [linear],
	deprecations: [],
}
