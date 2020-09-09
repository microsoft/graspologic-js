/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorVector, DEFAULT_HOVER_HIGHLIGHT_COLOR } from '@graspologic/renderer'
import * as React from 'react'
import { memo, useContext, useEffect } from 'react'
import { GraphRendererContext } from '../GraphView'
import { useVertexSelectionSynchronization } from './hooks/useVertexSelectionSynchronization'
import { useVertexSetHighlightRenderable } from './hooks/useVertexSetHighlightRenderable'

/**
 * Properties for the NodeSetHighlight component
 */
export interface NodeSetHighlightProps {
	/**
	 * The set of verticies to highlight
	 */
	vertexIds: string[]

	/**
	 * The color to highlight them
	 */
	color?: ColorVector
}

/**
 * Adds functionality to the GraphView component which colors a set of verticies a given color
 */
export const NodeSetHighlight: React.FC<NodeSetHighlightProps> = memo(
	({ vertexIds, color = DEFAULT_HOVER_HIGHLIGHT_COLOR }) => {
		const renderer = useContext(GraphRendererContext)
		const renderable = useVertexSetHighlightRenderable(renderer)
		useVertexSelectionSynchronization(renderer, renderable, vertexIds)

		useEffect(() => {
			if (renderable && color != null) {
				renderable.color = color
			}
		}, [renderable, color])
		return null
	},
)
NodeSetHighlight.displayName = 'NodeSetHighlight'
