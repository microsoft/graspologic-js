/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Node } from '@graspologic/graph'
import type { FA2Configuration } from '../../types.js'

/**
 * @internal
 *
 * Computes the repulsion between the two given nodes
 * @param n1 The first node
 * @param n2 The second node
 * @returns The amount of repulsion
 */
export function computeNodeRepulsion(
	n1: Node,
	n2: Node,
	config: FA2Configuration,
): number {
	const coefficient = config.scalingRatio

	// Common to both methods
	const xDist = n1.x - n2.x
	const yDist = n1.y - n2.y
	const massCoeff = coefficient * n1.mass * n2.mass
	let distance = 0
	let factor = 0
	let xdf: number
	let ydf: number
	if (config.adjustSize) {
		//-- Anticollision Linear Repulsion
		distance = Math.sqrt(xDist ** 2 + yDist ** 2) - n1.size - n2.size

		if (distance > 0) {
			// Updating nodes' dx and dy
			factor = massCoeff / distance ** 2
			xdf = xDist * factor
			ydf = yDist * factor
			n1.dx += xdf
			n1.dy += ydf
			n2.dx -= xdf
			n2.dy -= ydf
		} else if (distance < 0) {
			// Updating nodes' dx and dy
			factor = 100 * massCoeff
			xdf = xDist * factor
			ydf = yDist * factor
			n1.dx += xdf
			n1.dy += ydf
			n2.dx -= xdf
			n2.dy -= ydf
		} else {
			console.log('Zero Distance 2')
		}
	} else {
		//-- Linear Repulsion
		distance = Math.sqrt(xDist ** 2 + yDist ** 2)
		if (distance > 0) {
			// Updating nodes' dx and dy
			factor = massCoeff / distance ** 2
			xdf = xDist * factor
			ydf = yDist * factor
			n1.dx += xdf
			n1.dy += ydf
			n2.dx -= xdf
			n2.dy -= ydf
		} else {
			// hit often
			// console.log("Zero Distance 1")
		}
	}
	return 0
}
