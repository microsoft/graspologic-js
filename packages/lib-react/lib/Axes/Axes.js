import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView/context';
import { useAxesRenderable } from './hooks/useAxesRenderable';
import { DEFAULT_DRAW_AXES, DEFAULT_CORNER_AXES } from '@graspologic/renderer';
/**
 * Display's a set of Axes on the graph renderer
 */
export const Axes = memo(({ shown = DEFAULT_DRAW_AXES, inCorner = DEFAULT_CORNER_AXES }) => {
    const renderer = useContext(GraphRendererContext);
    useAxesRenderable(renderer);
    useEffect(() => {
        if (renderer) {
            renderer.config.cornerAxes = inCorner;
        }
    }, [renderer, inCorner]);
    useEffect(() => {
        if (renderer) {
            renderer.config.drawAxes = shown;
        }
    }, [renderer, shown]);
    return null;
});
Axes.displayName = 'Axes';
