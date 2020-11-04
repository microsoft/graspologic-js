/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { randBetween } from '../helpers'
import {
	Node,
	Edge,
	createNodeStore,
	createEdgeStore,
	Shape,
	NodeImpl,
} from '../primitives'
import { GraphContainer } from './GraphContainer'
import { InputGraph, InputEdge, InputNode } from './types'

/**
 * The set of graph options to intern a pojo graph into a GraphContainer
 */
export interface InternGraphOptions {
	/**
	 * A flag indicating to use SharedArrayBuffer memory,
	 *
	 * @defaultValue true
	 */
	shareable?: boolean

	/**
	 * If present, randomizes non-existing node positions within the given range.
	 * Arg=[minx, maxx, miny, maxy]
	 */
	randomize?: [number, number, number, number]

	/**
	 * The default value to use when edge weights are not present.
	 *
	 * @defaultValue 1
	 */
	defaultEdgeWeight?: number
}

export const DEFAULT_INTERN_GRAPH_OPTIONS = Object.freeze({
	defaultEdgeWeight: 1,
	shareable: true,
})

/**
 * @internal
 *
 * Interns a raw graph into a GraphContainer, used by graspologic
 * @param input A raw input graph
 * @param options: internization options
 * @returns The GraphContainer
 */
export function internGraph(
	input: InputGraph,
	{
		shareable = DEFAULT_INTERN_GRAPH_OPTIONS.shareable,
		randomize,
		defaultEdgeWeight = DEFAULT_INTERN_GRAPH_OPTIONS.defaultEdgeWeight,
	}: Partial<InternGraphOptions> = DEFAULT_INTERN_GRAPH_OPTIONS,
): GraphContainer {
	const graph = getEmptyGraphContainer(
		input.nodes.length,
		input.edges.length,
		shareable,
	)

	let i: number = 0
	const nodeIdToIndex = new Map<string, number>()

	if (input.nodes.length > 0) {
		let inputNode: InputNode
		let node: Node = graph.nodes.itemAt(0)
		i = 0
		for (inputNode of input.nodes) {
			nodeIdToIndex.set(inputNode.id, i)
			node.connect(i, graph.nodes)
			node.load(inputNode) 
			if (randomize && node.x === 0 && node.y === 0) {
				node.x = randBetween(randomize[0], randomize[1])
				node.y = randBetween(randomize[2], randomize[3])
			}
			++i
		}
	}

	if (input.edges.length > 0) {
		let edge: Edge = graph.edges.itemAt(0)
		let inputEdge: InputEdge
		i = 0
		for (inputEdge of input.edges) {
			edge.connect(i, graph.edges)
			edge.load(inputEdge, nodeIdToIndex, defaultEdgeWeight) 
			++i
		}
	}
	return graph
}

/**
 * Creates an empty graph container
 * @param numNodes The number of nodes to preallocate
 * @param numEdges The number of edges to preallocate
 * @param shareable Whether to use shared-memory
 * @returns An empty graph container
 */
function getEmptyGraphContainer(
	numNodes: number,
	numEdges: number,
	shareable = true,
): GraphContainer {
	return new GraphContainer(
		createNodeStore({
			capacity: numNodes,
			shared: shareable,
			allocatedOnCreate: true,
		}),
		createEdgeStore({
			capacity: numEdges,
			shared: shareable,
			allocatedOnCreate: true,
		}),
	)
}
