/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Edge, Node, NodeStore, EdgeStore } from '@graspologic/graph'
import { FA2Configuration } from '../types'

/**
 * @internal
 *
 * Computes the attraction component of the FA2 algorithm
 * @param nodes The set of node data
 * @param edges The set of edge data
 * @param config The layout configuration
 * @returns The total scaled distance in the graph
 */
export function computeAttraction(
	nodes: NodeStore,
	edges: EdgeStore,
	config: FA2Configuration,
): number {
	const coefficient =
		1 *
		(config.outboundAttractionDistribution
			? getOutboundAttCompensation(nodes, config)
			: 1)

	// TODO: simplify distance
	// TODO: coefficient is always used as -c --> optimize?
	let edge: Edge
	let source: Node
	let target: Node
	// edge weight
	let w: number
	// edge weight influence
	let ewc: number
	let xDist: number
	let yDist: number
	let distance: number
	let factor = 0

	let result = 0
	for (edge of edges) {
		// Get the edge and nodes on the edge
		source = nodes.itemAt(edge.sourceIndex)
		target = nodes.itemAt(edge.targetIndex)

		// Compute necessary values
		w = edge.weight
		ewc = Math.pow(w, config.edgeWeightInfluence)
		xDist = source.x - target.x
		yDist = source.y - target.y

		// Applying attraction to nodes
		if (config.adjustSizes) {
			distance = Math.sqrt(xDist ** 2 + yDist ** 2 - source.size - target.size)

			if (config.linLogMode) {
				if (config.outboundAttractionDistribution) {
					//-- LinLog Degree Distributed Anti-collision Attraction
					if (distance > 0) {
						factor =
							(-coefficient * ewc * Math.log(1 + distance)) /
							distance /
							source.mass
					}
				} else {
					//-- LinLog Anti-collision Attraction
					if (distance > 0) {
						factor = (-coefficient * ewc * Math.log(1 + distance)) / distance
					}
				}
			} else {
				if (config.outboundAttractionDistribution) {
					//-- Linear Degree Distributed Anti-collision Attraction
					if (distance > 0) {
						factor = (-coefficient * ewc) / source.mass
					}
				} else {
					//-- Linear Anti-collision Attraction
					if (distance > 0) {
						factor = -coefficient * ewc
					}
				}
			}
		} else {
			distance = Math.sqrt(xDist ** 2 + yDist ** 2)

			if (config.linLogMode) {
				if (config.outboundAttractionDistribution) {
					//-- LinLog Degree Distributed Attraction
					if (distance > 0) {
						factor =
							(-coefficient * ewc * Math.log(1 + distance)) /
							distance /
							source.mass
					}
				} else {
					//-- LinLog Attraction
					if (distance > 0)
						factor = (-coefficient * ewc * Math.log(1 + distance)) / distance
				}
			} else {
				if (config.outboundAttractionDistribution) {
					//-- Linear Attraction Mass Distributed
					// NOTE: Distance is set to 1 to override next condition
					distance = 1
					factor = (-coefficient * ewc) / source.mass
				} else {
					//-- Linear Attraction
					// NOTE: Distance is set to 1 to override next condition
					distance = 1
					factor = -coefficient * ewc
				}
			}
		}

		// Updating nodes' dx and dy
		// TODO: if condition or factor = 1?
		if (distance > 0) {
			// Updating nodes' dx and dy
			source.dx += xDist * factor
			source.dy += yDist * factor
			target.dx -= xDist * factor
			target.dy -= yDist * factor
			result += distance * factor
		}
	}
	return result
}

function getOutboundAttCompensation(
	nodes: NodeStore,
	config: FA2Configuration,
) {
	let outboundAttCompensation = 0
	// If outbound attraction distribution, compensate
	if (config.outboundAttractionDistribution) {
		outboundAttCompensation = 0
		let node: Node
		for (node of nodes) {
			outboundAttCompensation += node.mass
		}
		outboundAttCompensation /= nodes.count
	}
	return outboundAttCompensation
}
