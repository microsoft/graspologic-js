"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeType = exports.nodeMemoryLayout = exports.ADDITIONAL_NODE_PROPS = void 0;
exports.nodeTypedOffset = nodeTypedOffset;

var _memstore = require("@graspologic/memstore");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * The unique symbol for a node
 */
const nodeType = Symbol('@graspologic::node');
/**
 * @internal
 *
 * The set of additional node properties
 */

exports.nodeType = nodeType;
const ADDITIONAL_NODE_PROPS = ['id', 'group', 'label', 'data', {
  name: 'mass',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'dx',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'dy',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'old_dx',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'old_dy',
  ephemeral: true,
  initialValue: 0
}, {
  name: 'convergence',
  ephemeral: true,
  initialValue: 1
}];
/**
 * @internal
 *
 * The internal memory layout of a Node
 */

exports.ADDITIONAL_NODE_PROPS = ADDITIONAL_NODE_PROPS;
const nodeMemoryLayout = (0, _memstore.createLayoutBuilder)() // Properties
.addFloat32('weight').addFloat32('radius', {
  aliases: [{
    name: 'size',
    type: _memstore.AttributeType.Float32
  }]
}).addUint8('fixed') // Colors
.addUint32('color').addUint32('color.start').addFloat32Vec2('color.tween', {
  components: ['color.duration', 'color.startTime']
}) // Position
.addFloat32Vec3('position', {
  components: ['x', 'y', 'z']
}).addFloat32Vec3('position.start').addFloat32Vec2('position.tween', {
  components: ['position.duration', 'position.startTime']
}) // Rendering Properties
.addFloat32('saturation').addUint8('shape').addUint8('visible', {
  hint: _memstore.InterpretationHint.Boolean
}).addUint8Vec3('pickingColor').build();
/**
 * Gets the typed offset for the given attribute
 */

exports.nodeMemoryLayout = nodeMemoryLayout;

function nodeTypedOffset(attribute) {
  var _nodeMemoryLayout$get;

  return (_nodeMemoryLayout$get = nodeMemoryLayout.get(attribute)) === null || _nodeMemoryLayout$get === void 0 ? void 0 : _nodeMemoryLayout$get.typedOffset;
}