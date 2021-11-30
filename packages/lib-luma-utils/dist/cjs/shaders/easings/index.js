"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = void 0;

var _linear = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/easings/linear.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const linear = {
  name: 'linear-easing-module',
  vs: _linear.default,
  fs: null,
  dependencies: [],
  deprecations: []
};
exports.linear = linear;