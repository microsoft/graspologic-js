import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { DEFAULT_NODE_MIN_RADIUS, DEFAULT_NODE_MAX_RADIUS, DEFAULT_NODE_OUTLINE, DEFAULT_HIDE_NODES_ON_MOVE, DEFAULT_DRAW_NODES, DEFAULT_NODE_FILTERED_OUT_SATURATION, DEFAULT_NODE_FILTERED_IN_SATURATION, } from '@graspologic/renderer';
/**
 * Configures the node rendering for the GraphView component
 */
export const Nodes = memo(({ minRadius = DEFAULT_NODE_MIN_RADIUS, maxRadius = DEFAULT_NODE_MAX_RADIUS, outline = DEFAULT_NODE_OUTLINE, hideOnMove = DEFAULT_HIDE_NODES_ON_MOVE, shown = DEFAULT_DRAW_NODES, filteredIds, filteredOutSaturation = DEFAULT_NODE_FILTERED_OUT_SATURATION, filteredInSaturation = DEFAULT_NODE_FILTERED_IN_SATURATION, }) => {
    const renderer = useContext(GraphRendererContext);
    useEffect(() => {
        if (renderer && minRadius != null) {
            renderer.config.nodeMinRadius = minRadius;
        }
    }, [renderer, minRadius]);
    useEffect(() => {
        if (renderer && maxRadius != null) {
            renderer.config.nodeMaxRadius = maxRadius;
        }
    }, [renderer, maxRadius]);
    useEffect(() => {
        if (renderer) {
            renderer.config.nodeOutline = outline;
        }
    }, [renderer, outline]);
    useEffect(() => {
        if (renderer) {
            renderer.config.hideNodesOnMove = hideOnMove;
        }
    }, [renderer, hideOnMove]);
    useEffect(() => {
        if (renderer) {
            renderer.config.drawNodes = shown;
        }
    }, [renderer, shown]);
    useEffect(() => {
        if (renderer) {
            renderer.config.nodeFilteredIds = filteredIds;
        }
    }, [renderer, filteredIds]);
    useEffect(() => {
        if (renderer) {
            renderer.config.nodeFilteredInSaturation = filteredInSaturation;
        }
    }, [renderer, filteredInSaturation]);
    useEffect(() => {
        if (renderer) {
            renderer.config.nodeFilteredOutSaturation = filteredOutSaturation;
        }
    }, [renderer, filteredOutSaturation]);
    return null;
});
Nodes.displayName = 'Nodes';
