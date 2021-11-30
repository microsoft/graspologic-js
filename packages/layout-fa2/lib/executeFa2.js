/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createInstance } from './factory';
/**
 * @internal
 *
 * Executes the FA2 algorithm
 * @param graph The graph to layout
 * @param configuration The configuration for the layout
 * @param onTick The callback for when an iteration of the layout was performed
 * @returns A promise that resolves when the layout is completed
 */
export function executeFa2(graph, configuration = {}, onTick = () => null) {
    const executor = createInstance(graph, configuration, window);
    const subscription = executor.on('tick', onTick);
    // Execute the Layout
    return executor.execute().then(() => subscription());
}
