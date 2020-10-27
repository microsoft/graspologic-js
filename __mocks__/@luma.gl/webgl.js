/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const lumaWebGL = {}

// luma.encodePickingColor = () => [155, 155, 155, 155]

lumaWebGL.Framebuffer = class Framebuffer {
	attach() {}
	checkStatus() {}
}

lumaWebGL.Buffer = class Buffer {
	setData() {}
}

lumaWebGL.Texture2D = class Texture2D {}

module.exports = lumaWebGL
