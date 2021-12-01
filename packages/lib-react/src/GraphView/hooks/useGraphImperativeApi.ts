/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer } from '@graspologic/renderer'
import { useImperativeHandle } from 'react'

/**
 * Assigns a GraphRenderer imperative api for __renderer__ to __ref__
 * @param renderer The graph renderer
 * @param ref The ref for a graph renderer
 */
export function useGraphImperativeApi(
	renderer: GraphRenderer | undefined,
	ref: React.Ref<GraphRenderer>,
) {
	return useImperativeHandle<GraphRenderer, GraphRenderer>(
		ref,
		() =>
			(!renderer || renderer.destroyed
				? ({} as any)
				: renderer) as GraphRenderer,
		[renderer],
	)
}
