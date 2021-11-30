"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeSettings = void 0;

var _react = require("react");

var _context = require("../context");

var _react2 = require("@graspologic/react");

var _renderControls = require("@graspologic/render-controls");

/**
 * Attaches the graph renderer node settings to the SettingsPane
 */
var NodeSettings = (0, _react.memo)(function NodeSettings(_ref) {
  var minRadiusRange = _ref.minRadiusRange,
      maxRadiusRange = _ref.maxRadiusRange;
  var gui = (0, _react.useContext)(_context.DatGuiContext);
  var renderer = (0, _react.useContext)(_react2.GraphRendererContext);
  (0, _react.useEffect)(function () {
    if (gui && renderer) {
      return (0, _renderControls.attachNodeSettings)(gui, renderer, {
        minRadiusRange: minRadiusRange,
        maxRadiusRange: maxRadiusRange
      });
    }
  }, [gui, renderer, minRadiusRange, maxRadiusRange]);
  return null;
});
exports.NodeSettings = NodeSettings;