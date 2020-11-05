/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pos3D, Pos2D, ClassType } from '../../types'
import { AnimatableNode, Node } from '../types'
import { MemoryReader } from '@graspologic/memstore'
import { NodeImpl } from './NodeImpl'
import { InputNode } from '../../../graph'
import { nodeMemoryLayout } from '../layout'

const ALL_ATTRIBUTES = '*'

const COLOR_ATTRIBUTE = 'color'
const COLOR_START_ATTRIBUTE = 'color.start'
const COLOR_DURATION_ATTRIBUTE = 'color.duration'
const POSITION_ATTRIBUTE = 'position'
const POSITION_START_ATTRIBUTE = 'position.start'
const POSITION_DURATION_ATTRIBUTE = 'position.duration'

const { typedOffset: positionTypedOffset } =  nodeMemoryLayout.get('position')!
const { typedOffset: positionStartTypedOffset } =  nodeMemoryLayout.get('position.start')!
const { typedOffset: positionTweenTypedOffset } =  nodeMemoryLayout.get('position.tween')!

const { typedOffset: colorTypedOffset } =  nodeMemoryLayout.get('color')!
const { typedOffset: colorStartTypedOffset } =  nodeMemoryLayout.get('color.start')!
const { typedOffset: colorTweenTypedOffset } =  nodeMemoryLayout.get('color.tween')!


/**
 * An implementation of a Node that has animation capabilities
 */
class AnimatableNodeImplInternal extends NodeImpl implements AnimatableNode {

	/**
	 * @inheritDoc
	 * @see {@link AnimatableNode.animatePosition}
	 */
	public animatePosition(position: Pos3D | Pos2D, duration = 0): void {
		// Set the start to the old position
		this.float32Array[this.wordOffset + positionStartTypedOffset] = this.float32Array[this.wordOffset + positionTypedOffset]
		this.float32Array[this.wordOffset + positionStartTypedOffset + 1] = this.float32Array[this.wordOffset + positionTypedOffset + 1]
		this.float32Array[this.wordOffset + positionStartTypedOffset + 2] = this.float32Array[this.wordOffset + positionTypedOffset + 2]
		this.handleAttributeUpdated(POSITION_START_ATTRIBUTE, this.float32Array.subarray(this.wordOffset + positionStartTypedOffset, this.wordOffset + positionStartTypedOffset + 2))

		// Update the duration
		this.float32Array[this.wordOffset + positionTweenTypedOffset] = duration
		this.handleAttributeUpdated(POSITION_DURATION_ATTRIBUTE, duration)
		
		// Update the end position
		this.float32Array[this.wordOffset + positionTypedOffset] = position[0] || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 1] = position[1] || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 2] = position[2] || 0
		this.handleAttributeUpdated(POSITION_ATTRIBUTE, position)
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableNode.animateColor}
	 */
	public animateColor(color: number, duration = 0): void {
		// Set the start to the old color
		this.uint32Array[this.wordOffset + colorStartTypedOffset] = this.float32Array[this.wordOffset + colorTypedOffset]
		this.handleAttributeUpdated(COLOR_START_ATTRIBUTE, this.float32Array[this.wordOffset + colorTypedOffset])

		// Update the duration
		this.float32Array[this.wordOffset + colorTweenTypedOffset] = duration
		this.handleAttributeUpdated(COLOR_DURATION_ATTRIBUTE, duration)
		
		// Update the end color
		this.uint32Array[this.wordOffset + colorTypedOffset] = color
		this.handleAttributeUpdated(COLOR_ATTRIBUTE, color)
	}

	/**
	 * @inheritDoc
	 * @see {@link Node.load}
	 */
	public load(data: InputNode) {
		super.load(data)
		this.handleAttributeUpdated(ALL_ATTRIBUTES, undefined)
	}

	/**
	 * Handler for when an attribute is updated
	 * @param name The name of the attribute
	 * @param value The value of the attribute
	 */
	protected handleAttributeUpdated(name: string, value: unknown): void {
		if (this.store) {
			this.store.notify(this.storeId, name, value)
		}
	}
}

/**
 * An implementation of a Node that has animation capabilities
 */
export const AnimatableNodeImpl: ClassType<
	MemoryReader & Node & AnimatableNode
> = AnimatableNodeImplInternal
