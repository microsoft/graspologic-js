"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphInterpolationTime = useGraphInterpolationTime;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Updates the __interpolationTime__ for the __renderer__
 * @param renderer The renderer
 * @param interpolationTime The interpolation time for animations
 */
function useGraphInterpolationTime(renderer, interpolationTime) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.interpolationTime = interpolationTime;
    }
  }, [renderer, interpolationTime]);
}