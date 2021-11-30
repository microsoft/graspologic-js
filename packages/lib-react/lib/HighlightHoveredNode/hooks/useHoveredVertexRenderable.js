/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext, useEffect, useMemo } from 'react';
import { GraphRendererContext } from '../../GraphView/context';
import { VertexSetRenderable } from '@graspologic/renderables-support';
/**
 * Adds a renderable to GraphView which will highlight nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
export function useHoveredVertexRenderable(onHover) {
    const renderer = useContext(GraphRendererContext);
    const renderable = useMemo(() => renderer?.gl && new VertexSetRenderable(renderer.gl), [renderer]);
    useEffect(() => {
        if (renderer && renderable) {
            renderer.config.onHoverHighlightColorChanged(value => (renderable.color = value));
            renderer.scene.addRenderable(renderable);
            return renderer.on('vertexHovered', hovered => {
                renderable.setData(hovered ? [hovered] : []);
                if (onHover) {
                    onHover(hovered?.id);
                }
            });
        }
    }, [onHover, renderable, renderer]);
    return renderable;
}
