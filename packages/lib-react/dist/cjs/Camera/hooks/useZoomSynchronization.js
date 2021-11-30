"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZoomSynchronization = useZoomSynchronization;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Adjusts the zoom on __renderer__ when __zoom__ changes
 * @param renderer The renderer
 * @param zoom The zoom level
 */
function useZoomSynchronization(renderer, zoom) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed && zoom != null) {
      renderer.camera.moveTo(0, 0, zoom);
      renderer.makeDirty();
    }
  }, [renderer, zoom]);
}