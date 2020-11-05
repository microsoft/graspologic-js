/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NodeComponentColorizer, GraphRenderer } from '../types'

const DEFAULT_NAME = 'DEFAULT'

export function correctColor(color: number) {
	return (((color ^ 0xff000000) | 0xff000000) >>> 0)
}

export function createIntColorizer(
	colorizerFn: NodeComponentColorizer = () => [1, 0, 0, 1],
) {
	return (
		group: number | string | undefined,
		id: number | string | undefined,
	) => {
		const arr = colorizerFn(group, id)
		return (
			((arr[3] * 255) << 24) +
			((arr[2] * 255) << 16) +
			((arr[1] * 255) << 8) +
			arr[0] * 255
		)
	}
}

/**
 * Applies a colorizer function to the graph renderer
 * @param renderer The renderer to colorize
 * @param colorizerFn The function to use to color the renderer
 */
export function colorizeRenderer(
	renderer: GraphRenderer,
	colorizerFn?: NodeComponentColorizer,
) {
	const colorizer = createIntColorizer(colorizerFn)
	const nodeColors = new Map<string, number>()
	let color: number
	for (const node of renderer.scene.nodes(true)) {
		color = correctColor(colorizer(node.group, node.id))
		node.color = color
		nodeColors.set(node.id || DEFAULT_NAME, color)
	}
	let nodeColor: number | undefined
	for (const edge of renderer.scene.edges()) {
		nodeColor = nodeColors.get(edge.source!)
		if (nodeColor !== undefined) {
			edge.color = nodeColor
		}
	}
}
