"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxesRenderable = useAxesRenderable;

var _react = require("react");

var _renderablesSupport = require("@graspologic/renderables-support");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Adds an AxesRenderable to __renderer__ which will display a set of Axes on the renderer.
 * @param renderer The graph renderer
 */
function useAxesRenderable(renderer) {
  var renderable = (0, _react.useMemo)(function () {
    return renderer && renderer.gl && new _renderablesSupport.AxesRenderable(renderer.gl, renderer.config);
  }, [renderer]);
  (0, _react.useEffect)(function () {
    if (renderer && renderable) {
      renderer.scene.addRenderable(renderable, true);
    }
  }, [renderer, renderable]);
  return renderable;
}