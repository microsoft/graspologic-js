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
	const nodeIdToIndex: Record<string, number> = {}
	const nodeIndexToId: Record<number, string> = {}

	let i: number
	let inputNode: InputNode
	let node: Node
	let size: number | undefined
	for (i = 0; i < input.nodes.length; ++i) {
		inputNode = input.nodes[i]
		node = graph.nodes.itemAt(i)

		nodeIdToIndex[inputNode.id] = i
		nodeIndexToId[i] = inputNode.id
		node.id = inputNode.id
		node.community = inputNode.category || 0

		// A default size of 0 is important.  If 0, weight will be used to scale the node
		size = inputNode.size || inputNode.radius
		node.size = size != null ? size : 0
		node.x = inputNode.x || 0
		node.y = inputNode.y || 0
		node.z = inputNode.z || 0
		node.label = inputNode.label
		node.group = inputNode.group
		node.weight = inputNode.weight || 1
		node.color = inputNode.color || 0
		node.shape = parseShape(inputNode.shape)

		if (randomize && node.x === 0 && node.y === 0) {
			node.x = randBetween(randomize[0], randomize[1])
			node.y = randBetween(randomize[2], randomize[3])
		}
	}

	let inputEdge: InputEdge
	let edge: Edge
	for (i = 0; i < input.edges.length; ++i) {
		inputEdge = input.edges[i]
		edge = graph.edges.itemAt(i)

		edge.source = inputEdge.source
		edge.target = inputEdge.target

		edge.sourceIndex = nodeIdToIndex[inputEdge.source]
		edge.targetIndex = nodeIdToIndex[inputEdge.target]

		edge.weight =
			inputEdge.weight != null ? inputEdge.weight : defaultEdgeWeight

		edge.color = inputEdge.color || inputEdge.sourceColor || 0
		edge.color2 = inputEdge.color2 || inputEdge.targetColor || 0
	}

	graph.idMap = nodeIndexToId
	return graph
}

/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */
function parseShape(unparsedShape?: Shape | string): Shape {
	let shape = Shape.Circle
	if (
		(typeof unparsedShape === 'number' && unparsedShape === Shape.Diamond) ||
		unparsedShape === Shape.Square
	) {
		shape = unparsedShape as Shape
	} else if (typeof unparsedShape === 'string') {
		unparsedShape = unparsedShape.toLocaleLowerCase()
		if (unparsedShape === 'square') {
			shape = Shape.Square
		} else if (unparsedShape === 'diamond') {
			shape = Shape.Diamond
		}
	}
	return shape
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
