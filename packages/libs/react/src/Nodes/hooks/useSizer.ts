/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { GraphRenderer, Node } from '@graspologic/renderer'

export type NodeSizer = (node: Node) => number

/**
 * This hook will apply sizes to the edges/nodes of __renderer__ using the __sizerFn__
 * @param renderer The graph renderer
 * @param sizerFn The sizing function
 */
export function useSizer(
	renderer: GraphRenderer | undefined,
	sizerFn?: NodeSizer,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed && sizerFn) {
			for (const node of renderer.graph.nodes) {
				node.radius = sizerFn(node)
			}
		}
	}, [sizerFn, renderer])
}
