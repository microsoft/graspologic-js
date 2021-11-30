"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphRenderKickoff = useGraphRenderKickoff;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Loads the __renderer__ with __data__ when __data__ changes, and colorizes when __colorizer__ changes
 * @param renderer The renderer
 * @param data The graph data
 * @param colorizer The colorizer to colorize the graph
 */
function useGraphRenderKickoff(renderer) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.start();
    }
  }, [renderer]);
}