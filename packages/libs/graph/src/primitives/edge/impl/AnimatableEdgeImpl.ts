/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputEdge } from '../../../graph'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { AnimatableEdge, Edge } from '../types'
import { EdgeImpl } from './EdgeImpl'
import { MemoryReader } from '@graspologic/memstore'

const ALL_ATTRIBUTES = '*'

/**
 * An implementation of an Edge that has animation capabilities
 */
class AnimatableEdgeImplInternal extends EdgeImpl implements AnimatableEdge {
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

	/**
	 * @inheritDoc
	 * @see {@link Edge.load}
	 */
	public load(
		data: InputEdge,
		nodeIndexMap: Map<string, number>,
		defaultEdgeWeight = 1,
	) {
		super.load(data, nodeIndexMap, defaultEdgeWeight)
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
 * An implementation of an Edge that has animation capabilities
 */
export const AnimatableEdgeImpl: ClassType<
	MemoryReader & Edge & AnimatableEdge
> = AnimatableEdgeImplInternal
