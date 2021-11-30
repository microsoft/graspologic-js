"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCameraBounds = useCameraBounds;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Updates the renderer's camera to use __bounds__ as it's bounds
 * @param renderer The graph renderer
 * @param bounds The new bounds
 * @param transitionDuration The time to take to transition between the camera's old position to the new one
 */
function useCameraBounds(renderer, bounds, transitionDuration) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      if (bounds) {
        renderer.camera.fitToView(bounds, transitionDuration);
      }

      return renderer.on('load', function () {
        if (bounds) {
          renderer.camera.fitToView(bounds, transitionDuration);
        }
      });
    }
  }, [bounds, renderer, transitionDuration]);
}