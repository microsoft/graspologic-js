/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo, useEffect } from 'react';
import { VertexSetRenderable } from '@graspologic/renderables-support';
/**
 * Creates a VertexSetRenderable
 * @param renderer The renderer
 */

export function useVertexSetHighlightRenderable(renderer) {
  var renderable = useMemo(function () {
    return renderer && renderer.gl && new VertexSetRenderable(renderer.gl);
  }, [renderer]);
  useEffect(function () {
    if (renderer && renderable) {
      renderer.scene.addRenderable(renderable);
    }
  }, [renderer, renderable]);
  return renderable;
}