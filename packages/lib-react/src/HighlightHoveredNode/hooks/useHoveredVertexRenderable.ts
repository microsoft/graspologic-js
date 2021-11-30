/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext, useEffect, useMemo } from 'react'
import { GraphRendererContext } from '../../GraphView/context'
import { VertexSetRenderable } from '@graspologic/renderables-support'
import { GraphRenderer, UsesWebGL, ColorVector } from '@graspologic/renderer'

/**
 * Adds a renderable to GraphView which will highlight nodes as they are hovered over
 * @param onHover A vertex hover event handler
 */
export function useHoveredVertexRenderable(
	onHover: undefined | ((id: string | undefined) => void),
): VertexSetRenderable | undefined {
	const renderer = useContext(GraphRendererContext) as GraphRenderer &
		Partial<UsesWebGL>
	const renderable = useMemo(
		() => renderer?.gl && new VertexSetRenderable(renderer.gl),
		[renderer],
	)

	useEffect(() => {
		if (renderer && renderable) {
			renderer.config.onHoverHighlightColorChanged(
				value => (renderable.color = value as ColorVector),
			)

			renderer.scene.addRenderable(renderable)
			return renderer.on('vertexHovered', hovered => {
				renderable.setData(hovered ? [hovered] : [])
				if (onHover) {
					onHover(hovered?.id)
				}
			})
		}
	}, [onHover, renderable, renderer])

	return renderable
}
