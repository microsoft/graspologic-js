/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo, useEffect } from 'react'
import { VertexSetRenderable } from '@graspologic/renderables-support'
import { GraphRenderer, UsesWebGL } from '@graspologic/renderer'

/**
 * Creates a VertexSetRenderable
 * @param renderer The renderer
 */
export function useVertexSetHighlightRenderable(
	renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined,
): VertexSetRenderable | undefined {
	const renderable = useMemo(
		() => renderer && renderer.gl && new VertexSetRenderable(renderer.gl),
		[renderer],
	)
	useEffect(() => {
		if (renderer && renderable) {
			renderer.scene.addRenderable(renderable)
		}
	}, [renderer, renderable])

	return renderable
}
