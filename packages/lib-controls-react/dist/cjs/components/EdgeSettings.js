"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgeSettings = void 0;

var _react = require("react");

var _context = require("../context");

var _react2 = require("@graspologic/react");

var _renderControls = require("@graspologic/render-controls");

/**
 * Attaches the graph renderer edge settings to the SettingsPane
 */
var EdgeSettings = (0, _react.memo)(function EdgeSettings(_ref) {
  var alphaRange = _ref.alphaRange,
      minWidthRange = _ref.minWidthRange,
      maxWidthRange = _ref.maxWidthRange;
  var gui = (0, _react.useContext)(_context.DatGuiContext);
  var renderer = (0, _react.useContext)(_react2.GraphRendererContext);
  (0, _react.useEffect)(function () {
    if (gui && renderer) {
      return (0, _renderControls.attachEdgeSettings)(gui, renderer, {
        alphaRange: alphaRange,
        minWidthRange: minWidthRange,
        maxWidthRange: maxWidthRange
      });
    }
  }, [gui, renderer, alphaRange, minWidthRange, maxWidthRange]);
  return null;
});
exports.EdgeSettings = EdgeSettings;