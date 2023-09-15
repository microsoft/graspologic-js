/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphRenderer } from '@graspologic/renderer'
import { useEffect } from 'react'
import type { VertexClickHandler } from '../types'

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
			return renderer.on('vertexClick', vertex =>
				onVertexClick(vertex && vertex.id),
			)
		}
	}, [renderer, onVertexClick])
}
