/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { GraphRenderer, Bounds } from '@graspologic/renderer'

/**
 * Updates the renderer's camera to use __bounds__ as it's bounds
 * @param renderer The graph renderer
 * @param bounds The new bounds
 * @param transitionDuration The time to take to transition between the camera's old position to the new one
 */
export function useCameraBounds(
	renderer: GraphRenderer | undefined,
	bounds?: Bounds,
	transitionDuration?: number,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed) {
			if (bounds) {
				renderer.camera.viewBounds(bounds, transitionDuration)
			}

			const sub = renderer.onLoad.subscribe(() => {
				if (bounds) {
					renderer.camera.viewBounds(bounds, transitionDuration)
				}
			})
			return () => sub.unsubscribe()
		}
	}, [bounds, renderer, transitionDuration])
}
