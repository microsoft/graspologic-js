"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBindCallbacks = useBindCallbacks;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
function useBindCallbacks(_ref) {
  var renderer = _ref.renderer,
      _ref$callbacks = _ref.callbacks,
      callbacks = _ref$callbacks === void 0 ? {} : _ref$callbacks;
  var onInitialize = callbacks.onInitialize,
      onLoad = callbacks.onLoad,
      onResize = callbacks.onResize,
      onNodeClick = callbacks.onNodeClick,
      onNodeHover = callbacks.onNodeHover;
  var handleInitialize = (0, _react.useCallback)(function () {
    if (onInitialize && renderer) {
      onInitialize(renderer);
    }
  }, [onInitialize, renderer]);
  (0, _react.useEffect)(function () {
    // TODO: if this can be unsubscribed, we should return unsub function
    if (renderer) {
      renderer.onInitialize(handleInitialize);
    }
  }, [renderer, handleInitialize]);
  (0, _react.useEffect)(function () {
    if (renderer && onLoad) {
      return renderer.on('load', function () {
        return onLoad();
      });
    }
  }, [renderer, onLoad]);
  (0, _react.useEffect)(function () {
    if (renderer && onResize) {
      return renderer.on('resize', function () {
        return onResize();
      });
    }
  }, [renderer, onResize]);
  (0, _react.useEffect)(function () {
    if (renderer && onNodeClick) {
      // click events need to be explicitly turned on when handlers are present
      // normally, they are only enabled if HandleNodeClicks child component is used
      // this provides an alternative binding to match the other handlers for consistency
      var disconnect = (0, _renderer.enableClickEvents)(renderer);
      var disconnectVertexClick = renderer.on('vertexClick', function (node) {
        onNodeClick(node);
      });
      return function () {
        disconnect();
        disconnectVertexClick();
      };
    }
  }, [renderer, onNodeClick]);
  (0, _react.useEffect)(function () {
    if (renderer && onNodeHover) {
      return renderer.on('vertexHovered', function (node) {
        onNodeHover(node);
      });
    }
  }, [renderer, onNodeHover]);
}