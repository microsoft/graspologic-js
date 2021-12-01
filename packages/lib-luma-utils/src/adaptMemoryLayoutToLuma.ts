/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryLayout, AttributeType } from '@graspologic/memstore'
import { Buffer } from '@luma.gl/webgl'
import { GL_UNSIGNED_BYTE, GL_FLOAT, GL_UNSIGNED_INT } from './glConstants'

/**
 * Returns the appropriate GL type representing the given Attribute Type
 * @param type The attribute type to get the GL type for
 */
function getGLTypeFromAttributeType(type: AttributeType): number {
	if (type === AttributeType.Float32) {
		return GL_FLOAT
	} else if (type === AttributeType.Uint32) {
		return GL_UNSIGNED_INT
	}
	return GL_UNSIGNED_BYTE
}

/**
 * Adapts an attribute name to a common shader attribute naming format
 * @param attribute The name of the attribute to get the shader name for
 */
function getShaderAttributeName(attribute: string): string {
	return `a${attribute[0].toUpperCase()}${attribute
		.substring(1)
		.replace(/\./g, '_')}`
}

/**
 * Gets the byte size for the given webgl type type
 * @param type The attribute type to get the size for
 */
function getByteSizeFromWebGLType(type: number): number {
	if (type === GL_FLOAT) {
		return 4
	} else if (type === GL_UNSIGNED_INT) {
		return 4
	}
	return 1
}

/**
 * @internal
 *
 * Adapts the given memory layout for use in luma.gl
 * @param gl The rendering context
 * @param layout The memory layout
 * @param glTypeMapping The optional mapping from attribute to the webgl underlying type
 */
export function adaptMemoryLayoutToLuma(
	gl: WebGLRenderingContext,
	layout: MemoryLayout,
	glTypeMapping?: {
		[name: string]: {
			glType: number
			size: number
		}
	},
) {
	const buffer = new Buffer(gl)

	const stride = layout.stride
	const attributes = {} as any
	layout.forEach(attrib => {
		let size = attrib.size
		let glType = getGLTypeFromAttributeType(attrib.type)
		const overridedAttribute = glTypeMapping && glTypeMapping[attrib.name]
		const totalByteSize = getByteSizeFromWebGLType(glType) * size
		if (overridedAttribute) {
			glType = overridedAttribute.glType
			size = overridedAttribute.size
			const overridedByteSize = getByteSizeFromWebGLType(glType) * size
			if (overridedByteSize !== totalByteSize) {
				throw new Error(
					`The overrided total byte size much match the memory layout ${overridedByteSize} !== ${totalByteSize}`,
				)
			}
		}
		attributes[getShaderAttributeName(attrib.name)] = [
			buffer,
			{
				divisor: 1,
				stride,
				integer: false,
				...attrib,
				size,
				type: glType,
			},
		]
	})

	return {
		attributes,
		buffer,
	}
}
