/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { weightGraph, NodeWeighter } from '@graspologic/graph'
import { GraphRenderer } from '@graspologic/renderer'

/**
 * This hook will apply weights to the edges/nodes of __renderer__ using the __weightFn__
 * @param renderer The graph renderer
 * @param weightFn The weighting function
 */
export function useWeighter(
	renderer: GraphRenderer | undefined,
	weightFn?: NodeWeighter,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed && weightFn) {
			weightGraph(renderer.graph, weightFn)
		}
	}, [weightFn, renderer])
}
