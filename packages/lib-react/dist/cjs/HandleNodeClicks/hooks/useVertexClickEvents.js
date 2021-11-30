"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVertexClickEvents = useVertexClickEvents;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Enables vertex click events on __renderer__
 * @param renderer The renderer
 */
function useVertexClickEvents(renderer) {
  (0, _react.useEffect)(function () {
    var disconnect;

    if (renderer) {
      renderer.onInitialize(function () {
        disconnect = (0, _renderer.enableClickEvents)(renderer);
      });
    }

    return function () {
      return disconnect && disconnect();
    };
  }, [renderer]);
}