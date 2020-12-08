/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect, useCallback } from 'react'
import { GraphRenderer } from '@graspologic/renderer'

interface CallbacksArgs {
	renderer?: GraphRenderer
	callbacks?: {
		onInitialize?: (renderer: GraphRenderer) => void
		onLoad?: () => void
		onResize?: () => void
	}
}

/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
export function useBindCallbacks({ renderer, callbacks = {} }: CallbacksArgs) {
	const { onInitialize, onLoad, onResize } = callbacks

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
}
