/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { memo, useContext, useEffect } from 'react'
import { GraphRendererContext } from '../GraphView'
import {
	EdgeRendererConfiguration,
	useConfiguration,
} from './hooks/useConfiguration'
import { useEdgesRenderable } from './hooks/useEdgesRenderable'

/**
 * The set of properties for the Edges component
 */
export interface EdgesProps extends EdgeRendererConfiguration {
	/**
	 * If true, edges will be shown
	 * @defaultValue true
	 */
	disabled?: boolean
}

/**
 * Configures the edge rendering for a GraphView
 */
export const Edges: React.FC<EdgesProps> = memo(({ disabled, ...config }) => {
	const renderer = useContext(GraphRendererContext)
	const edgesRenderable = useEdgesRenderable(renderer)
	useConfiguration(renderer, config)
	useEffect(() => {
		if (edgesRenderable) {
			edgesRenderable.enabled = !disabled
		}
	}, [disabled, edgesRenderable])
	return null
})
Edges.displayName = 'Edges'
