/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { useHoveredVertexRenderable } from './hooks/useHoveredVertexRenderable'

/**
 * Properties for the LabelHoveredNode component
 */
export interface LabelHoveredNodeProps {
	/**
	 * Handler for when a node is hovered over
	 */
	onHover?: (id: string | undefined) => void
}

/**
 * Adds functionality to the GraphView component which adds labels to hovered nodes
 */
export const LabelHoveredNode: React.FC<LabelHoveredNodeProps> = memo(
	({ onHover }) => {
		useHoveredVertexRenderable(onHover)
		return null
	},
)
LabelHoveredNode.displayName = 'LabelHoveredNode'
