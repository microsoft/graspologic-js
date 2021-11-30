"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphContainer = useGraphContainer;

var _react = require("react");

var _graph = require("@graspologic/graph");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Converts __data__ to a GraphContainer
 * @param data The input data
 */
function useGraphContainer(data) {
  return (0, _react.useMemo)(function () {
    if (!data) {
      return undefined;
    } else if (Array.isArray(data.nodes)) {
      return _graph.GraphContainer.intern(data);
    } else {
      return data;
    }
  }, [data]);
}