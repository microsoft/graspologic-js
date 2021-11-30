"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePanZoomBehavior = usePanZoomBehavior;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Enables pan-zoom behavior on __renderer__ of __interactive__ is true
 * @param renderer The renderer
 * @param interactive If true, the pan-zoom behavior should be enabled
 * @param doubleClickZoom If true, the double click zoom behavior will be enabled
 */
function usePanZoomBehavior(renderer, interactive, doubleClickZoom) {
  (0, _react.useEffect)(function () {
    var disconnect;

    if (renderer && interactive && !renderer.destroyed) {
      renderer.onInitialize(function () {
        disconnect = (0, _renderer.enablePanZoomEvents)(renderer, {
          zoomToGraph: doubleClickZoom
        });
      });
    }

    return function () {
      return disconnect && disconnect();
    };
  }, [renderer, doubleClickZoom, interactive]);
}