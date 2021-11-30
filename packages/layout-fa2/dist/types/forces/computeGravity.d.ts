/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../types';
import { NodeStore } from '@graspologic/graph';
/**
 * @internal
 *
 * Computes the gravity component of the FA2 algorithm
 * @param nodes The set of node data
 * @param config The layout configuration
 * @returns The total gravity in the system
 */
export declare function computeGravity(nodes: NodeStore, config: FA2Configuration): number;
