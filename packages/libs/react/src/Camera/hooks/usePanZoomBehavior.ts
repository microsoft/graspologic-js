/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import {
	enablePanZoomEvents,
	GraphRenderer,
	Disconnect,
} from '@graspologic/renderer'

/**
 * Enables pan-zoom behavior on __renderer__ of __interactive__ is true
 * @param renderer The renderer
 * @param interactive If true, the pan-zoom behavior should be enabled
 * @param doubleClickZoom If true, the double click zoom behavior will be enabled
 */
export function usePanZoomBehavior(
	renderer: GraphRenderer | undefined,
	interactive: boolean,
	doubleClickZoom: boolean,
) {
	useEffect(() => {
		let disconnect: Disconnect
		if (renderer && interactive && !renderer.destroyed) {
			renderer.onInitialize(() => {
				disconnect = enablePanZoomEvents(renderer, {
					zoomToGraph: doubleClickZoom,
				})
			})
		}
		return () => disconnect && disconnect()
	}, [renderer, doubleClickZoom, interactive])
}
