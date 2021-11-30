import { memo, useEffect } from 'react';
import { useHoveredVertexRenderable } from './hooks/useHoveredVertexRenderable';
import { DEFAULT_HOVER_HIGHLIGHT_COLOR, } from '@graspologic/renderer';
/**
 * Adds functionality to the GraphView component which highlights hovered nodes
 */
export const HighlightHoveredNode = memo(({ color = DEFAULT_HOVER_HIGHLIGHT_COLOR, onHover }) => {
    const renderable = useHoveredVertexRenderable(onHover);
    useEffect(() => {
        if (renderable) {
            renderable.color = color;
        }
    }, [color, renderable]);
    return null;
});
HighlightHoveredNode.displayName = 'HighlightHoveredNode';
