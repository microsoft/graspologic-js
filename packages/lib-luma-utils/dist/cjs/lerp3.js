"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lerp3 = lerp3;

var _math = require("math.gl");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Linear interpolates between two Vector3 objects
 * @param start The start value
 * @param end The end value
 * @param interpolation The interpolation value 0 - 1
 */
function lerp3(start, end, interpolation) {
  return new _math.Vector3().lerp(start, end, (0, _math.clamp)(interpolation, 0, 1));
}