/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryLayout } from '../specification';
import { MemoryReaderClass } from './types';
/**
 * Describes a property
 */
export declare type PropertySpecification = string | {
    name: string;
    initialValue?: any;
    ephemeral?: boolean;
};
/**
 * Creates a MemoryReader implementation which can read the given memory layout efficiently
 * @param readerType The type of reader
 * @param layout The memory layout
 * @param additionalProperties The additional properties to add to the implementation
 * @param setterAugmenter The setter augmenter, which can be used to manipulate the underlying generated property setters
 */
export declare function createReader<P>(readerType: symbol, layout: MemoryLayout, additionalProperties?: PropertySpecification[]): MemoryReaderClass<P>;
