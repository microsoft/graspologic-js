"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nodes = void 0;

var _react = require("react");

var _GraphView = require("../GraphView");

var _renderer = require("@graspologic/renderer");

/**
 * Configures the node rendering for the GraphView component
 */
var Nodes = (0, _react.memo)(function (_ref) {
  var _ref$minRadius = _ref.minRadius,
      minRadius = _ref$minRadius === void 0 ? _renderer.DEFAULT_NODE_MIN_RADIUS : _ref$minRadius,
      _ref$maxRadius = _ref.maxRadius,
      maxRadius = _ref$maxRadius === void 0 ? _renderer.DEFAULT_NODE_MAX_RADIUS : _ref$maxRadius,
      _ref$outline = _ref.outline,
      outline = _ref$outline === void 0 ? _renderer.DEFAULT_NODE_OUTLINE : _ref$outline,
      _ref$hideOnMove = _ref.hideOnMove,
      hideOnMove = _ref$hideOnMove === void 0 ? _renderer.DEFAULT_HIDE_NODES_ON_MOVE : _ref$hideOnMove,
      _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? _renderer.DEFAULT_DRAW_NODES : _ref$shown,
      filteredIds = _ref.filteredIds,
      _ref$filteredOutSatur = _ref.filteredOutSaturation,
      filteredOutSaturation = _ref$filteredOutSatur === void 0 ? _renderer.DEFAULT_NODE_FILTERED_OUT_SATURATION : _ref$filteredOutSatur,
      _ref$filteredInSatura = _ref.filteredInSaturation,
      filteredInSaturation = _ref$filteredInSatura === void 0 ? _renderer.DEFAULT_NODE_FILTERED_IN_SATURATION : _ref$filteredInSatura;
  var renderer = (0, _react.useContext)(_GraphView.GraphRendererContext);
  (0, _react.useEffect)(function () {
    if (renderer && minRadius != null) {
      renderer.config.nodeMinRadius = minRadius;
    }
  }, [renderer, minRadius]);
  (0, _react.useEffect)(function () {
    if (renderer && maxRadius != null) {
      renderer.config.nodeMaxRadius = maxRadius;
    }
  }, [renderer, maxRadius]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.nodeOutline = outline;
    }
  }, [renderer, outline]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.hideNodesOnMove = hideOnMove;
    }
  }, [renderer, hideOnMove]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.drawNodes = shown;
    }
  }, [renderer, shown]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.nodeFilteredIds = filteredIds;
    }
  }, [renderer, filteredIds]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.nodeFilteredInSaturation = filteredInSaturation;
    }
  }, [renderer, filteredInSaturation]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.nodeFilteredOutSaturation = filteredOutSaturation;
    }
  }, [renderer, filteredOutSaturation]);
  return null;
});
exports.Nodes = Nodes;
Nodes.displayName = 'Nodes';