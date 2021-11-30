/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration, ForceMetrics } from '../types';
import { NodeStore, EdgeStore } from '@graspologic/graph';
/**
 * @internal
 *
 * Runs a single iteration of the FA2 algorithm
 * @param nodes The node data
 * @param edges The edge data
 * @param config The layout configuration
 *
 * @returns The applied forces
 */
export declare function iterate(nodes: NodeStore, edges: EdgeStore, config: FA2Configuration): ForceMetrics;
