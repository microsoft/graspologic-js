/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Quaternion } from 'math.gl';
import { useEffect } from 'react';
/**
 * Enables/disables 3d on __renderer__ based on __is3D__
 * @param renderer The renderer
 * @param is3D If true, the renderer will go into 3d mode
 */
export function use3DMode(renderer, is3D) {
    useEffect(() => {
        if (renderer && !renderer.destroyed) {
            renderer.config.is3D = is3D;
            // reset the Rotation when going back to 2d mode
            if (!is3D) {
                renderer.camera.rotation = new Quaternion();
            }
        }
    }, [renderer, is3D]);
}
