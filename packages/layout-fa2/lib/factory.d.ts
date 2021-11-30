/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2LayoutExecutor } from './FA2LayoutExecutor';
import { FA2Configuration } from './types';
import { GraphContainer } from '@graspologic/graph';
/**
 * @internal
 *
 * Creates a new instance of the ForceAtlas2 layout executor
 * @param graph The graph to layout
 * @param configuration The FA2 configuration
 * @param globalObject The global object
 */
export declare function createInstance(graph: GraphContainer, configuration?: Partial<FA2Configuration>, globalObject?: Window & typeof globalThis): FA2LayoutExecutor;
