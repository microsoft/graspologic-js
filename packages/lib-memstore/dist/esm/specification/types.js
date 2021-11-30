/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export var AttributeType;

(function (AttributeType) {
  AttributeType[AttributeType["Float32"] = 0] = "Float32";
  AttributeType[AttributeType["Uint8"] = 1] = "Uint8";
  AttributeType[AttributeType["Uint32"] = 2] = "Uint32";
})(AttributeType || (AttributeType = {}));
/**
 * Indicates how a value should be interpreted
 */


export var InterpretationHint;

(function (InterpretationHint) {
  /**
   * Interpret a uint8 value as a boolean
   */
  InterpretationHint[InterpretationHint["Boolean"] = 0] = "Boolean";
})(InterpretationHint || (InterpretationHint = {}));