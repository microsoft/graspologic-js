/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeType } from './types.js'

/**
 * @internal
 *
 * A mapping from AttributeType to the number of bytes required to store it
 */
export const DATA_TYPE_TO_BYTES: Record<AttributeType, number> = {
	[AttributeType.Float32]: 4,
	[AttributeType.Uint32]: 4,
	[AttributeType.Uint8]: 1,
}

/**
 * @internal
 *
 * Gets the size in bytes for the given data type
 * @param type The data type to inspect
 */
export function getAttributeTypeByteSize(type: AttributeType) {
	return DATA_TYPE_TO_BYTES[type]
}
