/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputEdge } from '../../../graph';
import { ClassType } from '../../types';
import { Edge } from '../types';
import { MemoryReader } from '@graspologic/memstore';
/**
 * An implementation of an Edge
 */
declare const BaseEdgeImpl: ClassType<MemoryReader & Edge>;
export declare class EdgeImpl extends BaseEdgeImpl {
    /**
     * @inheritDoc
     * @see {@link Edge.load}
     */
    load(data: InputEdge, nodeIndexMap: Map<string, number>, defaultEdgeWeight?: number): void;
}
export {};
