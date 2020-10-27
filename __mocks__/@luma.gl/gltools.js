/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const lumaGLTools = {}
lumaGLTools.createGLContext = () => ({
	canvas: {
		getBoundingClientRect: () => ({
			width: 100,
			height: 100,
		}),
	},
})
module.exports = lumaGLTools
