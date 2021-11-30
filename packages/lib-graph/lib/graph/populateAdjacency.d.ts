/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeStore, EdgeStore } from '../primitives';
import { AdjacencyMap } from './types';
/**
 * @internal
 * Populates an adjacency map
 * @param nodes the nodes data
 * @param edges the edges data
 * @returns An adjacency map
 */
export declare function populateAdjacency(nodes: NodeStore, edges: EdgeStore): AdjacencyMap;
