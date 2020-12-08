/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { memo, useContext, useEffect } from 'react'
import { GraphRendererContext } from '../GraphView'
import { useBindCallbacks } from './hooks/useBindCallbacks'
import { useColorizer } from './hooks/useColorizer'
import {
	useConfiguration,
	NodeRendererConfiguration,
} from './hooks/useConfiguration'
import { useNodesRenderable } from './hooks/useNodesRenderable'
import { useSizer, NodeSizer } from './hooks/useSizer'
import { useWeighter, NodeWeighter } from './hooks/useWeighter'
import { Node, NodeColorizer } from '@graspologic/graph'

/**
 * The set of properties for the Nodes component
 */
export interface NodesProps extends NodeRendererConfiguration {
	/**
	 * Is the nodes rendering disabled
	 */
	disabled?: boolean

	/**
	 * A colorization function to use for vertex coloring. `vertex.group` is applied against the
	 * colorization function to generate a categorical color.
	 */
	color?: NodeColorizer

	/**
	 * A sizing function used for sizing nodes
	 */
	radius?: NodeSizer

	/**
	 * A weighting function used when weighting nodes
	 */
	weight?: NodeWeighter

	/**
	 * Callback that fires when a node is clicked
	 */
	onNodeClick?: (node?: Node) => void

	/**
	 * Callback that fires when a node is hovered (and again when unhovered)
	 */
	onNodeHover?: (node?: Node) => void
}

/**
 * Configures the node rendering for the GraphView component
 */
export const Nodes: React.FC<NodesProps> = memo(
	({
		color,
		radius,
		weight,
		onNodeClick,
		onNodeHover,
		disabled,
		...configProps
	}) => {
		const renderer = useContext(GraphRendererContext)
		const nodesRenderable = useNodesRenderable(renderer)
		useConfiguration(renderer, configProps)
		useColorizer(renderer, color)
		useSizer(renderer, radius)
		useWeighter(renderer, weight)
		useBindCallbacks(renderer, {
			onNodeClick,
			onNodeHover,
		})

		useEffect(() => {
			if (nodesRenderable) {
				nodesRenderable.enabled = !disabled
			}
		}, [disabled, nodesRenderable])

		return null
	},
)
Nodes.displayName = 'Nodes'
