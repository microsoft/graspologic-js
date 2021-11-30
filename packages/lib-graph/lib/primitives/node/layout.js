/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createLayoutBuilder, InterpretationHint, AttributeType, } from '@graspologic/memstore';
/**
 * The unique symbol for a node
 */
export const nodeType = Symbol('@graspologic::node');
/**
 * @internal
 *
 * The set of additional node properties
 */
export const ADDITIONAL_NODE_PROPS = [
    'id',
    'group',
    'label',
    'data',
    { name: 'mass', ephemeral: true, initialValue: 0 },
    { name: 'dx', ephemeral: true, initialValue: 0 },
    { name: 'dy', ephemeral: true, initialValue: 0 },
    { name: 'old_dx', ephemeral: true, initialValue: 0 },
    { name: 'old_dy', ephemeral: true, initialValue: 0 },
    { name: 'convergence', ephemeral: true, initialValue: 1 },
];
/**
 * @internal
 *
 * The internal memory layout of a Node
 */
export const nodeMemoryLayout = createLayoutBuilder()
    // Properties
    .addFloat32('weight')
    .addFloat32('radius', {
    aliases: [{ name: 'size', type: AttributeType.Float32 }],
})
    .addUint8('fixed')
    // Colors
    .addUint32('color')
    .addUint32('color.start')
    .addFloat32Vec2('color.tween', {
    components: ['color.duration', 'color.startTime'],
})
    // Position
    .addFloat32Vec3('position', { components: ['x', 'y', 'z'] })
    .addFloat32Vec3('position.start')
    .addFloat32Vec2('position.tween', {
    components: ['position.duration', 'position.startTime'],
})
    // Rendering Properties
    .addFloat32('saturation')
    .addUint8('shape')
    .addUint8('visible', { hint: InterpretationHint.Boolean })
    .addUint8Vec3('pickingColor')
    .build();
/**
 * Gets the typed offset for the given attribute
 */
export function nodeTypedOffset(attribute) {
    return nodeMemoryLayout.get(attribute)?.typedOffset;
}
