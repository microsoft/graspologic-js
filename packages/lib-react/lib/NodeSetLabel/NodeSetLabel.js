import { memo, useContext } from 'react';
import { GraphRendererContext } from '../GraphView';
import { useVertexSelectionSynchronization } from './hooks/useVertexSelectionSynchronization';
import { useVertexSetHighlightRenderable } from './hooks/useVertexSetLabelRenderable';
/**
 * Adds functionality to the GraphView component which adds labels for a set of verticies
 */
export const NodeSetLabel = memo(({ vertexIds }) => {
    const renderer = useContext(GraphRendererContext);
    const renderable = useVertexSetHighlightRenderable(renderer);
    useVertexSelectionSynchronization(renderer, renderable, vertexIds);
    return null;
});
NodeSetLabel.displayName = 'NodeSetLabel';
