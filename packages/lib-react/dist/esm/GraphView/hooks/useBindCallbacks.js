/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useCallback } from 'react';
import { enableClickEvents } from '@graspologic/renderer';
/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */

export function useBindCallbacks(_ref) {
  var renderer = _ref.renderer,
      _ref$callbacks = _ref.callbacks,
      callbacks = _ref$callbacks === void 0 ? {} : _ref$callbacks;
  var onInitialize = callbacks.onInitialize,
      onLoad = callbacks.onLoad,
      onResize = callbacks.onResize,
      onNodeClick = callbacks.onNodeClick,
      onNodeHover = callbacks.onNodeHover;
  var handleInitialize = useCallback(function () {
    if (onInitialize && renderer) {
      onInitialize(renderer);
    }
  }, [onInitialize, renderer]);
  useEffect(function () {
    // TODO: if this can be unsubscribed, we should return unsub function
    if (renderer) {
      renderer.onInitialize(handleInitialize);
    }
  }, [renderer, handleInitialize]);
  useEffect(function () {
    if (renderer && onLoad) {
      return renderer.on('load', function () {
        return onLoad();
      });
    }
  }, [renderer, onLoad]);
  useEffect(function () {
    if (renderer && onResize) {
      return renderer.on('resize', function () {
        return onResize();
      });
    }
  }, [renderer, onResize]);
  useEffect(function () {
    if (renderer && onNodeClick) {
      // click events need to be explicitly turned on when handlers are present
      // normally, they are only enabled if HandleNodeClicks child component is used
      // this provides an alternative binding to match the other handlers for consistency
      var disconnect = enableClickEvents(renderer);
      var disconnectVertexClick = renderer.on('vertexClick', function (node) {
        onNodeClick(node);
      });
      return function () {
        disconnect();
        disconnectVertexClick();
      };
    }
  }, [renderer, onNodeClick]);
  useEffect(function () {
    if (renderer && onNodeHover) {
      return renderer.on('vertexHovered', function (node) {
        onNodeHover(node);
      });
    }
  }, [renderer, onNodeHover]);
}