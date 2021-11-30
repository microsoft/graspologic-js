/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2Configuration } from '../../types';
import { Node } from '@graspologic/graph';
/**
 * @internal
 *
 * Computes the repulsion between the two given nodes
 * @param n1 The first node
 * @param n2 The second node
 * @returns The amount of repulsion
 */
export declare function computeNodeRepulsion(n1: Node, n2: Node, config: FA2Configuration): number;
