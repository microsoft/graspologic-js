/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import {
	Disconnect,
	GraphRenderer,
	enableClickEvents,
} from '@graspologic/renderer'

/**
 * Enables vertex click events on __renderer__
 * @param renderer The renderer
 */
export function useVertexClickEvents(renderer: GraphRenderer | undefined) {
	useEffect(() => {
		let disconnect: Disconnect
		if (renderer) {
			renderer.onInitialize(() => {
				disconnect = enableClickEvents(renderer)
			})
		}
		return () => disconnect && disconnect()
	}, [renderer])
}
