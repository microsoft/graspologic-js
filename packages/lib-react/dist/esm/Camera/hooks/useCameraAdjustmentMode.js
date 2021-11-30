/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
import { CameraAdjustmentMode } from '@graspologic/renderer';
/**
 * Updates __renderer__ to use __mode__ as it's CameraAdjustmentMode
 * @param renderer The renderer
 * @param mode The camera mode
 */

export function useCameraAdjustmentMode(renderer) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CameraAdjustmentMode.None;
  useEffect(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.cameraAdjustmentMode = mode;
    }
  }, [mode, renderer]);
}