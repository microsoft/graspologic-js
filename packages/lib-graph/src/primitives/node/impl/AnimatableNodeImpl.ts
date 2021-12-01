/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryReader, MemoryReaderInspector } from '@graspologic/memstore'
import { InputNode } from '../../../graph'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { nodeTypedOffset } from '../layout'
import { AnimatableNode, Node, NodeStore } from '../types'
import { NodeImpl } from './NodeImpl'

const allAttributes = '*'

const colorAttr = 'color'
const colorStartAttr = 'color.start'
const colorTweenAttr = 'color.tween'
const positionAttr = 'position'
const positionStartAttr = 'position.start'
const positionTweenAttr = 'position.tween'

// For fast lookup
const positionTypedOffset = nodeTypedOffset(positionAttr)!
const positionStartTypedOffset = nodeTypedOffset(positionStartAttr)!
const positionTweenTypedOffset = nodeTypedOffset(positionTweenAttr)!
const colorTypedOffset = nodeTypedOffset(colorAttr)!
const colorStartTypedOffset = nodeTypedOffset(colorStartAttr)!
const colorTweenTypedOffset = nodeTypedOffset(colorTweenAttr)!

const inspector = new MemoryReaderInspector()

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
		inspector.copyFloat32Vec3Offset(
			this,
			positionTypedOffset,
			positionStartTypedOffset,
		)
		this.handleAttributeUpdated(positionStartAttr)

		// Update the tween
		inspector.writeFloat32Vec2Offset(
			this,
			positionTweenTypedOffset,
			duration,
			(this.store as NodeStore)?.engineTime || 0,
		)
		this.handleAttributeUpdated(positionTweenAttr)

		// Update the end position
		inspector.writeFloat32Vec3Offset(
			this,
			positionTypedOffset,
			position[0] || 0,
			position[1] || 0,
			position[2] || 0,
		)
		this.handleAttributeUpdated(positionAttr)
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableNode.animateColor}
	 */
	public animateColor(color: number, duration = 0): void {
		// Set the start to the old color
		inspector.copyUint32Offset(this, colorTypedOffset, colorStartTypedOffset)
		this.handleAttributeUpdated(colorStartAttr)

		// Update the tween
		inspector.writeFloat32Vec2Offset(
			this,
			colorTweenTypedOffset,
			duration,
			(this.store as NodeStore)?.engineTime || 0,
		)
		this.handleAttributeUpdated(colorTweenAttr)

		// Update the end color
		inspector.writeUint32Offset(this, colorTypedOffset, color)
		this.handleAttributeUpdated(colorAttr)
	}

	/**
	 * @inheritDoc
	 * @see {@link Node.load}
	 */
	public load(data: InputNode) {
		super.load(data)
		this.handleAttributeUpdated(allAttributes)
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
