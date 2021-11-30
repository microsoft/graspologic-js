/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3 } from 'math.gl';
import { Bounds } from '@graspologic/common';
/**
 * Computes the position in world space where the camera should be placed to fit the given bounds into view
 * @param bounds The bounds in world space to view
 * @param fov The field of view of the camera
 * @param aspect The aspect ratio of the view
 */
export declare function computeCameraPosition(bounds: Bounds, fov: number, aspect: number): Vector3;
