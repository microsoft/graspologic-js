/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const lumaGLTools = jest.createMockFromModule('@luma.gl/gltools')
const lumaWebGL = jest.createMockFromModule('@luma.gl/webgl')
const lumaEngine = jest.createMockFromModule('@luma.gl/engine')

lumaGLTools.createGLContext = () => ({
	canvas: {
		getBoundingClientRect: () => ({
			width: 100,
			height: 100,
		}),
	},
})

// luma.encodePickingColor = () => [155, 155, 155, 155]

lumaWebGL.Framebuffer = class Framebuffer {
	attach() {}
	checkStatus() {}
}

lumaWebGL.Buffer = class Buffer {
	setData() {}
}

lumaWebGL.Texture2D = class Texture2D {}

lumaEngine.AnimationLoop = class AnimationLoop {
	start() {}
}

lumaEngine.Geometry = class Geometry {}

lumaEngine.Model = class Model {}

lumaEngine.mock = true

module.exports = lumaEngine
