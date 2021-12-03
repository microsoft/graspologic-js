/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import vs from '@graspologic/renderer-glsl/dist/esm/tween/tween.glsl'
import { linear } from '../easings'
export const tween = {
	name: 'tween-module',
	vs,
	fs: null,
	dependencies: [linear],
	deprecations: [],
}
