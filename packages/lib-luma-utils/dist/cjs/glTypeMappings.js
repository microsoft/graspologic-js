"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uint32ColorTypeMapping = void 0;

var _glConstants = require("./glConstants");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * @internal
 *
 * How we represent color in webgl land
 */
const uint32ColorTypeMapping = {
  glType: _glConstants.GL_UNSIGNED_BYTE,
  size: 4
};
exports.uint32ColorTypeMapping = uint32ColorTypeMapping;