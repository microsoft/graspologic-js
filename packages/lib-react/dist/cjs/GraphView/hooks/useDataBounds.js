"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataBounds = useDataBounds;

var _react = require("react");

var _graph = require("@graspologic/graph");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Hook for computing the data bounds of the given container
 * @param container The data to compute the data bounds for
 */
function useDataBounds(container) {
  return (0, _react.useMemo)(function () {
    return container && (0, _graph.computeBounds)(container) || undefined;
  }, [container]);
}