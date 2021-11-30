/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext, useEffect, useMemo } from 'react';
import { GraphRendererContext } from '../../GraphView/context';
import { VertexLabelRenderable } from '@graspologic/renderables-support';
/**
 * Adds a renderable to GraphView which will show a label on nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */

export function useHoveredVertexRenderable(onHover) {
  var renderer = useContext(GraphRendererContext);
  var renderable = useMemo(function () {
    return (renderer === null || renderer === void 0 ? void 0 : renderer.gl) && new VertexLabelRenderable(renderer.gl);
  }, [renderer]);
  useEffect(function () {
    if (renderer && renderable) {
      renderer.scene.addRenderable(renderable);
      return renderer.on('vertexHovered', function (hovered) {
        renderable.setData(hovered);

        if (onHover) {
          onHover(hovered === null || hovered === void 0 ? void 0 : hovered.id);
        }
      });
    }
  }, [onHover, renderable, renderer]);
  return renderable;
}