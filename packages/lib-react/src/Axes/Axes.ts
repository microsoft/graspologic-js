/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DEFAULT_DRAW_AXES, DEFAULT_CORNER_AXES } from '@graspologic/renderer'
import { memo, useContext, useEffect } from 'react'
import { GraphRendererContext } from '../GraphView/context'
import { useAxesRenderable } from './hooks/useAxesRenderable'

/**
 * The properties for the Axes component
 */
export interface AxesProps {
	/**
	 * A flag indicating whether to show the axes. default=true
	 */
	shown?: boolean

	/**
	 * A flag indicating whether to draw the axes in the corner. default=true
	 */
	inCorner?: boolean
}

/**
 * Display's a set of Axes on the graph renderer
 */
export const Axes: React.FC<AxesProps> = memo(
	({ shown = DEFAULT_DRAW_AXES, inCorner = DEFAULT_CORNER_AXES }) => {
		const renderer = useContext(GraphRendererContext)
		useAxesRenderable(renderer)

		useEffect(() => {
			if (renderer) {
				renderer.config.cornerAxes = inCorner
			}
		}, [renderer, inCorner])

		useEffect(() => {
			if (renderer) {
				renderer.config.drawAxes = shown
			}
		}, [renderer, shown])

		return null
	},
)
Axes.displayName = 'Axes'
