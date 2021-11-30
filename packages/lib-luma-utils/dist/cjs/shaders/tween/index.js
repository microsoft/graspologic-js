"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tween = void 0;

var _easings = require("../easings");

var _tween = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/tween/tween.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const tween = {
  name: 'tween-module',
  vs: _tween.default,
  fs: null,
  dependencies: [_easings.linear],
  deprecations: []
};
exports.tween = tween;