"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelHoveredNode = void 0;

var _react = require("react");

var _useHoveredVertexRenderable = require("./hooks/useHoveredVertexRenderable");

/**
 * Adds functionality to the GraphView component which adds labels to hovered nodes
 */
var LabelHoveredNode = (0, _react.memo)(function (_ref) {
  var onHover = _ref.onHover;
  (0, _useHoveredVertexRenderable.useHoveredVertexRenderable)(onHover);
  return null;
});
exports.LabelHoveredNode = LabelHoveredNode;
LabelHoveredNode.displayName = 'LabelHoveredNode';