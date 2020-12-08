/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { colorizeGraph, NodeColorizer } from '@graspologic/graph'
import { GraphRenderer } from '@graspologic/renderer'

/**
 * This hook will apply colors to the edges/nodes of __renderer__ using the __colorizerFn__
 * @param renderer The graph renderer
 * @param colorizerFn The colorize function
 */
export function useColorizer(
	renderer: GraphRenderer | undefined,
	colorizerFn?: NodeColorizer,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed && colorizerFn) {
			colorizeGraph(renderer.graph, colorizerFn)
		}
	}, [colorizerFn, renderer])
}
