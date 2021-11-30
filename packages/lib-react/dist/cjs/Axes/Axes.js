"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Axes = void 0;

var _react = require("react");

var _context = require("../GraphView/context");

var _useAxesRenderable = require("./hooks/useAxesRenderable");

var _renderer = require("@graspologic/renderer");

/**
 * Display's a set of Axes on the graph renderer
 */
var Axes = (0, _react.memo)(function (_ref) {
  var _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? _renderer.DEFAULT_DRAW_AXES : _ref$shown,
      _ref$inCorner = _ref.inCorner,
      inCorner = _ref$inCorner === void 0 ? _renderer.DEFAULT_CORNER_AXES : _ref$inCorner;
  var renderer = (0, _react.useContext)(_context.GraphRendererContext);
  (0, _useAxesRenderable.useAxesRenderable)(renderer);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.cornerAxes = inCorner;
    }
  }, [renderer, inCorner]);
  (0, _react.useEffect)(function () {
    if (renderer) {
      renderer.config.drawAxes = shown;
    }
  }, [renderer, shown]);
  return null;
});
exports.Axes = Axes;
Axes.displayName = 'Axes';