"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeFa2 = executeFa2;

var _factory = require("./factory");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * Executes the FA2 algorithm
 * @param graph The graph to layout
 * @param configuration The configuration for the layout
 * @param onTick The callback for when an iteration of the layout was performed
 * @returns A promise that resolves when the layout is completed
 */
function executeFa2(graph, configuration = {}, onTick = () => null) {
  const executor = (0, _factory.createInstance)(graph, configuration, window);
  const subscription = executor.on('tick', onTick); // Execute the Layout

  return executor.execute().then(() => subscription());
}