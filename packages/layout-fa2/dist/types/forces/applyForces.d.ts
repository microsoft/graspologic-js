/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration, ForceMetrics } from '../types';
import { NodeStore } from '@graspologic/graph';
/**
 * @internal
 *
 * Applies the forces to the nodes to move them
 * @param nodes The node data
 * @param config The layout configuration
 * @param repulsion The repulsion amount
 * @param gravity The gravity amount
 * @param attraction
 * @returns The force metrics
 */
export declare function applyForces(nodes: NodeStore, config: FA2Configuration, repulsion: number, gravity: number, attraction: number): ForceMetrics;
