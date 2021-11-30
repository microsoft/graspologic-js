"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightHoveredNode = void 0;

var _react = require("react");

var _useHoveredVertexRenderable = require("./hooks/useHoveredVertexRenderable");

var _renderer = require("@graspologic/renderer");

/**
 * Adds functionality to the GraphView component which highlights hovered nodes
 */
var HighlightHoveredNode = (0, _react.memo)(function (_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? _renderer.DEFAULT_HOVER_HIGHLIGHT_COLOR : _ref$color,
      onHover = _ref.onHover;
  var renderable = (0, _useHoveredVertexRenderable.useHoveredVertexRenderable)(onHover);
  (0, _react.useEffect)(function () {
    if (renderable) {
      renderable.color = color;
    }
  }, [color, renderable]);
  return null;
});
exports.HighlightHoveredNode = HighlightHoveredNode;
HighlightHoveredNode.displayName = 'HighlightHoveredNode';