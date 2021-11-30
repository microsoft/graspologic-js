/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DataStore } from '../../types';
import { GraphContainer } from '@graspologic/graph';
/**
 * Constructs a generic data store with node and edge stores
 * @param nodeCountHint The number of nodes
 * @param edgeCountHint The number of edges
 * @param animation If the stores should emit update animation
 * @returns A datastore containing node and edge stores
 */
export declare function createDataStore(nodeCountHint: number | undefined, edgeCountHint: number | undefined, animation?: boolean): DataStore;
/**
 * Constructs a generic data store with node and edge stores
 * @param container The graph container to use
 * @returns A datastore containing node and edge stores
 */
export declare function createDataStoreFromContainer(container: GraphContainer): DataStore;
