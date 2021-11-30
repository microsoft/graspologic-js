/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createLayoutBuilder, InterpretationHint } from '@graspologic/memstore';
/**
 * The unique symbol for an edge
 */

export const edgeType = Symbol('@graspologic::edge');
/**
 * @internal
 *
 * The additional edge props
 */

export const ADDITIONAL_EDGE_PROPS = ['id', 'source', 'target', 'data'];
/**
 * @internal
 * The internal memory layout for storing edges
 */

export const edgeMemoryLayout = createLayoutBuilder().addUint32('sourceIndex').addUint32('targetIndex').addFloat32('weight').addFloat32('trueWeight').addFloat32('saturation').addFloat32('saturation2').addUint32('color').addUint32('color2').addUint8('visible', {
  hint: InterpretationHint.Boolean
}).addFloat32Vec3('sourcePosition.start').addFloat32Vec3('sourcePosition').addFloat32Vec2('sourcePosition.tween', {
  components: ['sourcePosition.duration', 'sourcePosition.startTime']
}).addFloat32Vec3('targetPosition.start').addFloat32Vec3('targetPosition').addFloat32Vec2('targetPosition.tween', {
  components: ['targetPosition.duration', 'targetPosition.startTime']
}).build();
/**
 * Gets the typed offset for the given attribute
 */

export function edgeTypedOffset(attribute) {
  var _edgeMemoryLayout$get;

  return (_edgeMemoryLayout$get = edgeMemoryLayout.get(attribute)) === null || _edgeMemoryLayout$get === void 0 ? void 0 : _edgeMemoryLayout$get.typedOffset;
}