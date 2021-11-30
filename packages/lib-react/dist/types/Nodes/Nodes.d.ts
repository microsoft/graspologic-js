/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * The set of properties for the Nodes component
 */
export interface NodesProps {
    /**
     * The minimum radius of nodes, based on nodes _weight_ property
     * @defaultValue [[DEFAULT_NODE_MIN_RADIUS]]
     */
    minRadius?: number;
    /**
     * The minimum radius of nodes, based on nodes _weight_ property
     * @defaultValue [[DEFAULT_NODE_MAX_RADIUS]]
     */
    maxRadius?: number;
    /**
     * If true, nodes will be drawn with an outline
     * @defaultValue [[DEFAULT_NODE_OUTLINE]]
     */
    outline?: boolean;
    /**
     * If true, nodes will be hidden when the user is panning/zooming
     * @defaultValue [[DEFAULT_HIDE_NODES_ON_MOVE]]
     */
    hideOnMove?: boolean;
    /**
     * If true, nodes will be rendered
     * @defaultValue [[DEFAULT_DRAW_NODES]]
     */
    shown?: boolean;
    /**
     * The set of _filtered_ node ids
     */
    filteredIds?: string[];
    /**
     * The saturation of nodes which are _not in_ the filtered set
     * @defaultValue [[DEFAULT_NODE_FILTERED_OUT_SATURATION]]
     */
    filteredOutSaturation?: number;
    /**
     * The saturation of nodes which are _in_ the filtered set
     * @defaultValue [[DEFAULT_NODE_FILTERED_IN_SATURATION]]
     */
    filteredInSaturation?: number;
}
/**
 * Configures the node rendering for the GraphView component
 */
export declare const Nodes: React.FC<NodesProps>;
