"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use3DMode = use3DMode;

var _math = require("math.gl");

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Enables/disables 3d on __renderer__ based on __is3D__
 * @param renderer The renderer
 * @param is3D If true, the renderer will go into 3d mode
 */
function use3DMode(renderer, is3D) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.is3D = is3D; // reset the Rotation when going back to 2d mode

      if (!is3D) {
        renderer.camera.rotation = new _math.Quaternion();
      }
    }
  }, [renderer, is3D]);
}