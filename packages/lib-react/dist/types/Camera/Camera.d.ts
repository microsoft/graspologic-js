/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { Bounds, CameraAdjustmentMode } from '@graspologic/renderer';
/**
 * The properties for the Camera component
 */
export interface CameraProps {
    /**
     * Optional: The declarative z value of the camera. Zoomed out = -1000, Zoomed in = 0
     * @defaultValue 0
     */
    zoom?: number;
    /**
     * Can user's adjust the camera manually
     * @defaultValue true
     */
    interactive?: boolean;
    /**
     * The bounds to view with the camera
     */
    bounds?: Bounds;
    /**
     * The length of time to take to transition to the new bounds (if the bounds property is provided)
     */
    transitionDuration?: number;
    /**
     * The adjustment mode for the camera, controls how the camera will automatically move
     * @defaultValue [[CameraAdjustmentMode.Default]]
     */
    mode?: CameraAdjustmentMode;
    /**
     * If true, double clicking on the graph will zoom the camera
     *
     * @defaultValue true
     */
    doubleClickZoom?: boolean;
}
/**
 * Adds an adjustable camera to the current GraphRenderer
 */
export declare const Camera: React.FC<CameraProps>;
