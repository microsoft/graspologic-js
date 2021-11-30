"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphHideDeselected = useGraphHideDeselected;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Hides/shows deselected nodes in __renderer__ based on __hideDeselected__
 * @param renderer The renderer
 * @param hideDeselected If true, deselected vertices will be hidden
 */
function useGraphHideDeselected(renderer, hideDeselected) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.hideDeselected = hideDeselected;
    }
  }, [renderer, hideDeselected]);
}