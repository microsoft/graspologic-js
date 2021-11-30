import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react';
/**
 * Updates __renderable__ with the set of nodes which match the __vertexIds__ ids, when __vertexIds__ changes
 * @param renderer The renderer
 * @param renderable The renderable to syncronize
 * @param vertexIds The set of vertex ids
 */

export function useVertexSelectionSynchronization(renderer, renderable, vertexIds) {
  useEffect(function () {
    if (renderer && renderable) {
      renderer.awaitKickoff().then(function () {
        var vertices = Array.from(renderer.scene.primitives(new Set(vertexIds)));
        renderable.setData(vertices);
      });
    }
  }, [renderer, renderable, vertexIds]);
}