/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	DEFAULT_HIDE_EDGES_ON_MOVE,
	DEFAULT_DRAW_EDGES,
	DEFAULT_EDGE_CONSTANT_WIDTH,
	DEFAULT_EDGE_DEPTH_WRITE,
	DEFAULT_EDGE_ANTIALIAS,
	DEFAULT_EDGE_ALPHA,
	DEFAULT_EDGE_MIN_WIDTH,
	DEFAULT_EDGE_MAX_WIDTH,
	DEFAULT_EDGE_FILTERED_OUT_SATURATION,
	DEFAULT_EDGE_FILTERED_IN_SATURATION,
} from '@graspologic/renderer'
import { memo, useContext, useEffect } from 'react'
import { GraphRendererContext } from '../GraphView/index.js'

/**
 * The set of properties for the Edges component
 */
export interface EdgesProps {
	/**
	 * If true, edges will be shown
	 * @defaultValue true
	 */
	shown?: boolean

	/**
	 * If true, the edges will be hidden when the user is panning or zooming
	 */
	hideOnMove?: boolean

	/**
	 * If true, edges will remain a constant size regardless of the zoom level
	 * @defaultValue [[DEFAULT_EDGE_CONSTANT_WIDTH]]
	 */
	constantWidth?: boolean

	/**
	 * If true, edges which are closer to the camera will occlude further away ones
	 * @defaultValue [[DEFAULT_EDGE_DEPTH_WRITE]]
	 */
	depthWrite?: boolean

	/**
	 * If true, the edges will be anti-aliased
	 * @defaultValue [[DEFAULT_EDGE_ANTIALIAS]]
	 */
	antialias?: boolean

	/**
	 * The minimum width of the edges
	 * @defaultValue [[DEFAULT_EDGE_MIN_WIDTH]]
	 */
	minWidth?: number

	/**
	 * The maximum width of the edges
	 * @defaultValue [[DEFAULT_EDGE_MAX_WIDTH]]
	 */
	maxWidth?: number

	/**
	 * The transparency of the edges
	 * @defaultValue [[DEFAULT_EDGE_ALPHA]]
	 */
	alpha?: number

	/**
	 * The saturation of edges which are _not in_ the filtered set
	 * @defaultValue [[DEFAULT_EDGE_FILTERED_OUT_SATURATION]]
	 */
	filteredOutSaturation?: number

	/**
	 * The saturation of edges which are _in_ the filtered set
	 * @defaultValue [[DEFAULT_EDGE_FILTERED_IN_SATURATION]]
	 */
	filteredInSaturation?: number
}

/**
 * Configures the edge rendering for a GraphView
 */
export const Edges: React.FC<EdgesProps> = memo(
	({
		hideOnMove = DEFAULT_HIDE_EDGES_ON_MOVE,
		shown = DEFAULT_DRAW_EDGES,
		constantWidth = DEFAULT_EDGE_CONSTANT_WIDTH,
		depthWrite = DEFAULT_EDGE_DEPTH_WRITE,
		antialias = DEFAULT_EDGE_ANTIALIAS,
		alpha = DEFAULT_EDGE_ALPHA,
		minWidth = DEFAULT_EDGE_MIN_WIDTH,
		maxWidth = DEFAULT_EDGE_MAX_WIDTH,
		filteredOutSaturation = DEFAULT_EDGE_FILTERED_OUT_SATURATION,
		filteredInSaturation = DEFAULT_EDGE_FILTERED_IN_SATURATION,
	}) => {
		const renderer = useContext(GraphRendererContext)

		useEffect(() => {
			if (renderer) {
				renderer.config.drawEdges = shown
			}
		}, [renderer, shown])

		useEffect(() => {
			if (renderer) {
				renderer.config.hideEdgesOnMove = hideOnMove
			}
		}, [renderer, hideOnMove])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeConstantWidth = constantWidth
			}
		}, [renderer, constantWidth])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeDepthWrite = depthWrite
			}
		}, [renderer, depthWrite])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeAntialias = antialias
			}
		}, [renderer, antialias])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeMinWidth = minWidth
			}
		}, [renderer, minWidth])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeMaxWidth = maxWidth
			}
		}, [renderer, maxWidth])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeAlpha = alpha
			}
		}, [renderer, alpha])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeFilteredInSaturation = filteredInSaturation
			}
		}, [renderer, filteredInSaturation])

		useEffect(() => {
			if (renderer) {
				renderer.config.edgeFilteredOutSaturation = filteredOutSaturation
			}
		}, [renderer, filteredOutSaturation])

		return null
	},
)
Edges.displayName = 'Edges'
