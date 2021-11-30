import { memo, useContext } from 'react';
import { GraphRendererContext } from '../GraphView/context';
import { useVertexClickEvents } from './hooks/useVertexClickEvents';
import { useVertexClickHandler } from './hooks/useVertexClickHandler';
/**
 * Adds node click functionality to the GraphView component
 */
export const HandleNodeClicks = memo(({ onClick }) => {
    const renderer = useContext(GraphRendererContext);
    useVertexClickEvents(renderer);
    useVertexClickHandler(renderer, onClick);
    return null;
});
HandleNodeClicks.displayName = 'HandleNodeClicks';
