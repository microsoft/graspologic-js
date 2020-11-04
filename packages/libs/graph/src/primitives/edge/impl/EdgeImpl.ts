/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ClassType } from '../../types'
import { edgeType, edgeMemoryLayout, ADDITIONAL_EDGE_PROPS } from '../layout'
import { Edge } from '../types'
import { createReader, MemoryReader } from '@graspologic/memstore'
import { InputEdge } from '../../../graph'

// Cache some of the attributes for the "load"
const { typedOffset: sourceIndexTypedOffset } =  edgeMemoryLayout.get('sourceIndex')!
const { typedOffset: targetIndexTypedOffset } =  edgeMemoryLayout.get('targetIndex')!
const { typedOffset: colorTypedOffset } =  edgeMemoryLayout.get('color')!
const { typedOffset: color2TypedOffset } =  edgeMemoryLayout.get('color2')!
const { typedOffset: weightTypedOffset } =  edgeMemoryLayout.get('weight')!

/**
 * An implementation of an Edge
 */
const BaseEdgeImpl: ClassType<MemoryReader & Edge> = createReader<Edge>(
	edgeType,
	edgeMemoryLayout,
	ADDITIONAL_EDGE_PROPS,
)

export class EdgeImpl extends BaseEdgeImpl {

	/**
	 * @inheritDoc
	 * @see {@link Edge.load}
	 */
	public load(data: InputEdge, nodeIndexMap: Map<string, number>, defaultEdgeWeight = 1) {
		;(this as any).propertyBag = this.store.propertyBags[this.storeId] || {}
		this.store.propertyBags[this.storeId] = (this as any).propertyBag

		;(this as any).propertyBag.source = data.source
		;(this as any).propertyBag.target = data.target

		this.uint32Array[this.wordOffset + sourceIndexTypedOffset] = nodeIndexMap.get(data.source)!
		this.uint32Array[this.wordOffset + targetIndexTypedOffset] = nodeIndexMap.get(data.target)!
		this.float32Array[this.wordOffset + weightTypedOffset] = data.weight != null ? data.weight : defaultEdgeWeight
		this.uint32Array[this.wordOffset + colorTypedOffset] = data.color || data.sourceColor || 0
		this.uint32Array[this.wordOffset + color2TypedOffset] = data.color2 || data.targetColor || 0
	}
}
