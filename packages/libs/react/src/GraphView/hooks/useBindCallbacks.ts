/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useCallback } from 'react'
import { GraphRenderer, Node, enableClickEvents } from '@graspologic/renderer'

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
			const subscription = renderer.onLoad.subscribe(() => onLoad())
			return () => subscription.unsubscribe()
		}
	}, [renderer, onLoad])

	useEffect(() => {
		if (renderer && onResize) {
			const subscription = renderer.onResize.subscribe(() => onResize())
			return () => subscription.unsubscribe()
		}
	}, [renderer, onResize])

	useEffect(() => {
		if (renderer && onNodeClick) {
			// click events need to be explicitly turned on when handlers are present
			// normally, they are only enabled if HandleNodeClicks child component is used
			// this provides an alternative binding to match the other handlers for consistency
			const disconnect = enableClickEvents(renderer)
			const subscription = renderer.onVertexClick.subscribe(node => {
				onNodeClick(node)
			})
			return () => {
				disconnect()
				subscription.unsubscribe()
			}
		}
	}, [renderer, onNodeClick])

	useEffect(() => {
		if (renderer && onNodeHover) {
			const subscription = renderer.onVertexHover.subscribe(node => {
				onNodeHover(node)
			})
			return () => subscription.unsubscribe()
		}
	}, [renderer, onNodeHover])
}
