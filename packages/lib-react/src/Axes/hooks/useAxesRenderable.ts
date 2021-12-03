/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxesRenderable } from '@graspologic/renderables-support'
import { UsesWebGL, GraphRenderer } from '@graspologic/renderer'
import { useEffect, useMemo } from 'react'

/**
 * Adds an AxesRenderable to __renderer__ which will display a set of Axes on the renderer.
 * @param renderer The graph renderer
 */
export function useAxesRenderable(
	renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined,
): AxesRenderable | undefined {
	const renderable = useMemo(
		() =>
			renderer &&
			renderer.gl &&
			new AxesRenderable(renderer.gl, renderer.config),
		[renderer],
	)
	useEffect(() => {
		if (renderer && renderable) {
			renderer.scene.addRenderable(renderable, true)
		}
	}, [renderer, renderable])
	return renderable
}
