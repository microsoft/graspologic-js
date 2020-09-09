/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum AttributeType {
	Float32,
	Uint8,
	Uint32,
}

/**
 * The specification for a single attribute contained in a MemoryLayout
 */
export interface AttributeSpecification {
	/**
	 * The property name to use for this attribute in JavaScript client contexts
	 */
	name: string

	/**
	 * The byte offset into the array that this attribute belongs
	 */
	offset: number

	/**
	 * The offset of the attribute in the typed array variant (e.g. float32array)
	 */
	typedOffset: number

	/**
	 * The number of elements constituting this attribute
	 */
	size: number

	/**
	 * The Attribute type
	 */
	type: AttributeType

	/**
	 * Whether the attribute is an alias attribute
	 */
	alias?: boolean

	/**
	 * Optional type interpretation hint
	 */
	hint?: InterpretationHint
}

/**
 * A builder for constructing MemoryLayout instances
 */
export interface LayoutBuilder {
	/**
	 * Adds space in the layout for a uint8 attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addUint8(name: string, options?: AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a uint8[2] attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addUint8Vec2(name: string, options?: Vec2AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a uint8[3] attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addUint8Vec3(name: string, options?: Vec3AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a uint8[4] attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addUint8Vec4(name: string, options?: Vec4AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a float32 attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addFloat32(name: string, options?: AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a float32[2] attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addFloat32Vec2(name: string, options?: Vec2AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a float32[3] attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addFloat32Vec3(name: string, options?: Vec3AttributeOptions): LayoutBuilder

	/**
	 * Adds space in the layout for a uint32 attribute
	 * @param name The name of the attribute
	 * @param options The options for the attribute
	 */
	addUint32(name: string, options?: AttributeOptions): LayoutBuilder

	/**
	 * Builds the final MemoryLayout
	 */
	build(): MemoryLayout
}

/**
 * A set of options used for constructing the MemoryLayout for a single attribute
 */
export interface AttributeOptions {
	/**
	 * The set of aliases for the attribute
	 */
	aliases?: AttributeAlias[]

	/**
	 * The hint used for interpreting the attribute's value
	 */
	hint?: InterpretationHint
}

/**
 * Indicates how a value should be interpreted
 */
export enum InterpretationHint {
	/**
	 * Interpret a uint8 value as a boolean
	 */
	Boolean,
}

/**
 * An alias for an attribute
 */
export interface AttributeAlias {
	/**
	 * The alias name
	 */
	name: string

	/**
	 * The number of elements for this alias
	 */
	size?: number

	/**
	 * The type of attribute
	 */
	type: AttributeType

	/**
	 * The hint used for intepreting the alias' value
	 */
	hint?: InterpretationHint
}

/**
 * The set of attribute options for a vec2 attribute
 */
export interface Vec2AttributeOptions extends AttributeOptions {
	/**
	 * The individual component names, i.e. x, y
	 */
	components?: [string, string]
}

/**
 * The set of attribute options for a vec3 attribute
 */
export interface Vec3AttributeOptions extends AttributeOptions {
	/**
	 * The individual component names, i.e. x, y, z
	 */
	components?: [string, string, string]
}

/**
 * The set of attribute options for a vec4 attribute
 */
export interface Vec4AttributeOptions extends AttributeOptions {
	/**
	 * The individual component names, i.e. x, y, z, w
	 */
	components?: [string, string, string, string]
}

/**
 * Represents the layout for a single item's attributes in memory
 */
export type MemoryLayout = Map<AttributeName, AttributeSpecification> & {
	stride: number
}

/**
 * The name of an attribute
 */
export type AttributeName = string
