"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterpretationHint = exports.AttributeType = void 0;

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
var AttributeType;
exports.AttributeType = AttributeType;

(function (AttributeType) {
  AttributeType[AttributeType["Float32"] = 0] = "Float32";
  AttributeType[AttributeType["Uint8"] = 1] = "Uint8";
  AttributeType[AttributeType["Uint32"] = 2] = "Uint32";
})(AttributeType || (exports.AttributeType = AttributeType = {}));
/**
 * Indicates how a value should be interpreted
 */


var InterpretationHint;
exports.InterpretationHint = InterpretationHint;

(function (InterpretationHint) {
  /**
   * Interpret a uint8 value as a boolean
   */
  InterpretationHint[InterpretationHint["Boolean"] = 0] = "Boolean";
})(InterpretationHint || (exports.InterpretationHint = InterpretationHint = {}));