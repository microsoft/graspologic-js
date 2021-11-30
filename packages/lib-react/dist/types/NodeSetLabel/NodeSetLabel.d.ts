/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * Properties for the NodeSetHighlight component
 */
export interface NodeSetLabelProps {
    /**
     * The set of verticies to label
     */
    vertexIds: string[];
}
/**
 * Adds functionality to the GraphView component which adds labels for a set of verticies
 */
export declare const NodeSetLabel: React.FC<NodeSetLabelProps>;
