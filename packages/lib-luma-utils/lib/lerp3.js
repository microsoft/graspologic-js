/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, clamp } from 'math.gl';
/**
 * Linear interpolates between two Vector3 objects
 * @param start The start value
 * @param end The end value
 * @param interpolation The interpolation value 0 - 1
 */
export function lerp3(start, end, interpolation) {
    return new Vector3().lerp(start, end, clamp(interpolation, 0, 1));
}
