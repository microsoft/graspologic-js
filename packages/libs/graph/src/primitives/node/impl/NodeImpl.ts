/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ClassType, Shape } from '../../types'
import { nodeMemoryLayout, nodeType, ADDITIONAL_NODE_PROPS } from '../layout'
import { Node } from '../types'
import { createReader, MemoryReader, ReaderStore } from '@graspologic/memstore'
import { InputNode } from '../../../graph'

/**
 * An implementation of a Node
 */
const BaseNodeImpl: ClassType<MemoryReader & Node> = createReader<Node>(
	nodeType,
	nodeMemoryLayout,
	ADDITIONAL_NODE_PROPS,
)
const { typedOffset: positionTypedOffset } =  nodeMemoryLayout.get('position')!
const { typedOffset: radiusTypedOffset } =  nodeMemoryLayout.get('radius')!
const { typedOffset: shapeTypedOffset } =  nodeMemoryLayout.get('shape')!
const { typedOffset: weightTypedOffset } =  nodeMemoryLayout.get('weight')!
const { typedOffset: colorTypedOffset } =  nodeMemoryLayout.get('color')!

export class NodeImpl extends BaseNodeImpl {
	public static loadStore(store: ReaderStore<Node>, nodes: Iterable<InputNode>) {
		const floatArray = store.store.float32Array
		const uint8Array = store.store.uint8Array
		const uint32Array = store.store.uint32Array
		const bpi = store.store.bytesPerItem
	
		let inputNode: InputNode
		let i = 0
		let propertyBag: any
		let itemByteOffset: number
		let itemWordOffset: number
		for (inputNode of nodes) {
			itemByteOffset = i * bpi
			itemWordOffset = itemByteOffset / 4
	
			propertyBag = store.propertyBags[i] || {}
			store.propertyBags[i] = propertyBag
	
			propertyBag.id = inputNode.id
			propertyBag.group = inputNode.group
			propertyBag.label = inputNode.label
	
			floatArray[itemWordOffset + radiusTypedOffset] = inputNode.size || inputNode.radius || 0
			floatArray[itemWordOffset + positionTypedOffset] = inputNode.x || 0
			floatArray[itemWordOffset + positionTypedOffset + 1] = inputNode.y || 0
			floatArray[itemWordOffset + positionTypedOffset + 2] = inputNode.z || 0
			floatArray[itemWordOffset + weightTypedOffset] = inputNode.weight || 1
			uint32Array[itemWordOffset + colorTypedOffset] = inputNode.color || 0
			uint8Array[itemByteOffset + shapeTypedOffset] = parseShape(inputNode.shape)
		}
	}
}

/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */
function parseShape(unparsedShape?: Shape | string): Shape {
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
