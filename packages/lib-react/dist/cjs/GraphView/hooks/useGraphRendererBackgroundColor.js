"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphRendererBackgroundColor = useGraphRendererBackgroundColor;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Updates the background color of __renderer__ to __backgroundColor__
 * @param renderer The renderer
 * @param backgroundColor The new background color
 */
function useGraphRendererBackgroundColor(renderer, backgroundColor) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed) {
      renderer.config.backgroundColor = backgroundColor;
    }
  }, [backgroundColor, renderer]);
}