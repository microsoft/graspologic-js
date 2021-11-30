/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react'
import { memo, useMemo, useEffect, useRef } from 'react'
import colorizer from '../data/categoricalColorizer'
import { GraphContainer, InputGraph } from '@graspologic/graph'
import { LayoutWorkerManager } from '@graspologic/layout-core'
import { FA2Configuration, FA2TickProgress } from '@graspologic/layout-fa2'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	Nodes,
} from '@graspologic/react'
import {
	SettingsPane,
	DisplaySettings,
	NodeSettings,
} from '@graspologic/render-controls-react'
import { GraphRenderer } from '@graspologic/renderer'

// Worker content
function getWorker() {
	return require('worker-loader!@graspologic/layout-fa2/src/worker').default()
}

export interface ForceAtlas2GraphProps {
	data: InputGraph
	scale: number
}

export const ForceAtlas2Graph: React.FC<ForceAtlas2GraphProps> = memo(
	({ data, scale }) => {
		const ref = useRef<GraphRenderer>(null)
		const internedData = useInternedGraphData(data)
		const manager = useFA2LayoutManager()
		useEffect(() => {
			console.log('RUN LAYOUT')
			if (!internedData) {
				return
			}
			manager.on('progress', () => ref.current?.rebind())
			manager.configure({
				scalingRatio: scale,
				slowDown: 1.8,
				targetIterations: 1000,
			})
			manager.layout(internedData)
		}, [manager, scale, internedData])

		return internedData ? (
			<div className="graph-pane-container">
				<GraphView
					className="graph-pane"
					colorizer={colorizer}
					data={internedData}
					ref={ref}
					drawEdges={false}
				>
					<Axes />
					<Camera interactive />
					<HighlightHoveredNode />
					<Nodes minRadius={1} maxRadius={5} />
					<SettingsPane>
						<DisplaySettings />
						<NodeSettings />
					</SettingsPane>
				</GraphView>
			</div>
		) : null
	},
)
ForceAtlas2Graph.displayName = 'ForceAtlas2Graph'

function useFA2LayoutManager() {
	return useMemo<LayoutWorkerManager<FA2Configuration, FA2TickProgress>>(
		() => new LayoutWorkerManager(getWorker),
		[],
	)
}

function useInternedGraphData(data: InputGraph) {
	return useMemo(
		() =>
			data
				? GraphContainer.intern(data, {
						shareable: true,
						randomize: [-1000, 1000, -1000, 1000],
				  })
				: undefined,
		[data],
	)
}
