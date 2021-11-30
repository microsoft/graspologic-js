"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleNodeClicks = void 0;

var _react = require("react");

var _context = require("../GraphView/context");

var _useVertexClickEvents = require("./hooks/useVertexClickEvents");

var _useVertexClickHandler = require("./hooks/useVertexClickHandler");

/**
 * Adds node click functionality to the GraphView component
 */
var HandleNodeClicks = (0, _react.memo)(function (_ref) {
  var onClick = _ref.onClick;
  var renderer = (0, _react.useContext)(_context.GraphRendererContext);
  (0, _useVertexClickEvents.useVertexClickEvents)(renderer);
  (0, _useVertexClickHandler.useVertexClickHandler)(renderer, onClick);
  return null;
});
exports.HandleNodeClicks = HandleNodeClicks;
HandleNodeClicks.displayName = 'HandleNodeClicks';