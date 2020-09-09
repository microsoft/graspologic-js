/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	GraphRenderer,
	VertexSetLabelRenderable,
	UsesWebGL,
} from '@graspologic/renderer'
import { useMemo, useEffect } from 'react'

export function useVertexSetHighlightRenderable(
	renderer: (GraphRenderer & Partial<UsesWebGL>) | undefined,
): VertexSetLabelRenderable | undefined {
	const renderable = useMemo(
		() => renderer && renderer.gl && new VertexSetLabelRenderable(renderer.gl),
		[renderer],
	)
	useEffect(() => {
		if (renderer && renderable) {
			renderer.scene.addRenderable(renderable)
		}
	}, [renderer, renderable])

	return renderable
}
