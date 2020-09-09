/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createReader, MemoryReader } from '@graspologic/memstore'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { edgeType, edgeMemoryLayout, ADDITIONAL_EDGE_PROPS } from '../layout'
import { AnimatableEdge, Edge } from '../types'

/**
 * A reflection based edge impl which emits change events
 */
const BaseImpl = createReader<Edge>(
	edgeType,
	edgeMemoryLayout,
	ADDITIONAL_EDGE_PROPS,
	(setter, name: string) => {
		return function (this: MemoryReader, value: unknown) {
			setter.call(this, value)
			if (this.store) {
				this.store.notify(this.storeId, name, value)
			}
		}
	},
)

/**
 * An implementation of an Edge that has animation capabilities
 */
class AnimatableEdgeImplInternal extends BaseImpl implements AnimatableEdge {
	/**
	 * @inheritDoc
	 * @see {@link AnimatableEdge.animateSourcePosition}
	 */
	public animateSourcePosition(
		position: Pos3D | Pos2D,
		duration?: number,
	): void {
		// Set the start to the old sourcePosition
		;(this as any)['sourcePosition.start'] = (this as any)['sourcePosition']

		// Update the duration
		// This triggers an update in the renderer, causing it to animate
		// We could do, sourcePosition.tween = [duration, -1], but this involves an extra array allocation
		// that is essentially unnecessary
		;(this as any)['sourcePosition.duration'] = duration

		// Update the end sourcePosition
		;(this as any)['sourcePosition'] = position
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableEdge.animateTargetPosition}
	 */
	public animateTargetPosition(
		position: Pos3D | Pos2D,
		duration?: number,
	): void {
		// Set the start to the old targetPosition
		;(this as any)['targetPosition.start'] = (this as any)['targetPosition']

		// Update the duration
		// This triggers an update in the renderer, causing it to animate
		;(this as any)['targetPosition.duration'] = duration

		// Update the end targetPosition
		;(this as any)['targetPosition'] = position
	}
}

/**
 * An implementation of an Edge that has animation capabilities
 */
export const AnimatableEdgeImpl: ClassType<
	MemoryReader & Edge & AnimatableEdge
> = AnimatableEdgeImplInternal
