/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
import { enableClickEvents, } from '@graspologic/renderer';
/**
 * Enables vertex click events on __renderer__
 * @param renderer The renderer
 */
export function useVertexClickEvents(renderer) {
    useEffect(() => {
        let disconnect;
        if (renderer) {
            renderer.onInitialize(() => {
                disconnect = enableClickEvents(renderer);
            });
        }
        return () => disconnect && disconnect();
    }, [renderer]);
}
