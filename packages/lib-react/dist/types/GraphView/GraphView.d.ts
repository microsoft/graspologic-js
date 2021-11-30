/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { InputGraph, GraphContainer, Node } from '@graspologic/graph';
import { NodeColorizer, ColorVector, GraphRenderer, Maybe, Bounds } from '@graspologic/renderer';
/**
 * Graph view properties
 */
export interface GraphViewProps {
    /**
     * The CSS class name to inject into the containing div. The div will contain the canvas
     * where the graph will render into.
     */
    className?: string;
    /**
     * A CSS property object to be injected into the container div containing the graph rendering.
     */
    style?: React.CSSProperties;
    /**
     * The background color to use in the graph view
     */
    backgroundColor?: ColorVector;
    /**
     * A colorization function to use for vertex coloring. `vertex.group` is applied against the
     * colorization function to generate a categorical color.
     */
    colorizer?: NodeColorizer;
    /**
     * The graph dataset
     */
    data: InputGraph | GraphContainer;
    /**
     * The databounds for the graph
     */
    dataBounds?: Maybe<Bounds>;
    /**
     * If true, non-selected vertices will be hidden
     * @defaultValue [[DEFAULT_HIDE_DESELECTED]]
     */
    hideDeselected?: boolean;
    /**
     * A flag indicating whether to render in 3D mode.
     * @defaultValue [[DEFAULT_IS_3D]]
     */
    is3D?: boolean;
    /**
     * Interpolation time for animations (default=1000)
     * @defaultValue [[DEFAULT_INTERPOLATION_TIME]]
     */
    interpolationTime?: number;
    /**
     * A hint indicating the number of nodes that are expected
     * @defaultValue 10000
     */
    nodeCountHint?: number;
    /**
     * A hint indicating the number of edges that are expected
     * @defaultValue 10000
     */
    edgeCountHint?: number;
    /**
     * A boolean indicating whether or not to draw the edges
     * @defaultValue [[DEFAULT_DRAW_EDGES]]
     */
    drawEdges?: boolean;
    /**
     * A ref to the underlying GraphRenderer
     */
    ref?: React.Ref<GraphRenderer>;
    /**
     * Callback to be notified when the underlying renderer is ready.
     */
    onInitialize?: (renderer: GraphRenderer) => void;
    /**
     * Callback to be notified when the data has finished loading in the renderer.
     */
    onDataLoad?: () => void;
    /**
     * Callback to be notified when the graph renderer has been resized.
     */
    onResize?: () => void;
    /**
     * Callback that fires when a node is clicked
     */
    onNodeClick?: (node?: Node) => void;
    /**
     * Callback that fires when a node is hovered (and again when unhovered)
     */
    onNodeHover?: (node?: Node) => void;
}
/**
 * The GraphView component. This is the entry point for rendering graph data.
 */
export declare const GraphView: React.FC<GraphViewProps>;
