/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AttributeType } from './types';
/**
 * @internal
 *
 * A mapping from AttributeType to the number of bytes required to store it
 */
export declare const DATA_TYPE_TO_BYTES: Record<AttributeType, number>;
/**
 * @internal
 *
 * Gets the size in bytes for the given data type
 * @param type The data type to inspect
 */
export declare function getAttributeTypeByteSize(type: AttributeType): number;
