/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { action } from '@storybook/addon-actions'
import React, { memo, useState, useCallback } from 'react'
import colorizer from '../data/categoricalColorizer'
import { GraphContainer, InputGraph } from '@graspologic/graph'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	HandleNodeClicks,
	NodeSetHighlight,
} from '@graspologic/react'
import {
	SettingsPane,
	DisplaySettings,
	EdgeSettings,
	NodeSettings,
} from '@graspologic/render-controls-react'

export interface FullyInteractiveGraphProps {
	data: GraphContainer | InputGraph
}

export const FullyInteractiveGraph: React.FC<FullyInteractiveGraphProps> = memo(
	({ data }) => {
		const [vertexIds, setVertexIds] = useState<string[]>([])
		const handleVertexClick = useCallback(
			(id: string | undefined) => {
				action('click')(id)
				if (id) {
					if (vertexIds.indexOf(id) === -1) {
						setVertexIds([...vertexIds, id])
					} else {
						setVertexIds(vertexIds.filter(v => v !== id))
					}
				}
			},
			[vertexIds, setVertexIds],
		)

		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={data}>
					<Axes />
					<Camera interactive />
					<HighlightHoveredNode />
					<HandleNodeClicks onClick={handleVertexClick} />
					<NodeSetHighlight vertexIds={vertexIds} />
					<SettingsPane>
						<DisplaySettings />
						<NodeSettings />
						<EdgeSettings />
					</SettingsPane>
				</GraphView>
			</div>
		)
	},
)
FullyInteractiveGraph.displayName = 'FullyInteractiveGraph'
