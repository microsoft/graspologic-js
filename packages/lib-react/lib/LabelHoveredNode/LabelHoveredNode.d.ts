/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * Properties for the LabelHoveredNode component
 */
export interface LabelHoveredNodeProps {
    /**
     * Handler for when a node is hovered over
     */
    onHover?: (id: string | undefined) => void;
}
/**
 * Adds functionality to the GraphView component which adds labels to hovered nodes
 */
export declare const LabelHoveredNode: React.FC<LabelHoveredNodeProps>;
