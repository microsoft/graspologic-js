"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeSetLabel = void 0;

var _react = require("react");

var _GraphView = require("../GraphView");

var _useVertexSelectionSynchronization = require("./hooks/useVertexSelectionSynchronization");

var _useVertexSetLabelRenderable = require("./hooks/useVertexSetLabelRenderable");

/**
 * Adds functionality to the GraphView component which adds labels for a set of verticies
 */
var NodeSetLabel = (0, _react.memo)(function (_ref) {
  var vertexIds = _ref.vertexIds;
  var renderer = (0, _react.useContext)(_GraphView.GraphRendererContext);
  var renderable = (0, _useVertexSetLabelRenderable.useVertexSetHighlightRenderable)(renderer);
  (0, _useVertexSelectionSynchronization.useVertexSelectionSynchronization)(renderer, renderable, vertexIds);
  return null;
});
exports.NodeSetLabel = NodeSetLabel;
NodeSetLabel.displayName = 'NodeSetLabel';