/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer, CameraAdjustmentMode } from '@graspologic/renderer'
import { useEffect } from 'react'

/**
 * Updates __renderer__ to use __mode__ as it's CameraAdjustmentMode
 * @param renderer The renderer
 * @param mode The camera mode
 */
export function useCameraAdjustmentMode(
	renderer: GraphRenderer | undefined,
	mode = CameraAdjustmentMode.None,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed) {
			renderer.config.cameraAdjustmentMode = mode
		}
	}, [mode, renderer])
}
