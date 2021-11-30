/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { GraphContainer } from '@graspologic/graph';
import { GraphRenderer, Maybe, Bounds } from '@graspologic/renderer';
/**
 * Creates a new GraphRenderer instance
 * @param nodeCountHint The number of nodes in the graph
 * @param edgeCountHint The number of edges in the graph
 * @param container The graph container to use
 * @param drawEdges If true, edges will be drawn
 */
export declare function useGraphRenderer(nodeCountHint?: number, edgeCountHint?: number, drawEdges?: boolean, container?: GraphContainer, dataBounds?: Maybe<Bounds>): [React.RefObject<HTMLDivElement>, GraphRenderer | undefined];
