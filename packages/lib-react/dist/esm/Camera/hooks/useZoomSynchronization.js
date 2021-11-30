/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
/**
 * Adjusts the zoom on __renderer__ when __zoom__ changes
 * @param renderer The renderer
 * @param zoom The zoom level
 */

export function useZoomSynchronization(renderer, zoom) {
  useEffect(function () {
    if (renderer && !renderer.destroyed && zoom != null) {
      renderer.camera.moveTo(0, 0, zoom);
      renderer.makeDirty();
    }
  }, [renderer, zoom]);
}