/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useMemo } from 'react'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { UsesWebGL, GraphRenderer, Maybe } from '@graspologic/renderer'

export function useEdgesRenderable(
	renderer: Maybe<GraphRenderer>,
): Maybe<EdgesRenderable> {
	return useMemo(() => {
		const glRenderer = renderer as Partial<UsesWebGL>
		if (renderer && glRenderer.gl) {
			const newRenderable = new EdgesRenderable(glRenderer.gl, renderer.config)
			renderer.scene.addRenderable(newRenderable, true)
			return newRenderable
		}
	}, [renderer])
}
