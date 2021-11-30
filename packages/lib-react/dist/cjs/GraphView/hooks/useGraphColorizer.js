"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphColorizer = useGraphColorizer;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * This hook will apply colors to the edges/nodes of __renderer__ using the __colorizerFn__
 * @param renderer The graph renderer
 * @param colorizerFn The colorize function
 */
function useGraphColorizer(renderer, colorizerFn) {
  (0, _react.useEffect)(function () {
    if (renderer && !renderer.destroyed && colorizerFn) {
      (0, _renderer.colorizeRenderer)(renderer, colorizerFn);
    }
  }, [colorizerFn, renderer]);
}