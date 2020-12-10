/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '../graph'
import { AnimatableEdge, AnimatableNode, Edge, Node } from '../primitives'
import { NodeSizer, NodeWeighter, EdgeWeighter, NodePositioner } from './types'

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
 * Positions a node using the position fn
 * @param node The node to position
 * @param positionFn The position function to use
 */
export function positionNode(node: Node, positionFn: NodePositioner) {
	if ((node as Partial<AnimatableNode>).animatePositionComponents) {
		;(node as AnimatableNode).animatePositionComponents(
			positionFn.x(node.id, node.group),
			positionFn.y(node.id, node.group),
			positionFn.z ? positionFn.z(node.id, node.group) : 0,
			positionFn.duration,
		)
	} else {
		node.x = positionFn.x(node.id, node.group)
		node.y = positionFn.y(node.id, node.group)
		if (positionFn.z) {
			node.z = positionFn.z(node.id, node.group)
		}
	}
}
