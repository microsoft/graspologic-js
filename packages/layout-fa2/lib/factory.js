/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FA2LayoutExecutor } from './FA2LayoutExecutor';
import { DEFAULT_CONFIGURATION } from './types';
import { CountdownClock } from '@graspologic/layout-core';
/**
 * @internal
 *
 * Creates a new instance of the ForceAtlas2 layout executor
 * @param graph The graph to layout
 * @param configuration The FA2 configuration
 * @param globalObject The global object
 */
export function createInstance(graph, configuration = {}, globalObject = window) {
    const finalConfig = {
        ...DEFAULT_CONFIGURATION,
        ...configuration,
    };
    return new FA2LayoutExecutor(graph, finalConfig, new CountdownClock(configuration.targetIterations || 100), globalObject);
}
