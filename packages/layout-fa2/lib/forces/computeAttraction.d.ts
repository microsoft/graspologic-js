/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../types';
import { NodeStore, EdgeStore } from '@graspologic/graph';
/**
 * @internal
 *
 * Computes the attraction component of the FA2 algorithm
 * @param nodes The set of node data
 * @param edges The set of edge data
 * @param config The layout configuration
 * @returns The total scaled distance in the graph
 */
export declare function computeAttraction(nodes: NodeStore, edges: EdgeStore, config: FA2Configuration): number;
