/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeColorizer } from '../types';
import { GraphContainer } from '@graspologic/graph';
/**
 * @internal
 *
 * Processes the graph contained in __data__ by normalizing weights, and assigning colors using __colorizerFn__
 * @param data The graph data
 * @param colorizerFn The colorizer
 */
export declare function processGraph(data: GraphContainer, colorizerFn?: NodeColorizer): void;
