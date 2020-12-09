/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { EdgesRenderableBase } from './EdgesRenderableBase'
import {
	BoundedRenderable,
	Bounds3D,
	Maybe,
	processMinMaxBounds,
	Renderable,
	RenderConfiguration,
} from '@graspologic/common'
import { Edge, GraphContainer, Node } from '@graspologic/graph'

/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export class EdgesRenderable
	extends EdgesRenderableBase
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

		config.onDrawEdgesChanged(this.makeDirtyHandler)
		config.onHideEdgesOnMoveChanged(this.makeDirtyHandler)
		config.onEdgeConstantWidthChanged(this.makeDirtyHandler)
		config.onEdgeDepthWriteChanged(this.makeDirtyHandler)
		config.onEdgeAlphaChanged(this.makeDirtyHandler)
		config.onEdgeAntialiasChanged(this.makeDirtyHandler)
		config.onEdgeMinWidthChanged(this.makeDirtyHandler)
		config.onEdgeMaxWidthChanged(this.makeDirtyHandler)
		config.onNodeFilteredIdsChanged(this.rebuildSaturation)
		config.onNodeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredInSaturationChanged(this.rebuildSaturation)
		config.onEdgeFilteredOutSaturationChanged(this.rebuildSaturation)
	}

	/**
	 * Returns true if edges behind other edges should not be rendered
	 */
	protected get edgeDepthWrite(): boolean {
		return this.config.edgeDepthWrite
	}

	/**
	 * Returns true if the edges should be rendered using a constant width
	 */
	protected get edgeConstantWidth(): boolean {
		return this.config.edgeConstantWidth
	}

	/**
	 * Returns the min edge with
	 */
	protected get edgeMinWidth(): number {
		return this.config.edgeMinWidth
	}

	/**
	 * Returns the max edge with
	 */
	protected get edgeMaxWidth(): number {
		return this.config.edgeMaxWidth
	}

	/**
	 * Returns the alpha used for the edges
	 */
	protected get edgeAlpha(): number {
		return this.config.edgeAlpha
	}

	/**
	 * Returns true if edges should be anti-aliased
	 */
	protected get edgeAntialias(): boolean {
		return this.config.edgeAntialias
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
		this.setData(value?.edges)
		this.rebuildSaturation()
	}

	/**
	 * Computes the bounds of the edges
	 */
	public computeBounds(): Bounds3D | undefined {
		let bounds: Bounds3D | undefined
		// Below is a little more complicated to allow us to set the initial bounds
		// to the first primitives bounds, without doing a "first" check each time
		if (this.graph) {
			const iterator = this.graph.edges[Symbol.iterator]()
			if (iterator) {
				let result = iterator.next()
				if (result.value) {
					bounds = this.computeEdgeBounds(result.value)
				}
				while (!result.done) {
					const primBounds = this.computeEdgeBounds(result.value)

					processMinMaxBounds(bounds!, primBounds)

					result = iterator.next()
				}
			}
		}
		return bounds
	}

	/**
	 * Computes the given edges bounds
	 * @param edge The edge to compute the bounds for
	 */
	private computeEdgeBounds(edge: Edge) {
		const source = edge.sourcePosition
		const target = edge.targetPosition
		const rangeX =
			source[0] < target[0] ? [source[0], target[0]] : [target[0], source[0]]
		const rangeY =
			source[1] < target[1] ? [source[1], target[1]] : [target[1], source[1]]
		const rangeZ =
			source[2]! < target[2]! ? [source[2], target[2]] : [target[2], source[2]]
		return {
			x: {
				min: rangeX[0],
				max: rangeX[1],
			},
			y: {
				min: rangeY[0],
				max: rangeY[1],
			},
			z: {
				min: rangeZ[0]!,
				max: rangeZ[1]!,
			},
		}
	}

	/**
	 * Rebuilds the edge saturation
	 */
	public rebuildSaturation = () => {
		if (this.graph) {
			const nodes = this.config.nodeFilteredIds
			const allIn =
				!nodes || nodes.length === 0 || nodes.length === this.graph.nodes.count

			const edgeInSat = this.config.edgeFilteredInSaturation
			const edgeOutSat = this.config.edgeFilteredOutSaturation

			if (allIn) {
				for (const edge of this.graph.edges.scan()) {
					edge.saturation = edgeInSat
					edge.saturation2 = edgeInSat
				}
			} else {
				const nodeMap = (nodes || []).reduce((prev, curr) => {
					prev[curr] = true
					return prev
				}, {} as Record<string, boolean>)
				for (const edge of this.graph.edges.scan()) {
					edge.saturation = !!nodeMap[edge.source!] ? edgeInSat : edgeOutSat
					edge.saturation2 = !!nodeMap[edge.target!] ? edgeInSat : edgeOutSat
				}
			}
		}
	}
}
