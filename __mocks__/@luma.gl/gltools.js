/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const lumaGLTools = {}
lumaGLTools.createGLContext = () => ({
	canvas: document.createElement('canvas'),
})
module.exports = lumaGLTools
