/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createReader } from '@graspologic/memstore'
import { InputNode } from '../../../graph'
import { Shape } from '../../types'
import { nodeMemoryLayout, nodeType, ADDITIONAL_NODE_PROPS } from '../layout'
import { Node } from '../types'

// Cache some of the attributes for the "load"
const positionTypedOffset = nodeMemoryLayout.get('position')!.typedOffset
const radiusTypedOffset = nodeMemoryLayout.get('radius')!.typedOffset
const shapeTypedOffset = nodeMemoryLayout.get('shape')!.typedOffset
const weightTypedOffset = nodeMemoryLayout.get('weight')!.typedOffset
const colorTypedOffset = nodeMemoryLayout.get('color')!.typedOffset
const visibleTypedOffset = nodeMemoryLayout.get('visible')!.typedOffset

/**
 * An implementation of a Node
 */
const BaseNodeImpl = createReader<Node>(
	nodeType,
	nodeMemoryLayout,
	ADDITIONAL_NODE_PROPS,
)

export class NodeImpl extends BaseNodeImpl implements Node {
	/**
	 * @inheritDoc
	 * @see {@link Node.load}
	 */
	public load(data: InputNode) {
		;(this as any).propertyBag = this.store.propertyBags[this.storeId] || {}
		this.store.propertyBags[this.storeId] = (this as any).propertyBag
		;(this as any).propertyBag.id = data.id
		;(this as any).propertyBag.group = data.group
		;(this as any).propertyBag.label = data.label

		this.float32Array[this.wordOffset + radiusTypedOffset] =
			data.size || data.radius || 0
		this.float32Array[this.wordOffset + positionTypedOffset] = data.x || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 1] = data.y || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 2] = data.z || 0
		this.float32Array[this.wordOffset + weightTypedOffset] = data.weight || 1
		this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || 0
		this.uint8Array[this.byteOffset + shapeTypedOffset] = parseShape(data.shape)
		this.uint8Array[this.byteOffset + visibleTypedOffset] = 1
	}
}

/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */
export function parseShape(unparsedShape?: Shape | string): Shape {
	if (typeof unparsedShape === 'string') {
		unparsedShape = unparsedShape.toLocaleLowerCase()
		if (unparsedShape === 'square') {
			return Shape.Square
		} else if (unparsedShape === 'diamond') {
			return Shape.Diamond
		}
	} else if (
		unparsedShape === Shape.Square ||
		unparsedShape === Shape.Diamond ||
		unparsedShape === Shape.Circle
	) {
		return unparsedShape as Shape
	}
	return Shape.Circle
}
