/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { VertexClickHandler } from './types';
/**
 * Properties for the HandleNodeClicks Component
 */
export interface HandleNodeClicksProps {
    /**
     * An handler function for when a vertex is clicked
     */
    onClick: VertexClickHandler;
}
/**
 * Adds node click functionality to the GraphView component
 */
export declare const HandleNodeClicks: React.FC<HandleNodeClicksProps>;
