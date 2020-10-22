/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const luma = jest.createMockFromModule('luma.gl')

luma.createGLContext = () => ({
	canvas: {
		getBoundingClientRect: () => ({
			width: 100,
			height: 100,
		}),
	},
})

luma.encodePickingColor = () => [155, 155, 155, 155]

luma.Framebuffer = class Framebuffer {
	attach() {}
	checkStatus() {}
}

luma.Buffer = class Buffer {
	setData() {}
}

luma.Texture2D = class Texture2D {}

luma.AnimationLoop = class AnimationLoop {
	start() {}
}

luma.Geometry = class Geometry {}

luma.Model = class Model {}

luma.mock = true

module.exports = luma
