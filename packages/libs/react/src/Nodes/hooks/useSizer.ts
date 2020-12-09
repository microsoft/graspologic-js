/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { NodeSizer, sizeGraph } from '@graspologic/graph'
import { GraphRenderer } from '@graspologic/renderer'

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
			sizeGraph(renderer.graph, sizerFn)
		}
	}, [sizerFn, renderer])
}
