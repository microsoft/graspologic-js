/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '../graph'
import { Bounds3D, Maybe } from '@graspologic/common'

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
				bounds.x.max = Math.max(bounds.x.min, bounds.x.max)
				bounds.x.min = Math.min(bounds.x.min, bounds.x.max)
				bounds.y.max = Math.max(bounds.y.min, bounds.y.max)
				bounds.y.min = Math.min(bounds.y.min, bounds.y.max)
				bounds.z.max = Math.max(bounds.z.min, bounds.z.max)
				bounds.z.min = Math.min(bounds.z.min, bounds.z.max)
			}
		}
		return bounds
	}
	return undefined
}
