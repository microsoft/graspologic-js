/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { DataboundRenderable } from '@graspologic/renderables-base'
import type { GraphRenderer, Node } from '@graspologic/renderer'
import { useEffect } from 'react'

export function useVertexSelectionSynchronization(
	renderer: GraphRenderer | undefined,
	renderable: DataboundRenderable<Node[]> | undefined,
	vertexIds: string[],
) {
	useEffect(() => {
		if (renderer && renderable) {
			renderer.awaitKickoff().then(() => {
				const vertices = Array.from(
					renderer.scene.primitives(new Set(vertexIds)),
				)
				renderable.setData(vertices as Node[])
			})
		}
	}, [renderer, renderable, vertexIds])
}
