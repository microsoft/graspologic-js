/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useContext } from 'react'
import { GraphRendererContext } from '../GraphView/context.js'
import { useVertexClickEvents } from './hooks/useVertexClickEvents.js'
import { useVertexClickHandler } from './hooks/useVertexClickHandler.js'
import type { VertexClickHandler } from './types.js'

/**
 * Properties for the HandleNodeClicks Component
 */
export interface HandleNodeClicksProps {
	/**
	 * An handler function for when a vertex is clicked
	 */
	onClick: VertexClickHandler
}

/**
 * Adds node click functionality to the GraphView component
 */
export const HandleNodeClicks: React.FC<HandleNodeClicksProps> = memo(
	({ onClick }) => {
		const renderer = useContext(GraphRendererContext)
		useVertexClickEvents(renderer)
		useVertexClickHandler(renderer, onClick)
		return null
	},
)
HandleNodeClicks.displayName = 'HandleNodeClicks'
