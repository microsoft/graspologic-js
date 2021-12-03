/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer } from '@graspologic/renderer'
import { useEffect } from 'react'

/**
 * Updates the __interpolationTime__ for the __renderer__
 * @param renderer The renderer
 * @param interpolationTime The interpolation time for animations
 */
export function useGraphInterpolationTime(
	renderer: GraphRenderer | undefined,
	interpolationTime: number,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed) {
			renderer.config.interpolationTime = interpolationTime
		}
	}, [renderer, interpolationTime])
}
