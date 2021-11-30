"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edgeType = exports.edgeMemoryLayout = exports.ADDITIONAL_EDGE_PROPS = void 0;
exports.edgeTypedOffset = edgeTypedOffset;

var _memstore = require("@graspologic/memstore");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * The unique symbol for an edge
 */
const edgeType = Symbol('@graspologic::edge');
/**
 * @internal
 *
 * The additional edge props
 */

exports.edgeType = edgeType;
const ADDITIONAL_EDGE_PROPS = ['id', 'source', 'target', 'data'];
/**
 * @internal
 * The internal memory layout for storing edges
 */

exports.ADDITIONAL_EDGE_PROPS = ADDITIONAL_EDGE_PROPS;
const edgeMemoryLayout = (0, _memstore.createLayoutBuilder)().addUint32('sourceIndex').addUint32('targetIndex').addFloat32('weight').addFloat32('trueWeight').addFloat32('saturation').addFloat32('saturation2').addUint32('color').addUint32('color2').addUint8('visible', {
  hint: _memstore.InterpretationHint.Boolean
}).addFloat32Vec3('sourcePosition.start').addFloat32Vec3('sourcePosition').addFloat32Vec2('sourcePosition.tween', {
  components: ['sourcePosition.duration', 'sourcePosition.startTime']
}).addFloat32Vec3('targetPosition.start').addFloat32Vec3('targetPosition').addFloat32Vec2('targetPosition.tween', {
  components: ['targetPosition.duration', 'targetPosition.startTime']
}).build();
/**
 * Gets the typed offset for the given attribute
 */

exports.edgeMemoryLayout = edgeMemoryLayout;

function edgeTypedOffset(attribute) {
  var _edgeMemoryLayout$get;

  return (_edgeMemoryLayout$get = edgeMemoryLayout.get(attribute)) === null || _edgeMemoryLayout$get === void 0 ? void 0 : _edgeMemoryLayout$get.typedOffset;
}