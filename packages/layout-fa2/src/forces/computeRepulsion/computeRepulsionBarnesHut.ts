/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node, QuadTree, NodeStore } from '@graspologic/graph'
import { FA2Configuration } from '../../types'
import { computeNodeRepulsion } from './computeNodeRepulsion'

/**
 * @internal
 *
 * Computes repulsion using the Barnes Hut algorithm
 * @param nodes The set of nodes
 * @param config The force atlas 2 configuration
 * @returns The amount of repulsion in the graph
 */
export function computeRepulsionBarnesHut(
	nodes: NodeStore,
	config: FA2Configuration,
): number {
	const qt = new QuadTree([...nodes])

	let node: Node
	let result = 0
	for (node of nodes) {
		result += applyQuadTreeRepulsion(qt, node, config)
	}
	return result
}

/**
 * Applies repulsion to the given node using the quad tree
 * @param root The root tree
 * @param n1 The current node
 * @param config The force atlas 2 configuration
 */
function applyQuadTreeRepulsion(
	root: QuadTree,
	n1: Node,
	config: FA2Configuration,
) {
	root.visit(qt => {
		if (qt.isLeaf) {
			if (qt.node) {
				computeNodeRepulsion(n1, qt.node, config)
			}
			return true
		}
		const xDist = n1.x - qt.cx
		const yDist = n1.y - qt.cy
		const distance = Math.sqrt(xDist ** 2 + yDist ** 2)
		const applyQuadForce = qt.size / distance < config.barnesHutTheta

		if (applyQuadForce) {
			const coefficient = config.scalingRatio
			const massCoeff = coefficient * n1.mass * qt.mass

			//-- Linear Repulsion
			if (distance > 0) {
				// Updating nodes' dx and dy
				const factor = massCoeff / distance ** 2
				n1.dx += xDist * factor
				n1.dy += yDist * factor
				// repulsionApplied += distance * factor
			} else {
				console.log('Zero Distance 3')
			}
		}

		return applyQuadForce
	})
	return 0
}
