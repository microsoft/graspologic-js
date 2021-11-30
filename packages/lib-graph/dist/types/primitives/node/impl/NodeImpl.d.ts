/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputNode } from '../../../graph';
import { Shape } from '../../types';
import { Node } from '../types';
/**
 * An implementation of a Node
 */
declare const BaseNodeImpl: any;
export declare class NodeImpl extends BaseNodeImpl implements Node {
    /**
     * @inheritDoc
     * @see {@link Node.load}
     */
    load(data: InputNode): void;
}
/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */
export declare function parseShape(unparsedShape?: Shape | string): Shape;
export {};
