/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { WebGLGraphRenderer, GraphRenderer } from '@graspologic/renderer'
import { GraphContainer } from '@graspologic/graph'

/**
 * Creates a new GraphRenderer instance
 * @param nodeCountHint The number of nodes in the graph
 * @param edgeCountHint The number of edges in the graph
 * @param container The graph container to use 
 * @param drawEdges If true, edges will be drawn
 */
export function useGraphRenderer(
	nodeCountHint?: number,
	edgeCountHint?: number,
	drawEdges?: boolean,
	container?: GraphContainer,
): [React.RefObject<HTMLDivElement>, GraphRenderer | undefined] {
	const ref = useRef<HTMLDivElement>(null)
	const [renderer, setRenderer] = useState<GraphRenderer | undefined>(undefined)

	// Create the Renderer Instance when the ref changes
	useEffect(() => {
		let newRenderer: WebGLGraphRenderer | undefined
		if (ref.current) {
			const current = ref.current
			newRenderer = WebGLGraphRenderer.createInstance({
				nodeCountHint,
				edgeCountHint,
				drawEdges,
			}, container)

			current.appendChild(newRenderer.view)
			setRenderer(newRenderer)

			return () => {
				if (newRenderer) {
					current.removeChild(newRenderer.view)
					newRenderer.destroy()
				}
			}
		}
	}, [nodeCountHint, edgeCountHint, drawEdges])

	return [ref, renderer]
}
