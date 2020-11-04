/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pos3D, Pos2D, ClassType } from '../../types'
import { AnimatableNode, Node } from '../types'
import { MemoryReader } from '@graspologic/memstore'
import { NodeImpl } from './NodeImpl'
import { InputNode } from '../../../graph'

const ALL_ATTRIBUTES = '*'

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
		;(this as any)['position.start'] = (this as any)['position']

		// Update the duration
		// This triggers an update in the renderer, causing it to animate
		// We could do, position.tween = [duration, -1], but this involves an extra array allocation
		// that is essentially unnecessary
		;(this as any)['position.duration'] = duration

		// Update the end position
		;(this as any)['position'] = position
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableNode.animateColor}
	 */
	public animateColor(color: number, duration = 0): void {
		// Set the start to the old color
		;(this as any)['color.start'] = (this as any)['color']

		// Update the duration
		// This triggers an update in the renderer, causing it to animate
		;(this as any)['color.duration'] = duration

		// Update the end color
		;(this as any)['color'] = color
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
