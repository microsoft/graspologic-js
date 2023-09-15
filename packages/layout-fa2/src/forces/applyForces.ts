/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Node, NodeStore } from '@graspologic/graph'
import type { FA2Configuration, ForceMetrics } from '../types.js'

/**
 * @internal
 *
 * Applies the forces to the nodes to move them
 * @param nodes The node data
 * @param config The layout configuration
 * @param repulsion The repulsion amount
 * @param gravity The gravity amount
 * @param attraction
 * @returns The force metrics
 */
export function applyForces(
	nodes: NodeStore,
	config: FA2Configuration,
	// Force Metrics
	repulsion: number,
	gravity: number,
	attraction: number,
): ForceMetrics {
	let force
	let swinging
	let traction
	let nodespeed
	let totalTension = 0
	let totalSwing = 0
	let totalTraction = 0
	let node: Node
	let forceScale: number

	// MATH: sqrt and square distances
	for (node of nodes) {
		if (!node.fixed) {
			force = getForce(node)
			swinging = getSwing(node)
			traction = getTraction(node)

			// track global metrics
			totalTension += force
			totalSwing += swinging
			totalTraction += traction

			if (config.adjustSizes) {
				if (force > config.maxForce) {
					forceScale = config.maxForce / force
					node.dx *= forceScale
					node.dy *= forceScale
				}
				nodespeed = getNodeSpeed(0.1, traction, swinging)
			} else {
				nodespeed = getNodeSpeed(node.convergence, traction, swinging)
				// Updating node convergence
				node.convergence = getNodeConvergence(node, swinging, nodespeed)
			}

			moveNode(node, nodespeed / config.slowDown)
		}
	}
	return [
		totalTension,
		totalSwing,
		totalTraction,
		repulsion,
		gravity,
		attraction,
	]
}

function getNodeConvergence(
	node: Node,
	swinging: number,
	speed: number,
): number {
	return Math.min(
		1,
		Math.sqrt(
			(speed * (node.dx ** 2 + node.dy ** 2)) / (1 + Math.sqrt(swinging)),
		),
	)
}

function getNodeSpeed(
	convergence: number,
	traction: number,
	swinging: number,
): number {
	return (convergence * Math.log(1 + traction)) / (1 + Math.sqrt(swinging))
}

function moveNode(node: Node, factor: number): void {
	node.x += node.dx * factor
	node.y += node.dy * factor
}

function getSwing(node: Node): number {
	return (
		node.mass *
		Math.sqrt((node.old_dx - node.dx) ** 2 + (node.old_dy - node.dy) ** 2)
	)
}

function getTraction(node: Node): number {
	return (
		Math.sqrt((node.old_dx + node.dx) ** 2 + (node.old_dy + node.dy) ** 2) / 2
	)
}

function getForce(node: Node): number {
	return Math.sqrt(node.dx ** 2 + node.dy ** 2)
}
