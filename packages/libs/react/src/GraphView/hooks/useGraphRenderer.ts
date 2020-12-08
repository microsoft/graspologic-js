/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { GraphContainer } from '@graspologic/graph'
import {
	WebGLGraphRenderer,
	GraphRenderer,
	Maybe,
	Bounds,
} from '@graspologic/renderer'

/**
 * Creates a new GraphRenderer instance
 * @param container The graph container to use
 * @param drawEdges If true, edges will be drawn
 */
export function useGraphRenderer(
	container: GraphContainer | undefined,
	dataBounds?: Maybe<Bounds>,
): [React.RefObject<HTMLDivElement>, GraphRenderer | undefined] {
	const ref = useRef<HTMLDivElement>(null)
	const [renderer, setRenderer] = useState<GraphRenderer | undefined>(undefined)

	// Create the Renderer Instance when the ref changes
	useEffect(() => {
		let newRenderer: WebGLGraphRenderer | undefined
		if (ref.current && container) {
			const current = ref.current
			newRenderer = WebGLGraphRenderer.createInstance(
				container,
				{
					dataBounds,
				}
			)

			current.appendChild(newRenderer.view)

			setRenderer(newRenderer)

			return () => {
				if (newRenderer) {
					current.removeChild(newRenderer.view)
					newRenderer.destroy()
				}
			}
		}
	}, [dataBounds, container])

	return [ref, renderer]
}
