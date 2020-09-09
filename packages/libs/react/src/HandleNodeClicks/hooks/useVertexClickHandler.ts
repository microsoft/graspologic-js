/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer } from '@graspologic/renderer'
import { useEffect } from 'react'
import { VertexClickHandler } from '../types'

/**
 * Subscribes to vertex click events on __renderer__
 * @param renderer The renderer
 * @param onVertexClick The vertex click handler
 */
export function useVertexClickHandler(
	renderer: GraphRenderer | undefined,
	onVertexClick: VertexClickHandler,
) {
	useEffect(() => {
		if (renderer) {
			const subscription = renderer.onVertexClick.subscribe(vertex =>
				onVertexClick(vertex && vertex.id),
			)
			return () => subscription.unsubscribe()
		}
	}, [renderer, onVertexClick])
}
