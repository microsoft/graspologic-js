/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	AnimatableNode,
	AnimatableEdge,
	Edge,
	Node,
	Pos3D,
} from '../primitives'
import { GraphContainer } from './GraphContainer'
import { PositionMap } from './types'
import { Primitive } from '@graspologic/common'

/**
 * Changes the positions of the nodes in the graph
 * @param graph The graph to change
 * @param newPositions The new positions of the nodes
 * @param duration The duration of the tween
 */
export function changePositions(
	graph: GraphContainer,
	newPositions: PositionMap,
	duration = 0,
) {
	const nodesSupportAnim = graph.nodes.store.config.animation !== false
	const edgesSupportAnim = graph.edges.store.config.animation !== false
	let nodePos: { x: number; y: number; z?: number }
	const animateNodePosition = nodesSupportAnim
		? (prim: Primitive, newPos: Pos3D) => {
				;(prim as AnimatableNode).animatePosition(newPos, duration)
		  }
		: (prim: Node, newPos: Pos3D) => {
				prim.position = newPos
		  }
	const animateSourcePosition = edgesSupportAnim
		? (prim: Edge, newPos: Pos3D) => {
				;(prim as AnimatableEdge).animateSourcePosition(newPos, duration)
		  }
		: (prim: Edge, newPos: Pos3D) => {
				prim.sourcePosition = newPos
		  }
	const animateTargetPosition = edgesSupportAnim
		? (prim: Edge, newPos: Pos3D) => {
				;(prim as AnimatableEdge).animateTargetPosition(newPos, duration)
		  }
		: (prim: Edge, newPos: Pos3D) => {
				prim.targetPosition = newPos
		  }

	const position: [number, number, number] = [0, 0, 0]

	// I'm doing (prim as Edge) below, instead of assigning it a variable
	// as it is no additional memory cost at runtime
	for (const node of graph.nodes.scan()) {
		nodePos = newPositions[node.id || '']
		if (nodePos) {
			position[0] = nodePos.x
			position[1] = nodePos.y
			position[2] = nodePos.z || 0
			animateNodePosition(node as Node, position)
		}
	}

	for (const edge of graph.edges.scan()) {
		nodePos = newPositions[edge.source!]
		if (nodePos) {
			position[0] = nodePos.x
			position[1] = nodePos.y
			position[2] = nodePos.z || 0
			animateSourcePosition(edge, position)
		}
		nodePos = newPositions[edge.target!]
		if (nodePos) {
			position[0] = nodePos.x
			position[1] = nodePos.y
			position[2] = nodePos.z || 0
			animateTargetPosition(edge, position)
		}
	}
}
