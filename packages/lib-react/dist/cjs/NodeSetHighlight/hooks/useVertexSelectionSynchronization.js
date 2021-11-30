"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVertexSelectionSynchronization = useVertexSelectionSynchronization;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Updates __renderable__ with the set of nodes which match the __vertexIds__ ids, when __vertexIds__ changes
 * @param renderer The renderer
 * @param renderable The renderable to syncronize
 * @param vertexIds The set of vertex ids
 */
function useVertexSelectionSynchronization(renderer, renderable, vertexIds) {
  (0, _react.useEffect)(function () {
    if (renderer && renderable) {
      renderer.awaitKickoff().then(function () {
        var vertices = Array.from(renderer.scene.primitives(new Set(vertexIds)));
        renderable.setData(vertices);
      });
    }
  }, [renderer, renderable, vertexIds]);
}