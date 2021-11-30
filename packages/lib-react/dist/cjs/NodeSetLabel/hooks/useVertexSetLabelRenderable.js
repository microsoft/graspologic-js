"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVertexSetHighlightRenderable = useVertexSetHighlightRenderable;

var _react = require("react");

var _renderablesSupport = require("@graspologic/renderables-support");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function useVertexSetHighlightRenderable(renderer) {
  var renderable = (0, _react.useMemo)(function () {
    return renderer && renderer.gl && new _renderablesSupport.VertexSetLabelRenderable(renderer.gl);
  }, [renderer]);
  (0, _react.useEffect)(function () {
    if (renderer && renderable) {
      renderer.scene.addRenderable(renderable);
    }
  }, [renderer, renderable]);
  return renderable;
}