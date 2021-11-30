"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableClickEvents = enableClickEvents;

var _mjolnir = require("mjolnir.js");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// @ts-ignore

/**
 * Enables click events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
function enableClickEvents(renderer) {
  const eventManager = new _mjolnir.EventManager(renderer.view);
  eventManager.on({
    click: () => renderer.handleClicked()
  });
  return () => eventManager.destroy();
}