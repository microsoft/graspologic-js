/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useEffect } from 'react'
import {
	DEFAULT_NODE_MIN_RADIUS,
	DEFAULT_NODE_MAX_RADIUS,
	DEFAULT_NODE_OUTLINE,
	DEFAULT_HIDE_NODES_ON_MOVE,
	DEFAULT_NODE_FILTERED_OUT_SATURATION,
	DEFAULT_NODE_FILTERED_IN_SATURATION,
	GraphRenderer,
} from '@graspologic/renderer'

export interface NodeRendererConfiguration {
	/**
	 * The minimum radius of nodes, based on nodes _weight_ property
	 * @defaultValue [[DEFAULT_NODE_MIN_RADIUS]]
	 */
	minRadius?: number

	/**
	 * The minimum radius of nodes, based on nodes _weight_ property
	 * @defaultValue [[DEFAULT_NODE_MAX_RADIUS]]
	 */
	maxRadius?: number

	/**
	 * If true, nodes will be drawn with an outline
	 * @defaultValue [[DEFAULT_NODE_OUTLINE]]
	 */
	noOutline?: boolean

	/**
	 * If true, nodes will be hidden when the user is panning/zooming
	 * @defaultValue [[DEFAULT_HIDE_NODES_ON_MOVE]]
	 */
	hideOnMove?: boolean

	/**
	 * The set of _filtered_ node ids
	 */
	filteredIds?: string[]

	/**
	 * The saturation of nodes which are _not in_ the filtered set
	 * @defaultValue [[DEFAULT_NODE_FILTERED_OUT_SATURATION]]
	 */
	filteredOutSaturation?: number

	/**
	 * The saturation of nodes which are _in_ the filtered set
	 * @defaultValue [[DEFAULT_NODE_FILTERED_IN_SATURATION]]
	 */
	filteredInSaturation?: number
}

export function useConfiguration(
	renderer: GraphRenderer | undefined,
	{
		minRadius = DEFAULT_NODE_MIN_RADIUS,
		maxRadius = DEFAULT_NODE_MAX_RADIUS,
		noOutline = !DEFAULT_NODE_OUTLINE,
		hideOnMove = DEFAULT_HIDE_NODES_ON_MOVE,
		filteredIds,
		filteredOutSaturation = DEFAULT_NODE_FILTERED_OUT_SATURATION,
		filteredInSaturation = DEFAULT_NODE_FILTERED_IN_SATURATION,
	}: NodeRendererConfiguration,
) {
	useEffect(() => {
		if (renderer && minRadius != null) {
			renderer.config.nodeMinRadius = minRadius
		}
	}, [renderer, minRadius])

	useEffect(() => {
		if (renderer && maxRadius != null) {
			renderer.config.nodeMaxRadius = maxRadius
		}
	}, [renderer, maxRadius])

	useEffect(() => {
		if (renderer) {
			renderer.config.nodeOutline = !noOutline
		}
	}, [renderer, noOutline])

	useEffect(() => {
		if (renderer) {
			renderer.config.hideNodesOnMove = hideOnMove
		}
	}, [renderer, hideOnMove])

	useEffect(() => {
		if (renderer) {
			renderer.config.nodeFilteredIds = filteredIds
		}
	}, [renderer, filteredIds])

	useEffect(() => {
		if (renderer) {
			renderer.config.nodeFilteredInSaturation = filteredInSaturation
		}
	}, [renderer, filteredInSaturation])

	useEffect(() => {
		if (renderer) {
			renderer.config.nodeFilteredOutSaturation = filteredOutSaturation
		}
	}, [renderer, filteredOutSaturation])
}
