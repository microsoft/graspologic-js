/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { getAttributeTypeByteSize } from './AttributeType.js'
import type {
	AttributeName,
	AttributeSpecification,
	MemoryLayout,
	LayoutBuilder,
	AttributeOptions,
	Vec2AttributeOptions,
	Vec3AttributeOptions,
	Vec4AttributeOptions,
	AttributeAlias,
	InterpretationHint} from './types.js';
import {
	AttributeType
} from './types.js'

export const SpacerAttributeName = '__SPACER__'

/**
 * @internal
 *
 * Specification for an individual item used when constructing a MemoryLayout object
 */
interface AttributeBuildSpec {
	/**
	 * The name of the attribute
	 */
	name: string

	/**
	 * The type of attribute
	 */
	type: AttributeType

	/**
	 * The number of elements in this attribute
	 */
	size: number

	/**
	 * A hint to indicate how the values should be interpreted
	 */
	hint?: InterpretationHint

	/**
	 * Additional options for constructing the layout for the attribute
	 */
	options?: AttributeOptions & { components?: string[] }
}

/**
 * @internal
 *
 * Creates a LayoutBuilder which can be used to construct a MemoryLayout
 */
export function createLayoutBuilder(): LayoutBuilder {
	const toBuild = new Map<AttributeName, AttributeBuildSpec>() as Map<
		AttributeName,
		AttributeBuildSpec
	> & { stride: number }

	function addAttribute(
		name: string,
		type: AttributeType,
		size: number,
		options?:
			| AttributeOptions
			| Vec2AttributeOptions
			| Vec3AttributeOptions
			| Vec4AttributeOptions,
	) {
		toBuild.set(name, {
			name,
			size,
			type,
			options,
		})
	}
	const me = {
		addUint8(name: string, options?: AttributeOptions) {
			addAttribute(name, AttributeType.Uint8, 1, options)
			return me
		},
		addUint8Vec2(name: string, options?: Vec2AttributeOptions) {
			addAttribute(name, AttributeType.Uint8, 2, options)
			return me
		},
		addUint8Vec3(name: string, options?: Vec3AttributeOptions) {
			addAttribute(name, AttributeType.Uint8, 3, options)
			return me
		},
		addUint8Vec4(name: string, options?: Vec4AttributeOptions) {
			addAttribute(name, AttributeType.Uint8, 4, options)
			return me
		},
		addFloat32(name: string, options?: AttributeOptions) {
			addAttribute(name, AttributeType.Float32, 1, options)
			return me
		},
		addFloat32Vec2(name: string, options?: Vec2AttributeOptions) {
			addAttribute(name, AttributeType.Float32, 2, options)
			return me
		},
		addFloat32Vec3(name: string, options?: Vec3AttributeOptions) {
			addAttribute(name, AttributeType.Float32, 3, options)
			return me
		},
		addUint32(name: string, options?: AttributeOptions) {
			addAttribute(name, AttributeType.Uint32, 1, options)
			return me
		},
		build(): MemoryLayout {
			const built: MemoryLayout = new Map() as any

			// Organize so the FLOAT types come before the BYTE types
			// The reason we do this is because FLOAT offsets have to be multiples of 4 (bytes)
			// so, we pack the floats first, so that all their offsets are multiples of 4
			// then we fill in the rest with the bytes
			let offset = 0

			// Float32 first
			toBuild.forEach(attr => {
				if (attr.type === AttributeType.Float32) {
					offset += buildAttribute(attr, offset, built)
				}
			})
			// Uint32 next
			toBuild.forEach(attr => {
				if (attr.type === AttributeType.Uint32) {
					offset += buildAttribute(attr, offset, built)
				}
			})
			// Uint8 Bytes last
			toBuild.forEach(attr => {
				if (attr.type === AttributeType.Uint8) {
					offset += buildAttribute(attr, offset, built)
				}
			})

			const align = offset % 4
			if (offset % 4 !== 0) {
				offset += buildAttribute(
					{
						name: SpacerAttributeName,
						type: AttributeType.Uint8,
						size: 4 - align,
					},
					offset,
					built,
				)
			}
			built.stride = offset
			return built
		},
	}
	return me
}

/**
 * Gets the total number of bytes required to represent a single item in memory
 * @param layout The memory layout
 */
export function getBytesPerItem(layout: MemoryLayout) {
	let byteSizePerItem = 0
	layout.forEach(attribData => {
		byteSizePerItem = Math.max(
			byteSizePerItem,
			attribData.offset +
				attribData.size * getAttributeTypeByteSize(attribData.type),
		)
	})
	return byteSizePerItem
}

/**
 * Builds a attribute specification from __attr__ build configuration
 * @param attr The attribute specification
 * @param offset The offset for the attribute
 * @param built The current mapping of all the attributes
 */
function buildAttribute(
	attr: AttributeBuildSpec,
	offset: number,
	built: Map<AttributeName, AttributeSpecification>,
): number {
	const bytesPerItem = getAttributeTypeByteSize(attr.type)
	const typedOffset = offset / bytesPerItem

	// add the primary attribute
	built.set(attr.name, {
		name: attr.name,
		size: attr.size,
		type: attr.type,
		hint: attr.hint,
		typedOffset,
		offset,
	})

	// add any vector component aliases
	let componentIndex = 0
	let component: string
	for (component of attr.options?.components || []) {
		built.set(component, {
			name: component,
			size: 1,
			type: attr.type,
			typedOffset: typedOffset + componentIndex,
			offset: offset + componentIndex * bytesPerItem,
		})
		componentIndex++
	}

	// add any reinterpretation aliases
	let alias: AttributeAlias
	for (alias of attr.options?.aliases || []) {
		built.set(alias.name, {
			name: alias.name,
			size: alias.size || 1,
			type: alias.type,
			hint: alias.hint,
			typedOffset: offset / getAttributeTypeByteSize(alias.type),
			offset,
		})
	}
	return attr.size * bytesPerItem
}
