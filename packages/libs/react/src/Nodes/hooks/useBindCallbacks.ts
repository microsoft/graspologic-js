/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { Node, enableClickEvents, GraphRenderer } from '@graspologic/renderer'

interface CallbacksArgs {
	onNodeClick?: (node?: Node) => void
	onNodeHover?: (node?: Node) => void
}

/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
export function useBindCallbacks(
	renderer: GraphRenderer | undefined,
	callbacks: CallbacksArgs = {},
) {
	const { onNodeClick, onNodeHover } = callbacks

	useEffect(() => {
		if (renderer && (onNodeHover || onNodeClick)) {
			// click events need to be explicitly turned on when handlers are present
			// normally, they are only enabled if HandleNodeClicks child component is used
			// this provides an alternative binding to match the other handlers for consistency
			return enableClickEvents(renderer)
		}
	}, [renderer, onNodeClick, onNodeHover])

	useEffect(() => {
		if (renderer && onNodeClick) {
			return renderer.on('node:click', onNodeClick)
		}
	}, [renderer, onNodeClick])

	useEffect(() => {
		if (renderer && onNodeHover) {
			return renderer.on('node:hover', onNodeHover)
		}
	}, [renderer, onNodeHover])
}
