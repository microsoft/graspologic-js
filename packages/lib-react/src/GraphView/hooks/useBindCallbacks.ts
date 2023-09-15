/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphRenderer, Node} from '@graspologic/renderer';
import { enableClickEvents } from '@graspologic/renderer'
import { useEffect, useCallback } from 'react'

interface CallbacksArgs {
	renderer?: GraphRenderer
	callbacks?: {
		onInitialize?: (renderer: GraphRenderer) => void
		onLoad?: () => void
		onResize?: () => void
		onNodeClick?: (node?: Node) => void
		onNodeHover?: (node?: Node) => void
	}
}

/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
export function useBindCallbacks({ renderer, callbacks = {} }: CallbacksArgs) {
	const { onInitialize, onLoad, onResize, onNodeClick, onNodeHover } = callbacks

	const handleInitialize = useCallback(() => {
		if (onInitialize && renderer) {
			onInitialize(renderer)
		}
	}, [onInitialize, renderer])
	useEffect(() => {
		// TODO: if this can be unsubscribed, we should return unsub function
		if (renderer) {
			renderer.onInitialize(handleInitialize)
		}
	}, [renderer, handleInitialize])

	useEffect(() => {
		if (renderer && onLoad) {
			return renderer.on('load', () => onLoad())
		}
	}, [renderer, onLoad])

	useEffect(() => {
		if (renderer && onResize) {
			return renderer.on('resize', () => onResize())
		}
	}, [renderer, onResize])

	useEffect(() => {
		if (renderer && onNodeClick) {
			// click events need to be explicitly turned on when handlers are present
			// normally, they are only enabled if HandleNodeClicks child component is used
			// this provides an alternative binding to match the other handlers for consistency
			const disconnect = enableClickEvents(renderer)
			const disconnectVertexClick = renderer.on('vertexClick', node => {
				onNodeClick(node)
			})
			return () => {
				disconnect()
				disconnectVertexClick()
			}
		}
	}, [renderer, onNodeClick])

	useEffect(() => {
		if (renderer && onNodeHover) {
			return renderer.on('vertexHovered', node => {
				onNodeHover(node)
			})
		}
	}, [renderer, onNodeHover])
}
