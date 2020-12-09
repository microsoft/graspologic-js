/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { NodePositioner, positionGraph } from '@graspologic/graph'
import { GraphRenderer } from '@graspologic/renderer'

/**
 * This hook will apply positions to the edges/nodes of __renderer__ using the __positionFn__
 * @param renderer The graph renderer
 * @param positionFn The position function
 */
export function usePositioner(
	renderer: GraphRenderer | undefined,
	positionFn?: NodePositioner,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed && positionFn) {
			positionGraph(renderer.graph, positionFn)
		}
	}, [positionFn, renderer])
}
