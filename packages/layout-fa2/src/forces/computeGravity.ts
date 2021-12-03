/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node, NodeStore } from '@graspologic/graph'
import { FA2Configuration } from '../types'

/**
 * @internal
 *
 * Computes the gravity component of the FA2 algorithm
 * @param nodes The set of node data
 * @param config The layout configuration
 * @returns The total gravity in the system
 */
export function computeGravity(
	nodes: NodeStore,
	config: FA2Configuration,
): number {
	const g = config.gravity / config.scalingRatio
	const coefficient = config.scalingRatio
	let node: Node
	let distance: number
	let factor: number

	let totalGravity = 0

	for (node of nodes) {
		distance = Math.sqrt(node.x ** 2 + node.y ** 2)

		factor = 0
		if (config.strongGravityMode) {
			// strong gravity
			if (distance > 0) {
				factor = coefficient * node.mass * g
			}
		} else {
			// linear anti-collision repulsion
			if (distance > 0) {
				factor = (coefficient * node.mass * g) / distance
			}
		}

		totalGravity += distance * factor

		// Updating node's dx and dy
		node.dx -= node.x * factor
		node.dy -= node.y * factor
	}

	return totalGravity
}
