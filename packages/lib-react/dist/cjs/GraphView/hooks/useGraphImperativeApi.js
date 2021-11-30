"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphImperativeApi = useGraphImperativeApi;

var _react = require("react");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Assigns a GraphRenderer imperative api for __renderer__ to __ref__
 * @param renderer The graph renderer
 * @param ref The ref for a graph renderer
 */
function useGraphImperativeApi(renderer, ref) {
  return (0, _react.useImperativeHandle)(ref, function () {
    return !renderer || renderer.destroyed ? {} : renderer;
  }, [renderer]);
}