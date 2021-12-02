/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ColorVector,
	DEFAULT_HOVER_HIGHLIGHT_COLOR,
} from '@graspologic/renderer'
import { memo, useEffect } from 'react'
import { useHoveredVertexRenderable } from './hooks/useHoveredVertexRenderable'

/**
 * Properties for the HighlightHoveredNode component
 */
export interface HighlightHoveredNodeProps {
	/**
	 * The color of the highlight
	 */
	color?: ColorVector

	/**
	 * Handler for when a node is hovered over
	 */
	onHover?: (id: string | undefined) => void
}

/**
 * Adds functionality to the GraphView component which highlights hovered nodes
 */
export const HighlightHoveredNode: React.FC<HighlightHoveredNodeProps> = memo(
	({ color = DEFAULT_HOVER_HIGHLIGHT_COLOR, onHover }) => {
		const renderable = useHoveredVertexRenderable(onHover)

		useEffect(() => {
			if (renderable) {
				renderable.color = color
			}
		}, [color, renderable])

		return null
	},
)
HighlightHoveredNode.displayName = 'HighlightHoveredNode'
