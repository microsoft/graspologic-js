/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { ColorVector } from '@graspologic/renderer';
/**
 * Properties for the HighlightHoveredNode component
 */
export interface HighlightHoveredNodeProps {
    /**
     * The color of the highlight
     */
    color?: ColorVector;
    /**
     * Handler for when a node is hovered over
     */
    onHover?: (id: string | undefined) => void;
}
/**
 * Adds functionality to the GraphView component which highlights hovered nodes
 */
export declare const HighlightHoveredNode: React.FC<HighlightHoveredNodeProps>;
