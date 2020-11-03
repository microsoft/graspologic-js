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
	const nodeIdToIndex: Record<string, number> = {}
	const nodeIndexToId: Record<number, string> = {}

	let i: number = 0
	let inputNode: InputNode

	// NodeImpl.loadStore(graph.nodes, input.nodes)

	const store = graph.nodes
	let propertyBag: any
	let itemByteOffset: number
	let itemWordOffset: number
	const { typedOffset: positionTypedOffset } = store.store.layout.get('position')!
	const { typedOffset: radiusTypedOffset } = store.store.layout.get('radius')!
	const { typedOffset: shapeTypedOffset } = store.store.layout.get('shape')!
	const { typedOffset: weightTypedOffset } = store.store.layout.get('weight')!
	const { typedOffset: colorTypedOffset } = store.store.layout.get('color')!
	const floatArray = store.store.float32Array
	const uint8Array = store.store.uint8Array
	const uint32Array = store.store.uint32Array
	const bpi = store.store.bytesPerItem

	let x: number
	let y: number
	for (let i = 0; i < input.nodes.length; ++i) {
		inputNode = input.nodes[i]

		itemByteOffset = i * bpi
		itemWordOffset = itemByteOffset / 4

		nodeIdToIndex[inputNode.id] = i
		nodeIndexToId[i] = inputNode.id

		propertyBag = store.propertyBags[i] || {}
		store.propertyBags[i] = propertyBag

		propertyBag.id = inputNode.id
		propertyBag.group = inputNode.group
		propertyBag.label = inputNode.label

		x = inputNode.x || 0
		y = inputNode.y || 0

		if (randomize && x === 0 && y === 0) {
			x = randBetween(randomize[0], randomize[1])
			y = randBetween(randomize[2], randomize[3])
		}

		floatArray[itemWordOffset + radiusTypedOffset] = inputNode.size || inputNode.radius || 0
		floatArray[itemWordOffset + positionTypedOffset] = x
		floatArray[itemWordOffset + positionTypedOffset + 1] = y
		floatArray[itemWordOffset + positionTypedOffset + 2] = inputNode.z || 0
		floatArray[itemWordOffset + weightTypedOffset] = inputNode.weight || 1
		uint32Array[itemWordOffset + colorTypedOffset] = inputNode.color || 0
		uint8Array[itemByteOffset + shapeTypedOffset] = parseShape(inputNode.shape)
	}

	i = 0
	let edge: Edge
	let inputEdge: InputEdge
	for (edge of graph.edges.efficientIterator()) {
		inputEdge = input.edges[i]

		edge.source = inputEdge.source
		edge.target = inputEdge.target

		edge.sourceIndex = nodeIdToIndex[inputEdge.source]
		edge.targetIndex = nodeIdToIndex[inputEdge.target]

		edge.weight =
			inputEdge.weight != null ? inputEdge.weight : defaultEdgeWeight

		edge.color = inputEdge.color || inputEdge.sourceColor || 0
		edge.color2 = inputEdge.color2 || inputEdge.targetColor || 0

		++i
	}

	graph.idMap = nodeIndexToId
	return graph
}

/**
 * Parses a Shape from an unparsed shape value
 * @param unparsedShape
 */
function parseShape(unparsedShape?: Shape | string): Shape {
	if (typeof unparsedShape === 'string') {
		unparsedShape = unparsedShape.toLocaleLowerCase()
		if (unparsedShape === 'square') {
			return Shape.Square
		} else if (unparsedShape === 'diamond') {
			return Shape.Diamond
		}
	} else if (
		unparsedShape === Shape.Square || 
		unparsedShape === Shape.Diamond ||
		unparsedShape === Shape.Circle
	) {
		return unparsedShape as Shape
	}
	return Shape.Circle
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
