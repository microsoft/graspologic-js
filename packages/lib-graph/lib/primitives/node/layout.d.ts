/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { PropertySpecification } from '@graspologic/memstore';
/**
 * The unique symbol for a node
 */
export declare const nodeType: unique symbol;
/**
 * @internal
 *
 * The set of additional node properties
 */
export declare const ADDITIONAL_NODE_PROPS: PropertySpecification[];
/**
 * @internal
 *
 * The internal memory layout of a Node
 */
export declare const nodeMemoryLayout: any;
/**
 * Gets the typed offset for the given attribute
 */
export declare function nodeTypedOffset(attribute: string): number | undefined;
