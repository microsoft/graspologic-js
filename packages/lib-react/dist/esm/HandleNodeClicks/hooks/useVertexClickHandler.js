/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
/**
 * Subscribes to vertex click events on __renderer__
 * @param renderer The renderer
 * @param onVertexClick The vertex click handler
 */

export function useVertexClickHandler(renderer, onVertexClick) {
  useEffect(function () {
    if (renderer) {
      return renderer.on('vertexClick', function (vertex) {
        return onVertexClick(vertex && vertex.id);
      });
    }
  }, [renderer, onVertexClick]);
}