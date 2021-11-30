"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVertexClickHandler = useVertexClickHandler;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Subscribes to vertex click events on __renderer__
 * @param renderer The renderer
 * @param onVertexClick The vertex click handler
 */
function useVertexClickHandler(renderer, onVertexClick) {
  (0, _react.useEffect)(function () {
    if (renderer) {
      return renderer.on('vertexClick', function (vertex) {
        return onVertexClick(vertex && vertex.id);
      });
    }
  }, [renderer, onVertexClick]);
}