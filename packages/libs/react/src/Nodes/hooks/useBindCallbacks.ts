/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { GraphRenderer, Id, Maybe, Node } from '@graspologic/renderer'

interface CallbacksArgs {
	onNodeClick?: (id: Maybe<Id>, node: Maybe<Node>) => void
	onNodeHover?: (id: Maybe<Id>, node: Maybe<Node>) => void
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
		if (renderer && onNodeClick) {
			return renderer.on('node:click', node => onNodeClick(node?.id, node))
		}
	}, [renderer, onNodeClick])

	useEffect(() => {
		if (renderer && onNodeHover) {
			return renderer.on('node:hover', node => onNodeHover(node?.id, node))
		}
	}, [renderer, onNodeHover])
}
