/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../../types';
import { NodeStore } from '@graspologic/graph';
/**
 * @internal
 *
 * O(n^2) repulsion - check force against all nodes
 * @params The node data
 * @params The layout configuration
 * @returns The computed repulsion
 */
export declare function computeRepulsionUnoptimized(nodes: NodeStore, config: FA2Configuration): number;
