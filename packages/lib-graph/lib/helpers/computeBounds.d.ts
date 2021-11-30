/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '../graph';
import { Bounds3D, Maybe } from '@graspologic/common';
/**
 * Computes the bounds of the given graph
 * @param graph The graph to compute the bounds from
 */
export declare function computeBounds(graph: GraphContainer): Maybe<Bounds3D>;
