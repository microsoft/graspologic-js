/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	randBetween,
	createBGRAColorizer,
	correctColor,
	NodeColorizer,
	NodeSizer,
	NodeWeighter,
	NodePositioner,
	positionNode,
} from '../helpers'
import { Node, Edge } from '../primitives'
import { GraphContainer } from './GraphContainer'
import { InputGraph, InputNode } from './types'

/**
 * The set of graph options to intern a pojo graph into a GraphContainer
 */
export interface InternGraphOptions {
	/**
	 * A flag indicating to use SharedArrayBuffer memory,
	 *
	 * @defaultValue true
	 */
	shareable: boolean

	/**
	 * If present, randomizes non-existing node positions within the given range.
	 * Arg=[minx, maxx, miny, maxy]
	 */
	randomize: [number, number, number, number] | undefined

	/**
	 * A colorizing function to color each node
	 */
	colorizer: NodeColorizer | undefined

	/**
	 * A sizing function to size each node
	 */
	sizer: NodeSizer | undefined

	/**
	 * A weighting function to weight each node
	 */
	weighter: NodeWeighter | undefined

	/**
	 * A position function to position each node
	 */
	positioner: NodePositioner | undefined

	/**
	 * The default value to use when edge weights are not present.
	 *
	 * @defaultValue 1
	 */
	defaultEdgeWeight: number

	/**
	 * If the weights in the graph should be normalized from 0 - 1
	 * @defaultValue true
	 */
	normalizeWeights: boolean
}

export const DEFAULT_INTERN_GRAPH_OPTIONS: InternGraphOptions = Object.freeze({
	randomize: undefined,
	colorizer: undefined,
	positioner: undefined,
	sizer: undefined,
	weighter: undefined,
	defaultEdgeWeight: 1,
	normalizeWeights: true,
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
	options: Partial<InternGraphOptions> = DEFAULT_INTERN_GRAPH_OPTIONS,
): GraphContainer {
	const graph = GraphContainer.create(
		input.nodes.length,
		input.edges.length,
		options.shareable,
	)
	const nodeIdToIndex = processNodes(input, graph, options)
	processEdges(input, nodeIdToIndex, graph, options)
	return graph
}

/**
 * Processes the nodes from the input graph
 * @param input The input graph
 * @param output The output graph
 * @param options The inter graph options
 */
function processNodes(
	input: InputGraph,
	output: GraphContainer,
	{
		sizer = DEFAULT_INTERN_GRAPH_OPTIONS.sizer,
		weighter = DEFAULT_INTERN_GRAPH_OPTIONS.weighter,
		colorizer: optionalColorizer = DEFAULT_INTERN_GRAPH_OPTIONS.colorizer,
		randomize = DEFAULT_INTERN_GRAPH_OPTIONS.randomize,
		normalizeWeights = DEFAULT_INTERN_GRAPH_OPTIONS.normalizeWeights,
		positioner = DEFAULT_INTERN_GRAPH_OPTIONS.positioner,
	}: Partial<InternGraphOptions>,
): Map<string, number> {
	const colorizer = optionalColorizer
		? createBGRAColorizer(optionalColorizer)
		: undefined

	let i = 0
	const nodeIdToIndex = new Map<string, number>()
	let maxWeight = Number.MIN_SAFE_INTEGER
	let minWeight = Number.MAX_SAFE_INTEGER

	if (input.nodes.length > 0) {
		let node: Node
		let inputNode: InputNode
		i = 0
		for (node of output.nodes.scan()) {
			if (i >= input.nodes.length) {
				break
			}
			inputNode = input.nodes[i]

			if (input.edges.length > 0) {
				nodeIdToIndex.set(inputNode.id, i)
			}

			node.connect(i, output.nodes)
			node.load(inputNode)

			if (sizer) {
				node.size = sizer(node.id, node.group)
			}

			if (weighter) {
				node.weight = weighter(node.id, node.group)
			}

			if (positioner) {
				positionNode(node, positioner)
			}

			if (randomize && node.x === 0 && node.y === 0) {
				node.x = randBetween(randomize[0], randomize[1])
				node.y = randBetween(randomize[2], randomize[3])
			}
			++i

			if (normalizeWeights) {
				maxWeight = Math.max(maxWeight, node.weight)
				minWeight = Math.min(minWeight, node.weight)
			}

			if (colorizer) {
				node.color = correctColor(node.color || colorizer(node.id, node.group))
			}
		}
	}
	if (normalizeWeights) {
		normalizeNodeWeights(output, minWeight, maxWeight)
	}
	return nodeIdToIndex
}

/**
 * Processes the edges from the input graph
 * @param input The input graph
 * @param nodeIdToIndex The mapping of node ids to indices
 * @param output The output graph
 * @param options The inter graph options
 */
function processEdges(
	input: InputGraph,
	nodeIdToIndex: Map<string, number>,
	output: GraphContainer,
	{
		defaultEdgeWeight = DEFAULT_INTERN_GRAPH_OPTIONS.defaultEdgeWeight,
		normalizeWeights = DEFAULT_INTERN_GRAPH_OPTIONS.normalizeWeights,
	}: Partial<InternGraphOptions>,
) {
	let maxWeight = Number.MIN_SAFE_INTEGER
	let minWeight = Number.MAX_SAFE_INTEGER
	if (input.edges.length > 0) {
		let edge: Edge
		let i = 0

		// We're not too worried about this right yet
		const reusableNode = output.nodes.itemAt(0)
		for (edge of output.edges.scan()) {
			if (i >= input.edges.length) {
				break
			}

			edge.connect(i, output.edges)

			// Load data into the output edge
			edge.load(input.edges[i], nodeIdToIndex, defaultEdgeWeight)

			// Update colors and positions for the edges based on the nodes in the graph
			reusableNode.connect(edge.sourceIndex, output.nodes)
			edge.color = correctColor(edge.color || reusableNode.color || 0)
			edge.sourcePosition = reusableNode.position

			// Update the node to the target idx
			reusableNode.connect(edge.targetIndex, output.nodes)
			edge.color2 = correctColor(
				edge.color2 || edge.color || reusableNode.color || 0,
			)
			edge.targetPosition = reusableNode.position

			if (normalizeWeights) {
				maxWeight = Math.max(maxWeight, edge.weight!)
				minWeight = Math.min(minWeight, edge.weight!)
			}
			++i
		}
	}

	if (normalizeWeights) {
		normalizeEdgeWeights(output, minWeight, maxWeight)
	}
}

/**
 * Normalizes the nodes weights using the __minWeight__ and __maxWeight__
 * @param data The graph data
 * @param minWeight The min weight for the nodes
 * @param maxWeight The max weight for the nodes
 */
function normalizeNodeWeights(
	data: GraphContainer,
	minWeight: number,
	maxWeight: number,
) {
	const nodeWeightDiff = maxWeight - minWeight
	let computeNodeWeight: (input: number) => number
	if (nodeWeightDiff === 0 || isNaN(nodeWeightDiff)) {
		computeNodeWeight = () => 0.5
	} else {
		const minNodeWeight = minWeight
		computeNodeWeight = (value: number) =>
			(value - minNodeWeight) / nodeWeightDiff
	}

	let node: Node
	for (node of data.nodes.scan()) {
		node.weight = computeNodeWeight(node.weight || 0)
	}
}

/**
 * Normalizes the edge weights using the __minWeight__ and __maxWeight__
 * @param data The graph data
 * @param minWeight The min weight for the edges
 * @param maxWeight The max weight for the edges
 */
function normalizeEdgeWeights(
	data: GraphContainer,
	minWeight: number,
	maxWeight: number,
) {
	const edgeWeightDiff = maxWeight - minWeight
	let computeEdgeWeight
	if (edgeWeightDiff === 0) {
		computeEdgeWeight = () => 0.5
	} else {
		const minEdgeWeight = minWeight
		computeEdgeWeight = (value: number) =>
			(value - minEdgeWeight) / edgeWeightDiff
	}

	let edge: Edge
	for (edge of data.edges.scan()) {
		edge.trueWeight = edge.weight || 0
		edge.weight = computeEdgeWeight(edge.weight === undefined ? 1 : edge.weight)
	}
}
