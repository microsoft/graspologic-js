"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slerp = slerp;

var _math = require("math.gl");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Spherically interpolates the camera rotation between the 2D view and the 3D view
 * @param current The current value
 * @param next The next value
 * @param interpolation The interpolation value 0 - 1
 */
function slerp(current, next, interpolation) {
  return new _math.Quaternion().slerp({
    start: current,
    target: next,
    ratio: interpolation
  });
}