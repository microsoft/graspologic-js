# @graspologic/react

Contains the react bindings for the **graspologic-js** renderer.

## Basic Usage

```jsx
import React from 'react'
import { GraphView, Edges, Nodes } from '@graspologic/react'

// Simple graph dataset
const GRAPH_DATA = {
	nodes: [
		{
			id: 'A',
			x: -10,
			y: 10,
			z: 0,
			radius: 5,

			// Format 0xBBGGRR
			color: 0x00ff00,
		},
		{
			id: 'B',

			x: 10,
			y: 10,
			z: 0,
			radius: 5,

			// Format 0xBBGGRR
			color: 0xff0000,
		},
	],
	edges: [
		{
			source: 'A',
			target: 'B',
			weight: 1,
		},
	],
}

export default () => {
	return (
		<GraphView style={{ width: 200, height: 200 }} data={GRAPH_DATA}>
			<Nodes />
			<Edges minWidth={5} maxWidth={5} alpha={1} />
		</GraphView>
	)
}
```

## Extended Usage

```jsx
import React, { useState, useCallback, useMemo } from 'react'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	NodeSetHighlight,
	Edges,
	Nodes,
} from '@graspologic/react'
import {
	SettingsPane,
	DisplaySettings,
	EdgeSettings,
	NodeSettings,
} from '@graspologic/render-controls-react'

export default	() => {
	const data = useMemo(() => getMyGraphData(), [])

	// A function which takes a "group" property from a node and returns a color
	const categoricalColorizer = useMemo(() => createColorizer(), [])
	const [nodeIds, setNodeIds] = useState<string[]>([])
	const handleVertexClick = useCallback(
		(id: string | undefined) => {
			console.log('click', id)
			if (id) {
				if (nodeIds.indexOf(id) === -1) {
					setNodeIds([...nodeIds, id])
				} else {
					setNodeIds(nodeIds.filter(v => v !== id))
				}
			}
		},
		[nodeIds, setNodeIds],
	)

	return (
		<GraphView style={{ width: 600, height: 300 }} data={data} colorizer={categoricalColorizer}>
			{ /* Displays a set of Axes on the graph */}
			<Axes />

			{ /* Enables controlling of certain aspects of the camera */}
			<Camera interactive />

			{ /* Enables highlighting of the node that is being hovered over */}
			<HighlightHoveredNode />

			{/* Highlights the given set of node ids */}
			<NodeSetHighlight vertexIds={nodeIds} />

			{ /* Controls rendering of edges */ }
			<Edges minWidth={5} maxWidth={5} alpha={1}/>

			{ /* Controls rendering of nodes */ }
			<Nodes onNodeClick={handleVertexClick} minRadius={5} maxRadius={5} />

			{/* Adds a settings pane that allows the user to configure the graph renderer on the fly */}
			<SettingsPane>

				{/* Adds a display settings section to the settings pane */}
				<DisplaySettings />

				{/* Adds a node settings section to the settings pane */}
				<NodeSettings />

				{/* Adds a edge settings section to the settings pane */}
				<EdgeSettings />
			</SettingsPane>
		</GraphView>
	)
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
