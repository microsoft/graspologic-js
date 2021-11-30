"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edges = void 0;

var _react = require("react");

var _GraphView = require("../GraphView");

var _renderer = require("@graspologic/renderer");

/**
 * Configures the edge rendering for a GraphView
 */
var Edges = (0, _react.memo)(function (_ref) {
  var _ref$hideOnMove = _ref.hideOnMove,
      hideOnMove = _ref$hideOnMove === void 0 ? _renderer.DEFAULT_HIDE_EDGES_ON_MOVE : _ref$hideOnMove,
      _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? _renderer.DEFAULT_DRAW_EDGES : _ref$shown,
      _ref$constantWidth = _ref.constantWidth,
      constantWidth = _ref$constantWidth === void 0 ? _renderer.DEFAULT_EDGE_CONSTANT_WIDTH : _ref$constantWidth,
      _ref$depthWrite = _ref.depthWrite,
      depthWrite = _ref$depthWrite === void 0 ? _renderer.DEFAULT_EDGE_DEPTH_WRITE : _ref$depthWrite,
      _ref$antialias = _ref.antialias,
      antialias = _ref$antialias === void 0 ? _renderer.DEFAULT_EDGE_ANTIALIAS : _ref$antialias,
      _ref$alpha = _ref.alpha,
      alpha = _ref$alpha === void 0 ? _renderer.DEFAULT_EDGE_ALPHA : _ref$alpha,
      _ref$minWidth = _ref.minWidth,
      minWidth = _ref$minWidth === void 0 ? _renderer.DEFAULT_EDGE_MIN_WIDTH : _ref$minWidth,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === void 0 ? _renderer.DEFAULT_EDGE_MAX_WIDTH : _ref$maxWidth,
      _ref$filteredOutSatur = _ref.filteredOutSaturation,
      filteredOutSaturation = _ref$filteredOutSatur === void 0 ? _renderer.DEFAULT_EDGE_FILTERED_OUT_SATURATION : _ref$filteredOutSatur,
      _ref$filteredInSatura = _ref.filteredInSaturation,
      filteredInSaturation = _ref$filteredInSatura === void 0 ? _renderer.DEFAULT_EDGE_FILTERED_IN_SATURATION : _ref$filteredInSatura;
  var renderer = (0, _react.useContext)(_GraphView.GraphRendererContext);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.drawEdges = shown;
    }
  }, [renderer, shown]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.hideEdgesOnMove = hideOnMove;
    }
  }, [renderer, hideOnMove]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeConstantWidth = constantWidth;
    }
  }, [renderer, constantWidth]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeDepthWrite = depthWrite;
    }
  }, [renderer, depthWrite]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeAntialias = antialias;
    }
  }, [renderer, antialias]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeMinWidth = minWidth;
    }
  }, [renderer, minWidth]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeMaxWidth = maxWidth;
    }
  }, [renderer, maxWidth]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeAlpha = alpha;
    }
  }, [renderer, alpha]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeFilteredInSaturation = filteredInSaturation;
    }
  }, [renderer, filteredInSaturation]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.edgeFilteredOutSaturation = filteredOutSaturation;
    }
  }, [renderer, filteredOutSaturation]);
  return null;
});
exports.Edges = Edges;
Edges.displayName = 'Edges';