"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCameraAdjustmentMode = useCameraAdjustmentMode;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Updates __renderer__ to use __mode__ as it's CameraAdjustmentMode
 * @param renderer The renderer
 * @param mode The camera mode
 */
function useCameraAdjustmentMode(renderer) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _renderer.CameraAdjustmentMode.None;
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.cameraAdjustmentMode = mode;
    }
  }, [mode, renderer]);
}