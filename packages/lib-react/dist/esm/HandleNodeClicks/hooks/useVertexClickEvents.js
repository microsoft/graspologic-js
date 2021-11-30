/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
import { enableClickEvents } from '@graspologic/renderer';
/**
 * Enables vertex click events on __renderer__
 * @param renderer The renderer
 */

export function useVertexClickEvents(renderer) {
  useEffect(function () {
    var disconnect;

    if (renderer) {
      renderer.onInitialize(function () {
        disconnect = enableClickEvents(renderer);
      });
    }

    return function () {
      return disconnect && disconnect();
    };
  }, [renderer]);
}