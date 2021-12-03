/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryReader, MemoryReaderInspector } from '@graspologic/memstore'
import { InputEdge } from '../../../graph'
import { Pos3D, Pos2D, ClassType } from '../../types'
import { edgeTypedOffset } from '../layout'
import { AnimatableEdge, Edge, EdgeStore } from '../types'
import { EdgeImpl } from './EdgeImpl'

// Cache several frequently accessed names / offsets
const allAttributes = '*'
const sourcePositionAttr = 'sourcePosition'
const sourcePositionStartAttr = 'sourcePosition.start'
const sourcePositionTweenAttr = 'sourcePosition.tween'
const targetPositionAttr = 'targetPosition'
const targetPositionStartAttr = 'targetPosition.start'
const targetPositionTweenAttr = 'targetPosition.tween'

const sourcePositionTypedOffset = edgeTypedOffset(sourcePositionAttr)!
const sourcePositionStartTypedOffset = edgeTypedOffset(sourcePositionStartAttr)!
const sourcePositionTweenTypedOffset = edgeTypedOffset(sourcePositionTweenAttr)!
const targetPositionTypedOffset = edgeTypedOffset(targetPositionAttr)!
const targetPositionStartTypedOffset = edgeTypedOffset(targetPositionStartAttr)!
const targetPositionTweenTypedOffset = edgeTypedOffset(targetPositionTweenAttr)!

const inspector = new MemoryReaderInspector()

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
		inspector.copyFloat32Vec3Offset(
			this,
			sourcePositionTypedOffset,
			sourcePositionStartTypedOffset,
		)
		this.handleAttributeUpdated(sourcePositionStartAttr)

		// Update the tween
		inspector.writeFloat32Vec2Offset(
			this,
			sourcePositionTweenTypedOffset,
			duration || 0,
			(this.store as EdgeStore)?.engineTime || 0,
		)
		this.handleAttributeUpdated(sourcePositionTweenAttr)

		// Update the end sourcePosition
		inspector.writeFloat32Vec3Offset(
			this,
			sourcePositionTypedOffset,
			position[0] || 0,
			position[1] || 0,
			position[2] || 0,
		)
		this.handleAttributeUpdated(sourcePositionAttr)
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
		inspector.copyFloat32Vec3Offset(
			this,
			targetPositionTypedOffset,
			targetPositionStartTypedOffset,
		)
		this.handleAttributeUpdated(targetPositionStartAttr)

		// Update the tween
		inspector.writeFloat32Vec2Offset(
			this,
			targetPositionTweenTypedOffset,
			duration || 0,
			(this.store as EdgeStore)?.engineTime || 0,
		)
		this.handleAttributeUpdated(targetPositionTweenAttr)

		// Update the end targetPosition
		inspector.writeFloat32Vec3Offset(
			this,
			targetPositionTypedOffset,
			position[0] || 0,
			position[1] || 0,
			position[2] || 0,
		)
		this.handleAttributeUpdated(targetPositionAttr)
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
		this.handleAttributeUpdated(allAttributes)
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
