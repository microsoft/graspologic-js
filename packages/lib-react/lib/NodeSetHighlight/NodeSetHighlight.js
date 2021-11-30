import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { useVertexSelectionSynchronization } from './hooks/useVertexSelectionSynchronization';
import { useVertexSetHighlightRenderable } from './hooks/useVertexSetHighlightRenderable';
import { DEFAULT_HOVER_HIGHLIGHT_COLOR, } from '@graspologic/renderer';
/**
 * Adds functionality to the GraphView component which colors a set of verticies a given color
 */
export const NodeSetHighlight = memo(({ vertexIds, color = DEFAULT_HOVER_HIGHLIGHT_COLOR }) => {
    const renderer = useContext(GraphRendererContext);
    const renderable = useVertexSetHighlightRenderable(renderer);
    useVertexSelectionSynchronization(renderer, renderable, vertexIds);
    useEffect(() => {
        if (renderable && color != null) {
            renderable.color = color;
        }
    }, [renderable, color]);
    return null;
});
NodeSetHighlight.displayName = 'NodeSetHighlight';
