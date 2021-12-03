/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Bounds3D, Maybe } from '@graspologic/common'
import { GraphContainer } from '../graph'

/**
 * Computes the bounds of the given graph
 * @param graph The graph to compute the bounds from
 */
export function computeBounds(graph: GraphContainer): Maybe<Bounds3D> {
	if (graph) {
		let bounds: Bounds3D | undefined
		for (const node of graph.nodes) {
			if (!bounds) {
				bounds = {
					x: {
						min: node.x,
						max: node.x,
					},
					y: {
						min: node.y,
						max: node.y,
					},
					z: {
						min: node.z,
						max: node.z,
					},
				}
			} else {
				bounds.x.min = Math.min(node.x, bounds.x.min)
				bounds.x.max = Math.max(node.x, bounds.x.max)
				bounds.y.min = Math.min(node.y, bounds.y.min)
				bounds.y.max = Math.max(node.y, bounds.y.max)
				bounds.z.min = Math.min(node.z, bounds.z.min)
				bounds.z.max = Math.max(node.z, bounds.z.max)
			}
		}
		return bounds
	}
	return undefined
}
