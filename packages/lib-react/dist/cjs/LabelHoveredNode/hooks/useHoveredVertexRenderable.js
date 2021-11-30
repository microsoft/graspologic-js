"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHoveredVertexRenderable = useHoveredVertexRenderable;

var _react = require("react");

var _context = require("../../GraphView/context");

var _renderablesSupport = require("@graspologic/renderables-support");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Adds a renderable to GraphView which will show a label on nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
function useHoveredVertexRenderable(onHover) {
  var renderer = (0, _react.useContext)(_context.GraphRendererContext);
  var renderable = (0, _react.useMemo)(function () {
    return (renderer === null || renderer === void 0 ? void 0 : renderer.gl) && new _renderablesSupport.VertexLabelRenderable(renderer.gl);
  }, [renderer]);
  (0, _react.useEffect)(function () {
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