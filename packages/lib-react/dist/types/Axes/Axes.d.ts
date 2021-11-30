/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * The properties for the Axes component
 */
export interface AxesProps {
    /**
     * A flag indicating whether to show the axes. default=true
     */
    shown?: boolean;
    /**
     * A flag indicating whether to draw the axes in the corner. default=true
     */
    inCorner?: boolean;
}
/**
 * Display's a set of Axes on the graph renderer
 */
export declare const Axes: React.FC<AxesProps>;
