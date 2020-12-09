/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodesRenderableBase } from './NodesRenderableBase'
import {
	BoundedRenderable,
	Bounds3D,
	Maybe,
	Renderable,
	RenderConfiguration,
} from '@graspologic/common'
import { GraphContainer, Node } from '@graspologic/graph'

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export class NodesRenderable
	extends NodesRenderableBase
	implements BoundedRenderable, Renderable {
	private _graph: Maybe<GraphContainer>

	/**
	 * Constructor
	 * @param gl The gl context the nodes should be rendered to
	 * @param config The render configuration
	 * @param id The id of the renderable
	 */
	public constructor(
		gl: WebGLRenderingContext,
		protected config: RenderConfiguration,
		id?: string,
	) {
		super(gl, id)

		config.onNodeMinRadiusChanged(this.makeDirtyHandler)
		config.onNodeMaxRadiusChanged(this.makeDirtyHandler)
		config.onNodeOutlineChanged(this.makeDirtyHandler)
		config.onDrawNodesChanged(this.makeDirtyHandler)
		config.onHideNodesOnMoveChanged(this.makeDirtyHandler)
		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
	}

	/**
	 * Gets the currently bound graph
	 */
	public get graph() {
		return this._graph
	}

	/**
	 * Sets the graph
	 */
	public set graph(value: Maybe<GraphContainer>) {
		this._graph = value
		this.setData(value?.nodes)
		this.rebuildSaturation()
	}

	/**
	 * Computes the bounds of the nodes
	 */
	public computeBounds(): Bounds3D | undefined {
		let bounds: Bounds3D | undefined
		let hasWeights = false
		let node: Node
		let radius = 0
		if (this.graph) {
			for (node of this.graph.nodes.scan()) {
				radius = node.radius || 0
				if (!radius) {
					hasWeights = true
				}

				if (!bounds) {
					bounds = {
						x: {
							min: node.x - radius,
							max: node.x + radius,
						},
						y: {
							min: node.y - radius,
							max: node.y + radius,
						},
						z: {
							min: node.z - radius,
							max: node.z + radius,
						},
					}
				} else {
					bounds!.x.min = Math.min(bounds!.x.min, node.x - radius)
					bounds!.x.max = Math.max(bounds!.x.max, node.x + radius)

					bounds!.y.min = Math.min(bounds!.y.min, node.y - radius)
					bounds!.y.max = Math.max(bounds!.y.max, node.y + radius)

					bounds!.z.min = Math.min(bounds!.z.min, node.z - radius)
					bounds!.z.max = Math.max(bounds!.z.max, node.z + radius)
				}
			}
			const scale = hasWeights
				? this.config.nodeMaxRadius /
				  Math.min(this.config.width, this.config.height)
				: 0
			if (bounds) {
				const xWeightPadding = ((bounds.x.max - bounds.x.min) * scale) / 2.0
				const yWeightPadding = ((bounds.y.max - bounds.y.min) * scale) / 2.0
				return {
					x: {
						min: bounds.x.min - xWeightPadding,
						max: bounds.x.max + xWeightPadding,
					},
					y: {
						min: bounds.y.min - yWeightPadding,
						max: bounds.y.max + yWeightPadding,
					},
					z: {
						min: bounds.z.min - yWeightPadding,
						max: bounds.z.max + yWeightPadding,
					},
				}
			}
		}
	}

	/**
	 * Rebuilds the node saturation
	 */
	public rebuildSaturation = () => {
		if (this.graph) {
			const nodes = this.config.nodeFilteredIds
			const allIn =
				!nodes || nodes.length === 0 || nodes.length === this.graph.nodes.count

			const nodeInSat = this.config.nodeFilteredInSaturation
			const nodeOutSat = this.config.nodeFilteredOutSaturation

			// IMPORTANT: the (prim as <type>) stuff avoids an extra `const node = prim as Node` call
			// Performance shortcut for everything in / out
			if (allIn) {
				for (const node of this.graph.nodes.scan()) {
					node.saturation = nodeInSat
				}
			} else {
				const nodeMap = (nodes || []).reduce((prev, curr) => {
					prev[curr] = true
					return prev
				}, {} as Record<string, boolean>)
				for (const node of this.graph.nodes.scan()) {
					node.saturation = nodeMap[node.id! || ''] ? nodeInSat : nodeOutSat
				}
			}

			this.makeDirtyHandler()
		}
	}
}
