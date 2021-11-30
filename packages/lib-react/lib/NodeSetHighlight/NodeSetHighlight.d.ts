/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { ColorVector } from '@graspologic/renderer';
/**
 * Properties for the NodeSetHighlight component
 */
export interface NodeSetHighlightProps {
    /**
     * The set of verticies to highlight
     */
    vertexIds: string[];
    /**
     * The color to highlight them
     */
    color?: ColorVector;
}
/**
 * Adds functionality to the GraphView component which colors a set of verticies a given color
 */
export declare const NodeSetHighlight: React.FC<NodeSetHighlightProps>;
