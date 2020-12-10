/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { GraphRenderer } from '@graspologic/renderer'

export interface CameraEvents {
	onMoveComplete?: () => void
}

/**
 * This hook binds callbacks passed as React props to our underlying renderer instance
 * @param renderer
 * @param onInitialize
 */
export function useBindCallbacks(
	renderer: GraphRenderer | undefined,
	{ onMoveComplete }: CameraEvents,
) {
	useEffect(() => {
		if (renderer && onMoveComplete) {
			return renderer.camera.on('movingComplete', onMoveComplete)
		}
	}, [renderer, onMoveComplete])
}
