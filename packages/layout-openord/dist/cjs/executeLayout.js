"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openOrd = openOrd;

var _factory = require("./factory");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * Runs the openOrd layout algorithm
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param onTick A callback for when the layout has performed an interation
 * @param globalObject The global object
 * @returns A promise for when the layout is complete
 */
function openOrd(graph, configuration = {}, onTick = () => null, globalObject = window) {
  const oord = (0, _factory.createInstance)(graph, configuration, globalObject);
  const subscription = oord.on('tick', onTick); // Execute the Layout

  return oord.execute().then(() => subscription());
}