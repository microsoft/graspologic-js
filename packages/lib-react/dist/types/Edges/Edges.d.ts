/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * The set of properties for the Edges component
 */
export interface EdgesProps {
    /**
     * If true, edges will be shown
     * @defaultValue true
     */
    shown?: boolean;
    /**
     * If true, the edges will be hidden when the user is panning or zooming
     */
    hideOnMove?: boolean;
    /**
     * If true, edges will remain a constant size regardless of the zoom level
     * @defaultValue [[DEFAULT_EDGE_CONSTANT_WIDTH]]
     */
    constantWidth?: boolean;
    /**
     * If true, edges which are closer to the camera will occlude further away ones
     * @defaultValue [[DEFAULT_EDGE_DEPTH_WRITE]]
     */
    depthWrite?: boolean;
    /**
     * If true, the edges will be anti-aliased
     * @defaultValue [[DEFAULT_EDGE_ANTIALIAS]]
     */
    antialias?: boolean;
    /**
     * The minimum width of the edges
     * @defaultValue [[DEFAULT_EDGE_MIN_WIDTH]]
     */
    minWidth?: number;
    /**
     * The maximum width of the edges
     * @defaultValue [[DEFAULT_EDGE_MAX_WIDTH]]
     */
    maxWidth?: number;
    /**
     * The transparency of the edges
     * @defaultValue [[DEFAULT_EDGE_ALPHA]]
     */
    alpha?: number;
    /**
     * The saturation of edges which are _not in_ the filtered set
     * @defaultValue [[DEFAULT_EDGE_FILTERED_OUT_SATURATION]]
     */
    filteredOutSaturation?: number;
    /**
     * The saturation of edges which are _in_ the filtered set
     * @defaultValue [[DEFAULT_EDGE_FILTERED_IN_SATURATION]]
     */
    filteredInSaturation?: number;
}
/**
 * Configures the edge rendering for a GraphView
 */
export declare const Edges: React.FC<EdgesProps>;
