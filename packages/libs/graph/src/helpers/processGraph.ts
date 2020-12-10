/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '../graph'
import { AnimatableEdge, AnimatableNode, Edge, Node } from '../primitives'
import {
	NodeSizer,
	NodeWeighter,
	EdgeWeighter,
	NodePositioner,
	NodeColorizer,
	AnimatableNodeOperation,
	NodeBGRAColorizer,
	NodeOperation,
} from './types'

const DEFAULT_NAME = 'DEFAULT'

/**
 * Applies a sizing function to the graph
 * @param graph The graph to size
 * @param sizeFn The function to use to size the graph
 */
export function sizeGraph(graph: GraphContainer, sizeFn?: NodeSizer) {
	if (sizeFn) {
		for (const node of graph.nodes.scan()) {
			node.size = sizeFn(node.id, node.group)
		}
	}
}

/**
 * Applies a weight function to the graph
 * @param graph The graph to weight
 * @param nodeWeightFn The function to use to weight the nodes in the graph
 * @param edgeWeightFn The function to use to weight the edges in the graph
 */
export function weightGraph(
	graph: GraphContainer,
	nodeWeightFn?: NodeWeighter,
	edgeWeightFn?: EdgeWeighter,
) {
	if (nodeWeightFn) {
		for (const node of graph.nodes.scan()) {
			node.weight = nodeWeightFn(node.id, node.group)
		}
	}
	if (edgeWeightFn) {
		for (const edge of graph.edges.scan()) {
			edge.trueWeight = edge.weight = edgeWeightFn(edge.id)
		}
	}
}

/**
 * Applies a position function to the graph
 * @param graph The graph to position
 * @param positionFn The function to use to position the graph
 * @param updateEdges If edges should be updated to match the node positions
 */
export function positionGraph(
	graph: GraphContainer,
	positionFn?: NodePositioner,
	updateEdges = true,
) {
	if (positionFn) {
		for (const node of graph.nodes.scan()) {
			positionNode(node, positionFn)
		}

		if (updateEdges && graph.edges.count > 0) {
			const reusableNode = graph.nodes.itemAt(0)
			let edge: Edge
			for (edge of graph.edges.scan()) {
				if ((edge as Partial<AnimatableEdge>).animateSourcePosition) {
					reusableNode.connect(edge.sourceIndex, graph.nodes)
					;(edge as AnimatableEdge).animateSourcePositionComponents(
						reusableNode.x,
						reusableNode.y,
						reusableNode.z,
						positionFn.duration,
					)

					reusableNode.connect(edge.targetIndex, graph.nodes)
					;(edge as AnimatableEdge).animateTargetPositionComponents(
						reusableNode.x,
						reusableNode.y,
						reusableNode.z,
						positionFn.duration,
					)
				} else {
					reusableNode.connect(edge.sourceIndex, graph.nodes)
					edge.sourcePosition = reusableNode.position

					reusableNode.connect(edge.targetIndex, graph.nodes)
					edge.targetPosition = reusableNode.position
				}
			}
		}
	}
}

/**
 * Applies a colorizer function to the graph
 * @param graph The graph to colorize
 * @param colorizerFn The function to use to color the graph
 */
export function colorizeGraph(
	graph: GraphContainer,
	colorizerFn?: NodeColorizer,
) {
	const colorizer = createBGRAColorizer(colorizerFn)
	const nodeColors = new Map<string, number>()
	const edgeCount = graph.edges.count
	for (const node of graph.nodes.scan()) {
		colorNode(node, colorizer)
		if (edgeCount > 0) {
			nodeColors.set(node.id || DEFAULT_NAME, node.color)
		}
	}

	if (edgeCount > 0) {
		let nodeColor: number | undefined
		for (const edge of graph.edges.scan()) {
			nodeColor = nodeColors.get(edge.source!)
			if (nodeColor != null) {
				edge.color = nodeColor
			}
			nodeColor = nodeColors.get(edge.target!)
			if (nodeColor != null) {
				edge.color2 = nodeColor
			}
		}
	}
}

/**
 * Positions a node using the position fn
 * @param node The node to position
 * @param positionFn The position function to use
 */
export function positionNode(node: Node, positionFn: NodePositioner) {
	// Does the node support animation
	if ((node as Partial<AnimatableNode>).animatePositionComponents) {
		// Animate it
		;(node as AnimatableNode).animatePositionComponents(
			positionFn.x(node.id, node.group),
			positionFn.y(node.id, node.group),
			positionFn.z ? positionFn.z(node.id, node.group) : 0,
			positionFn.duration,
		)
	} else {
		// Just set the position
		node.x = positionFn.x(node.id, node.group)
		node.y = positionFn.y(node.id, node.group)
		if (positionFn.z) {
			node.z = positionFn.z(node.id, node.group)
		}
	}
}

/**
 * Colors a node using the color fn
 * @param node The node to color
 * @param colorFn The color function to use
 */
export function colorNode(node: Node, colorFn: NodeBGRAColorizer) {
	// Is it a AnimatableNodeOperation
	if ((colorFn as Partial<AnimatableNodeOperation<number>>).value) {
		// Does the node support animation
		if ((node as Partial<AnimatableNode>).animateColor) {
			// Animate it
			;(node as AnimatableNode).animateColor(
				correctColor(
					node.color ||
						(colorFn as AnimatableNodeOperation<number>).value(
							node.id,
							node.group,
						),
				),
				(colorFn as AnimatableNodeOperation<number>).duration,
			)
		} else {
			// Just set the color
			node.color = correctColor(
				node.color ||
					(colorFn as AnimatableNodeOperation<number>).value(
						node.id,
						node.group,
					),
			)
		}
	} else {
		// Its a basic function, so set the color
		node.color = correctColor(
			node.color || (colorFn as NodeOperation<number>)(node.id, node.group),
		)
	}
}

/**
 * Clamps the given color to the i32 range
 * @param color The color to correct
 */
export function correctColor(color: number) {
	return ((color ^ 0xff000000) | 0xff000000) >>> 0
}

/**
 * Creates a BGRA colorizer from the generic colorizer
 * @param colorizerFn The generic node colorizer to create a BGRA colorizer from
 */
export function createBGRAColorizer(
	colorizerFn: NodeColorizer = () => 0xff0000ff,
): NodeBGRAColorizer {
	const duration =
		(colorizerFn as Partial<AnimatableNodeOperation<any>>).duration || 0

	// Is the colorizer function a AnimatableNodeOperation, if so call the value function, otherwise invoke the colorizer fn
	const baseColorizer = (colorizerFn as Partial<AnimatableNodeOperation<any>>)
		? (colorizerFn as AnimatableNodeOperation<any>).value
		: (colorizerFn as NodeOperation<any>)

	return {
		duration,
		value(id, group) {
			const arr = baseColorizer(id, group)
			return typeof arr === 'number' ? arr : componentColorToBGRA(arr)
		},
	}
}

/**
 * Converts color components to a BGRA int color
 * @param components The color components [r, g, b, a]
 */
export function componentColorToBGRA(
	components: [number, number, number, number],
): number {
	return (
		((components[3] * 255) << 24) +
		((components[2] * 255) << 16) +
		((components[1] * 255) << 8) +
		components[0] * 255
	)
}
