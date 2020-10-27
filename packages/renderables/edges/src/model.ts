/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model, Geometry } from '@luma.gl/engine'

import { tween, adaptMemoryLayoutToLuma, uint32ColorTypeMapping, GL_FLOAT, GL_TRIANGLE_STRIP } from '@graspologic/luma-utils'
import { edgeMemoryLayout } from './memoryLayout'
import edgeFS from '@graspologic/renderer-glsl/dist/esm/shaders/edge.fs.glsl'


const GL_TYPE_MAPPINGS = {
	color: uint32ColorTypeMapping,
	color2: uint32ColorTypeMapping,
}

/**
 * Returns the shaders used for the edges
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
function getShaders(vs: string, defines: any = {}) {
	return {
		vs: vs,
		fs: edgeFS,
		modules: [tween],
		defines: {
			USE_ANIMATION: 1,
			...defines,
		},
	}
}

/**
 * @internal
 *
 * Creates a model object representing our edges
 * @param gl The gl context
 * @param id The id of the model
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
export default function createModel(
	gl: WebGLRenderingContext,
	id: string,
	vs: string,
	defines = {},
) {
	const positions = [-1, 0, 1, 0, -1, 1, 1, 1]
	const geometry = new Geometry({
		drawMode: GL_TRIANGLE_STRIP,
		vertexCount: 4,
		attributes: {
			aVertex: {
				value: new Float32Array(positions),
				size: 2,
				type: GL_FLOAT,
			},
		},
	})

	const { buffer, attributes } = adaptMemoryLayoutToLuma(
		gl,
		edgeMemoryLayout,
		GL_TYPE_MAPPINGS,
	)

	return {
		model: new Model(gl, {
			...getShaders(vs, defines),
			id,
			isInstanced: true,
			shaderCache: null,
			geometry,
			attributes,
		}),
		buffer,
	}
}
