"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workerFactoryFromScript = workerFactoryFromScript;

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
function workerFactoryFromScript(workerScript) {
  const blob = new Blob([workerScript], {
    type: 'text/javascript'
  });
  const blobUrl = window.URL.createObjectURL(blob);
  return () => new Worker(blobUrl);
}