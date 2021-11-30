/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
/**
 * Loads the __renderer__ with __data__ when __data__ changes, and colorizes when __colorizer__ changes
 * @param renderer The renderer
 * @param data The graph data
 * @param colorizer The colorizer to colorize the graph
 */
export function useGraphRenderKickoff(renderer) {
    useEffect(() => {
        if (renderer && !renderer.destroyed) {
            renderer.start();
        }
    }, [renderer]);
}
