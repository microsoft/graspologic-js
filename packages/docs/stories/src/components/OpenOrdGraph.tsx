/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import { memo, useMemo, useEffect, useRef } from 'react'
import * as React from 'react'
import colorizer from '../data/categoricalColorizer'
import { GraphContainer, InputGraph } from '@graspologic/graph'
import {
	LayoutWorkerManager,
	workerFactoryFromScript,
} from '@graspologic/layout-core'
import {
	OpenOrdConfiguration,
	OpenOrdTickProgress,
} from '@graspologic/layout-openord'
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
const workerScript = require('!!raw-loader!@graspologic/layout-openord/dist/openord_worker.js')
	.default

export interface OpenOrdGraphProps {
	data: InputGraph
}

export const OpenOrdGraph: React.FC<OpenOrdGraphProps> = memo(({ data }) => {
	const ref = useRef<GraphRenderer>(null)
	const internedData = useInternedGraphData(data)
	const manager = useOpenOrdLayoutManager()
	useEffect(() => {
		if (!internedData) {
			return
		}
		manager.onProgress.subscribe(() => ref.current?.rebind())
		manager.layout(internedData)
	}, [manager, internedData])

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
})
OpenOrdGraph.displayName = 'OpenOrdGraph'

function useOpenOrdLayoutManager() {
	return useMemo<
		LayoutWorkerManager<OpenOrdConfiguration, OpenOrdTickProgress>
	>(() => new LayoutWorkerManager(workerFactoryFromScript(workerScript)), [])
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
