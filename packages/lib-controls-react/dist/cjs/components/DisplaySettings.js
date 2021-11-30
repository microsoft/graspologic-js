"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplaySettings = void 0;

var _react = require("react");

var _context = require("../context");

var _react2 = require("@graspologic/react");

var _renderControls = require("@graspologic/render-controls");

/**
 * Attaches the graph renderer display settings to the SettingsPane
 */
var DisplaySettings = (0, _react.memo)(function DisplaySettings(_ref) {
  var interpolationTimeRange = _ref.interpolationTimeRange;
  var gui = (0, _react.useContext)(_context.DatGuiContext);
  var renderer = (0, _react.useContext)(_react2.GraphRendererContext);
  (0, _react.useEffect)(function () {
    if (gui && renderer) {
      return (0, _renderControls.attachDisplaySettings)(gui, renderer, {
        interpolationTimeRange: interpolationTimeRange
      });
    }
  }, [gui, renderer, interpolationTimeRange]);
  return null;
});
exports.DisplaySettings = DisplaySettings;