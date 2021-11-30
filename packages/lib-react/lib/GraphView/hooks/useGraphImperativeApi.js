/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useImperativeHandle } from 'react';
/**
 * Assigns a GraphRenderer imperative api for __renderer__ to __ref__
 * @param renderer The graph renderer
 * @param ref The ref for a graph renderer
 */
export function useGraphImperativeApi(renderer, ref) {
    return useImperativeHandle(ref, () => (!renderer || renderer.destroyed
        ? {}
        : renderer), [renderer]);
}
