/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import { GraphRenderer } from '@graspologic/renderer'

/**
 * Hides/shows deselected nodes in __renderer__ based on __hideDeselected__
 * @param renderer The renderer
 * @param hideDeselected If true, deselected vertices will be hidden
 */
export function useGraphHideDeselected(
	renderer: GraphRenderer | undefined,
	hideDeselected: boolean,
) {
	useEffect(() => {
		if (renderer && !renderer.destroyed) {
			renderer.config.hideDeselected = hideDeselected
		}
	}, [renderer, hideDeselected])
}
