/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// @ts-ignore
import { nodeMemoryLayout } from '@graspologic/graph'
import * as GL from '@luma.gl/constants'
import { Model, Geometry, picking } from 'luma.gl'

import { uint32ColorTypeMapping } from '../../data'
import { adaptMemoryLayoutToLuma } from '../../util'
import { tween } from '../shaders/modules'
// @ts-ignore
import nodeFS from '../shaders/node.fs.glsl'

const GL_TYPE_MAPPINGS = {
	color: uint32ColorTypeMapping,
	'color.start': uint32ColorTypeMapping,
}

/**
 * Returns the shaders used for the edges
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
function getShaders(vs: any, defines: any = {}) {
	return {
		vs,
		fs: nodeFS,
		defines: {
			USE_ANIMATION: 1,
			...defines,
		},
		modules: [picking, tween],
		varyings: ['vOnScreen'],
	}
}

/**
 * @internal
 *
 * Creates a model object representing our nodes
 * @param gl The gl context
 * @param id The id of the model
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */
export default function createModel(
	gl: WebGLRenderingContext,
	id: string,
	vs: string,
	defines: any = {},
) {
	// prettier-ignore
	const positions = [
		-1, -1, 0,
		 1, -1, 0,
		-1,  1, 0,

		 1, -1, 0,
		-1,  1, 0,
		 1,  1, 0,
	]

	const { buffer, attributes } = adaptMemoryLayoutToLuma(
		gl,
		nodeMemoryLayout,
		GL_TYPE_MAPPINGS,
	)

	return {
		model: new Model(gl, {
			...getShaders(vs, defines),
			id,
			isInstanced: true,
			shaderCache: null,
			geometry: new Geometry({
				drawMode: GL.TRIANGLES,
				vertexCount: 6,
				attributes: {
					aVertex: {
						value: new Float32Array(positions),
						size: 3,
						type: GL.FLOAT,
					},
				},
			}),
			attributes,
		}),
		buffer,
	}
}
