"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;

var _react = require("react");

var _context = require("../GraphView/context");

var _useCameraAdjustmentMode = require("./hooks/useCameraAdjustmentMode");

var _useCameraBounds = require("./hooks/useCameraBounds");

var _usePanZoomBehavior = require("./hooks/usePanZoomBehavior");

var _useZoomSynchronization = require("./hooks/useZoomSynchronization");

var _renderer = require("@graspologic/renderer");

/**
 * Adds an adjustable camera to the current GraphRenderer
 */
var Camera = (0, _react.memo)(function (_ref) {
  var bounds = _ref.bounds,
      transitionDuration = _ref.transitionDuration,
      zoom = _ref.zoom,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? _renderer.CameraAdjustmentMode.Graph : _ref$mode,
      _ref$interactive = _ref.interactive,
      interactive = _ref$interactive === void 0 ? true : _ref$interactive,
      _ref$doubleClickZoom = _ref.doubleClickZoom,
      doubleClickZoom = _ref$doubleClickZoom === void 0 ? true : _ref$doubleClickZoom;
  var renderer = (0, _react.useContext)(_context.GraphRendererContext); // Override mode if bounds is passed in

  (0, _useCameraAdjustmentMode.useCameraAdjustmentMode)(renderer, bounds ? _renderer.CameraAdjustmentMode.None : mode);
  (0, _useCameraBounds.useCameraBounds)(renderer, bounds, transitionDuration);
  (0, _usePanZoomBehavior.usePanZoomBehavior)(renderer, interactive, doubleClickZoom);
  (0, _useZoomSynchronization.useZoomSynchronization)(renderer, zoom);
  return null;
});
exports.Camera = Camera;
Camera.displayName = 'Camera';