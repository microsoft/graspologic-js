/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useMemo } from 'react'
import { NodesRenderable } from '@graspologic/renderables-nodes'
import { UsesWebGL, GraphRenderer, Maybe } from '@graspologic/renderer'

export function useNodesRenderable(
	renderer: Maybe<GraphRenderer>,
): Maybe<NodesRenderable> {
	return useMemo(() => {
		const glRenderer = renderer as Partial<UsesWebGL>
		if (renderer && glRenderer.gl) {
			const newRenderable = new NodesRenderable(glRenderer.gl, renderer.config)
			renderer.scene.addRenderable(newRenderable, true)
			return newRenderable
		}
	}, [renderer])
}
