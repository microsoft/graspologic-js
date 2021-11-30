/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext, useEffect, useMemo } from 'react';
import { GraphRendererContext } from '../../GraphView/context';
import { VertexLabelRenderable } from '@graspologic/renderables-support';
/**
 * Adds a renderable to GraphView which will show a label on nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
export function useHoveredVertexRenderable(onHover) {
    const renderer = useContext(GraphRendererContext);
    const renderable = useMemo(() => renderer?.gl && new VertexLabelRenderable(renderer.gl), [renderer]);
    useEffect(() => {
        if (renderer && renderable) {
            renderer.scene.addRenderable(renderable);
            return renderer.on('vertexHovered', hovered => {
                renderable.setData(hovered);
                if (onHover) {
                    onHover(hovered?.id);
                }
            });
        }
    }, [onHover, renderable, renderer]);
    return renderable;
}
