/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useMemo } from 'react';
import { AxesRenderable } from '@graspologic/renderables-support';
/**
 * Adds an AxesRenderable to __renderer__ which will display a set of Axes on the renderer.
 * @param renderer The graph renderer
 */
export function useAxesRenderable(renderer) {
    const renderable = useMemo(() => renderer &&
        renderer.gl &&
        new AxesRenderable(renderer.gl, renderer.config), [renderer]);
    useEffect(() => {
        if (renderer && renderable) {
            renderer.scene.addRenderable(renderable, true);
        }
    }, [renderer, renderable]);
    return renderable;
}
