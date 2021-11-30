/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { memo, forwardRef, useCallback, useMemo } from 'react';
import { SizedToParent } from '../SizedToParent';
import { GraphRendererContext } from './context';
import { use3DMode } from './hooks/use3DMode';
import { useBindCallbacks } from './hooks/useBindCallbacks';
import { useGraphColorizer } from './hooks/useGraphColorizer';
import { useGraphContainer } from './hooks/useGraphContainer';
import { useGraphHideDeselected } from './hooks/useGraphHideDeselected';
import { useGraphImperativeApi } from './hooks/useGraphImperativeApi';
import { useGraphInterpolationTime } from './hooks/useGraphInterpolationTime';
import { useGraphRenderKickoff } from './hooks/useGraphRenderKickoff';
import { useGraphRenderer } from './hooks/useGraphRenderer';
import { useGraphRendererBackgroundColor } from './hooks/useGraphRendererBackgroundColor';
import { DEFAULT_BG_COLOR, DEFAULT_HIDE_DESELECTED, DEFAULT_IS_3D, DEFAULT_INTERPOLATION_TIME, DEFAULT_DRAW_EDGES, } from '@graspologic/renderer';
const DEFAULT_STYLE = {
    width: 500,
    height: 500,
    position: 'relative',
};
const GraphViewRaw = forwardRef(({ style, className, children, data, colorizer, backgroundColor = DEFAULT_BG_COLOR, hideDeselected = DEFAULT_HIDE_DESELECTED, is3D = DEFAULT_IS_3D, interpolationTime = DEFAULT_INTERPOLATION_TIME, nodeCountHint, edgeCountHint, drawEdges = DEFAULT_DRAW_EDGES, dataBounds, onInitialize, onDataLoad, onResize, onNodeClick, onNodeHover, }, ref) => {
    const graphContainer = useGraphContainer(data);
    const [renderRef, renderer] = useGraphRenderer(nodeCountHint, edgeCountHint, drawEdges, graphContainer, dataBounds);
    useBindCallbacks({
        renderer,
        callbacks: {
            onInitialize,
            onLoad: onDataLoad,
            onResize,
            onNodeClick,
            onNodeHover,
        },
    });
    useGraphRendererBackgroundColor(renderer, backgroundColor);
    useGraphHideDeselected(renderer, hideDeselected);
    useGraphInterpolationTime(renderer, interpolationTime);
    useGraphImperativeApi(renderer, ref);
    use3DMode(renderer, is3D);
    useGraphRenderKickoff(renderer);
    useGraphColorizer(renderer, colorizer);
    const finalStyle = useMemo(() => ({
        ...DEFAULT_STYLE,
        ...(style || {}),
    }), [style]);
    const handleResize = useCallback(({ width, height }) => {
        if (renderer) {
            renderer.resize(width, height);
        }
    }, [renderer]);
    return (React.createElement("div", { className: className, style: finalStyle },
        React.createElement(SizedToParent, { sizedRef: renderRef, onResize: handleResize },
            React.createElement(GraphRendererContext.Provider, { value: renderer }, children))));
});
GraphViewRaw.displayName = 'GraphView';
/**
 * The GraphView component. This is the entry point for rendering graph data.
 */
export const GraphView = memo(GraphViewRaw);
