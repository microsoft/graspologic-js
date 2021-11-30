"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeSetHighlight = void 0;

var _react = require("react");

var _GraphView = require("../GraphView");

var _useVertexSelectionSynchronization = require("./hooks/useVertexSelectionSynchronization");

var _useVertexSetHighlightRenderable = require("./hooks/useVertexSetHighlightRenderable");

var _renderer = require("@graspologic/renderer");

/**
 * Adds functionality to the GraphView component which colors a set of verticies a given color
 */
var NodeSetHighlight = (0, _react.memo)(function (_ref) {
  var vertexIds = _ref.vertexIds,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? _renderer.DEFAULT_HOVER_HIGHLIGHT_COLOR : _ref$color;
  var renderer = (0, _react.useContext)(_GraphView.GraphRendererContext);
  var renderable = (0, _useVertexSetHighlightRenderable.useVertexSetHighlightRenderable)(renderer);
  (0, _useVertexSelectionSynchronization.useVertexSelectionSynchronization)(renderer, renderable, vertexIds);
  (0, _react.useEffect)(function () {
    if (renderable && color != null) {
      renderable.color = color;
    }
  }, [renderable, color]);
  return null;
});
exports.NodeSetHighlight = NodeSetHighlight;
NodeSetHighlight.displayName = 'NodeSetHighlight';