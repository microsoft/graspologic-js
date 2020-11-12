/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputNode } from '../../../graph'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { nodeMemoryLayout } from '../layout'
import { AnimatableNode, Node, NodeStore } from '../types'
import { NodeImpl } from './NodeImpl'
import { MemoryReader } from '@graspologic/memstore'

const ALL_ATTRIBUTES = '*'

const COLOR_ATTRIBUTE = 'color'
const COLOR_START_ATTRIBUTE = 'color.start'
const COLOR_TWEEN_ATTRIBUTE = 'color.tween'
const POSITION_ATTRIBUTE = 'position'
const POSITION_START_ATTRIBUTE = 'position.start'
const POSITION_TWEEN_ATTRIBUTE = 'position.tween'

// For fast lookup
const positionTypedOffset = nodeMemoryLayout.get('position')!.typedOffset
const positionStartTypedOffset = nodeMemoryLayout.get('position.start')!
	.typedOffset
const positionTweenTypedOffset = nodeMemoryLayout.get('position.tween')!
	.typedOffset
const colorTypedOffset = nodeMemoryLayout.get('color')!.typedOffset
const colorStartTypedOffset = nodeMemoryLayout.get('color.start')!.typedOffset
const colorTweenTypedOffset = nodeMemoryLayout.get('color.tween')!.typedOffset

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
		this.float32Array[
			this.wordOffset + positionStartTypedOffset
		] = this.float32Array[this.wordOffset + positionTypedOffset]
		this.float32Array[
			this.wordOffset + positionStartTypedOffset + 1
		] = this.float32Array[this.wordOffset + positionTypedOffset + 1]
		this.float32Array[
			this.wordOffset + positionStartTypedOffset + 2
		] = this.float32Array[this.wordOffset + positionTypedOffset + 2]
		this.handleAttributeUpdated(POSITION_START_ATTRIBUTE)

		// Update the tween
		this.float32Array[this.wordOffset + positionTweenTypedOffset] = duration
		this.float32Array[this.wordOffset + positionTweenTypedOffset + 1] =
			(this.store as NodeStore)?.engineTime || 0
		this.handleAttributeUpdated(POSITION_TWEEN_ATTRIBUTE)

		// Update the end position
		this.float32Array[this.wordOffset + positionTypedOffset] = position[0] || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 1] =
			position[1] || 0
		this.float32Array[this.wordOffset + positionTypedOffset + 2] =
			position[2] || 0
		this.handleAttributeUpdated(POSITION_ATTRIBUTE)
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableNode.animateColor}
	 */
	public animateColor(color: number, duration = 0): void {
		// Set the start to the old color
		this.uint32Array[
			this.wordOffset + colorStartTypedOffset
		] = this.uint32Array[this.wordOffset + colorTypedOffset]
		this.handleAttributeUpdated(COLOR_START_ATTRIBUTE)

		// Update the tween
		this.float32Array[this.wordOffset + colorTweenTypedOffset] = duration
		this.float32Array[this.wordOffset + colorTweenTypedOffset + 1] =
			(this.store as NodeStore)?.engineTime || 0
		this.handleAttributeUpdated(COLOR_TWEEN_ATTRIBUTE)

		// Update the end color
		this.uint32Array[this.wordOffset + colorTypedOffset] = color
		this.handleAttributeUpdated(COLOR_ATTRIBUTE)
	}

	/**
	 * @inheritDoc
	 * @see {@link Node.load}
	 */
	public load(data: InputNode) {
		super.load(data)
		this.handleAttributeUpdated(ALL_ATTRIBUTES)
	}

	/**
	 * Handler for when an attribute is updated
	 * @param name The name of the attribute
	 * @param value The value of the attribute
	 */
	protected handleAttributeUpdated(name: string): void {
		if (this.store) {
			this.store.notify(this.storeId, name)
		}
	}
}

/**
 * An implementation of a Node that has animation capabilities
 */
export const AnimatableNodeImpl: ClassType<
	MemoryReader & Node & AnimatableNode
> = AnimatableNodeImplInternal
