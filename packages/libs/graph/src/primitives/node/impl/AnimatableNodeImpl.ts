/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pos3D, Pos2D, ClassType } from '../../types'
import { nodeType, nodeMemoryLayout, ADDITIONAL_NODE_PROPS } from '../layout'
import { AnimatableNode, Node } from '../types'
import { createReader, MemoryReader } from '@graspologic/memstore'

/**
 * A reflection based node impl which emits change events
 */
const BaseImpl = createReader<Node>(
	nodeType,
	nodeMemoryLayout,
	ADDITIONAL_NODE_PROPS,
	(setter, name: string) => {
		return function (this: MemoryReader, value: unknown) {
			setter.call(this, value)
			if (this.store) {
				this.store.notify(this.storeId, name, value)
			}
		}
	},

	// This cast is necessary, because in our live code editor
	// it wasn't picking this up as an implementation of a Node
	// so, AnimatableNodeImpl was getting hosed
) as ClassType<Node>

/**
 * An implementation of a Node that has animation capabilities
 */
class AnimatableNodeImplInternal extends BaseImpl implements AnimatableNode {
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
}

/**
 * An implementation of a Node that has animation capabilities
 */
export const AnimatableNodeImpl: ClassType<
	MemoryReader & Node & AnimatableNode
> = AnimatableNodeImplInternal
