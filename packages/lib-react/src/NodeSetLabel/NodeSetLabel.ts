/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useContext } from 'react'
import { GraphRendererContext } from '../GraphView'
import { useVertexSelectionSynchronization } from './hooks/useVertexSelectionSynchronization'
import { useVertexSetHighlightRenderable } from './hooks/useVertexSetLabelRenderable'

/**
 * Properties for the NodeSetHighlight component
 */
export interface NodeSetLabelProps {
	/**
	 * The set of verticies to label
	 */
	vertexIds: string[]
}

/**
 * Adds functionality to the GraphView component which adds labels for a set of verticies
 */
export const NodeSetLabel: React.FC<NodeSetLabelProps> = memo(
	({ vertexIds }) => {
		const renderer = useContext(GraphRendererContext)
		const renderable = useVertexSetHighlightRenderable(renderer)
		useVertexSelectionSynchronization(renderer, renderable, vertexIds)
		return null
	},
)
NodeSetLabel.displayName = 'NodeSetLabel'
