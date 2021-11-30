"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastDebounce = fastDebounce;

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function fastDebounce(callback, delay = 100) {
  let lastUpdate;
  let startLoop = true;

  function loop() {
    const timeSinceLastUpdate = Date.now() - lastUpdate;

    if (timeSinceLastUpdate < delay) {
      // Set timeout for the remaining time
      setTimeout(loop, delay - timeSinceLastUpdate);
    } else {
      startLoop = true;
      callback();
    }
  }

  return function () {
    lastUpdate = Date.now();

    if (startLoop) {
      startLoop = false;
      loop();
    }
  };
}