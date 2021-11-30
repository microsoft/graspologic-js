import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { DEFAULT_HIDE_EDGES_ON_MOVE, DEFAULT_DRAW_EDGES, DEFAULT_EDGE_CONSTANT_WIDTH, DEFAULT_EDGE_DEPTH_WRITE, DEFAULT_EDGE_ANTIALIAS, DEFAULT_EDGE_ALPHA, DEFAULT_EDGE_MIN_WIDTH, DEFAULT_EDGE_MAX_WIDTH, DEFAULT_EDGE_FILTERED_OUT_SATURATION, DEFAULT_EDGE_FILTERED_IN_SATURATION, } from '@graspologic/renderer';
/**
 * Configures the edge rendering for a GraphView
 */
export const Edges = memo(({ hideOnMove = DEFAULT_HIDE_EDGES_ON_MOVE, shown = DEFAULT_DRAW_EDGES, constantWidth = DEFAULT_EDGE_CONSTANT_WIDTH, depthWrite = DEFAULT_EDGE_DEPTH_WRITE, antialias = DEFAULT_EDGE_ANTIALIAS, alpha = DEFAULT_EDGE_ALPHA, minWidth = DEFAULT_EDGE_MIN_WIDTH, maxWidth = DEFAULT_EDGE_MAX_WIDTH, filteredOutSaturation = DEFAULT_EDGE_FILTERED_OUT_SATURATION, filteredInSaturation = DEFAULT_EDGE_FILTERED_IN_SATURATION, }) => {
    const renderer = useContext(GraphRendererContext);
    useEffect(() => {
        if (renderer) {
            renderer.config.drawEdges = shown;
        }
    }, [renderer, shown]);
    useEffect(() => {
        if (renderer) {
            renderer.config.hideEdgesOnMove = hideOnMove;
        }
    }, [renderer, hideOnMove]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeConstantWidth = constantWidth;
        }
    }, [renderer, constantWidth]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeDepthWrite = depthWrite;
        }
    }, [renderer, depthWrite]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeAntialias = antialias;
        }
    }, [renderer, antialias]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeMinWidth = minWidth;
        }
    }, [renderer, minWidth]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeMaxWidth = maxWidth;
        }
    }, [renderer, maxWidth]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeAlpha = alpha;
        }
    }, [renderer, alpha]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeFilteredInSaturation = filteredInSaturation;
        }
    }, [renderer, filteredInSaturation]);
    useEffect(() => {
        if (renderer) {
            renderer.config.edgeFilteredOutSaturation = filteredOutSaturation;
        }
    }, [renderer, filteredOutSaturation]);
    return null;
});
Edges.displayName = 'Edges';
