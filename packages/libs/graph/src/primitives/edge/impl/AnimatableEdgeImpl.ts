/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputEdge } from '../../../graph'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { edgeMemoryLayout } from '../layout'
import { AnimatableEdge, Edge, EdgeStore } from '../types'
import { EdgeImpl } from './EdgeImpl'
import { MemoryReader } from '@graspologic/memstore'

const ALL_ATTRIBUTES = '*'

const SOURCE_POSITION_ATTRIBUTE = 'sourcePosition'
const SOURCE_POSITION_START_ATTRIBUTE = 'sourcePosition.start'
const SOURCE_POSITION_TWEEN_ATTRIBUTE = 'sourcePosition.tween'

const sourcePositionTypedOffset = edgeMemoryLayout.get('sourcePosition')!
	.typedOffset
const sourcePositionStartTypedOffset = edgeMemoryLayout.get(
	'sourcePosition.start',
)!.typedOffset
const sourcePositionTweenTypedOffset = edgeMemoryLayout.get(
	'sourcePosition.tween',
)!.typedOffset

const TARGET_POSITION_ATTRIBUTE = 'targetPosition'
const TARGET_POSITION_START_ATTRIBUTE = 'targetPosition.start'
const TARGET_POSITION_TWEEN_ATTRIBUTE = 'targetPosition.tween'

const targetPositionTypedOffset = edgeMemoryLayout.get('targetPosition')!
	.typedOffset
const targetPositionStartTypedOffset = edgeMemoryLayout.get(
	'targetPosition.start',
)!.typedOffset
const targetPositionTweenTypedOffset = edgeMemoryLayout.get(
	'targetPosition.tween',
)!.typedOffset

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
		// Set the start to the old position
		this.float32Array[
			this.wordOffset + sourcePositionStartTypedOffset
		] = this.float32Array[this.wordOffset + sourcePositionTypedOffset]
		this.float32Array[
			this.wordOffset + sourcePositionStartTypedOffset + 1
		] = this.float32Array[this.wordOffset + sourcePositionTypedOffset + 1]
		this.float32Array[
			this.wordOffset + sourcePositionStartTypedOffset + 2
		] = this.float32Array[this.wordOffset + sourcePositionTypedOffset + 2]
		this.handleAttributeUpdated(SOURCE_POSITION_START_ATTRIBUTE)

		// Update the tween
		this.float32Array[this.wordOffset + sourcePositionTweenTypedOffset] =
			duration || 0
		this.float32Array[this.wordOffset + sourcePositionTweenTypedOffset + 1] =
			(this.store as EdgeStore)?.engineTime || 0
		this.handleAttributeUpdated(SOURCE_POSITION_TWEEN_ATTRIBUTE)

		// Update the end position
		this.float32Array[this.wordOffset + sourcePositionTypedOffset] =
			position[0] || 0
		this.float32Array[this.wordOffset + sourcePositionTypedOffset + 1] =
			position[1] || 0
		this.float32Array[this.wordOffset + sourcePositionTypedOffset + 2] =
			position[2] || 0
		this.handleAttributeUpdated(SOURCE_POSITION_ATTRIBUTE)
	}

	/**
	 * @inheritDoc
	 * @see {@link AnimatableEdge.animateTargetPosition}
	 */
	public animateTargetPosition(
		position: Pos3D | Pos2D,
		duration?: number,
	): void {
		// Set the start to the old position
		this.float32Array[
			this.wordOffset + targetPositionStartTypedOffset
		] = this.float32Array[this.wordOffset + targetPositionTypedOffset]
		this.float32Array[
			this.wordOffset + targetPositionStartTypedOffset + 1
		] = this.float32Array[this.wordOffset + targetPositionTypedOffset + 1]
		this.float32Array[
			this.wordOffset + targetPositionStartTypedOffset + 2
		] = this.float32Array[this.wordOffset + targetPositionTypedOffset + 2]
		this.handleAttributeUpdated(TARGET_POSITION_START_ATTRIBUTE)

		// Update the tween
		this.float32Array[this.wordOffset + targetPositionTweenTypedOffset] =
			duration || 0
		this.float32Array[this.wordOffset + targetPositionTweenTypedOffset + 1] =
			(this.store as EdgeStore)?.engineTime || 0
		this.handleAttributeUpdated(TARGET_POSITION_TWEEN_ATTRIBUTE)

		// Update the end position
		this.float32Array[this.wordOffset + targetPositionTypedOffset] =
			position[0] || 0
		this.float32Array[this.wordOffset + targetPositionTypedOffset + 1] =
			position[1] || 0
		this.float32Array[this.wordOffset + targetPositionTypedOffset + 2] =
			position[2] || 0
		this.handleAttributeUpdated(TARGET_POSITION_ATTRIBUTE)
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
		this.handleAttributeUpdated(ALL_ATTRIBUTES)
	}

	/**
	 * Handler for when an attribute is updated
	 * @param name The name of the attribute
	 */
	protected handleAttributeUpdated(name: string): void {
		if (this.store) {
			this.store.notify(this.storeId, name)
		}
	}
}

/**
 * An implementation of an Edge that has animation capabilities
 */
export const AnimatableEdgeImpl: ClassType<
	MemoryReader & Edge & AnimatableEdge
> = AnimatableEdgeImplInternal
