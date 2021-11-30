/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
/**
 * Updates the background color of __renderer__ to __backgroundColor__
 * @param renderer The renderer
 * @param backgroundColor The new background color
 */
export function useGraphRendererBackgroundColor(renderer, backgroundColor) {
    useEffect(() => {
        if (renderer && !renderer.destroyed) {
            renderer.config.backgroundColor = backgroundColor;
        }
    }, [backgroundColor, renderer]);
}
