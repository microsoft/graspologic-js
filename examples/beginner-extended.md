---
menu: Examples
name: Beginner -- Extended
---

This example shows a more fully featured use of **graspologic-js**

## React

```js edit=true previewHeight=300
import React, { useState, useCallback, useMemo } from 'react'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	HandleNodeClicks,
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
import { exampleData, utils } from 'docs'

export default	() => {
	const data = useMemo(() => exampleData.smallGraph(), [])

	// A function which takes a "group" property from a node and returns a color
	const categoricalColorizer = useMemo(() => utils.createColorizer(), [])
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
		<GraphView style={{ width: 600, height: 300 }} data={data}>
			{ /* Displays a set of Axes on the graph */}
			<Axes />

			{ /* Enables controlling of certain aspects of the camera */}
			<Camera interactive />

			{ /* Enables highlighting of the node that is being hovered over */}
			<HighlightHoveredNode />

			{ /* Enables handling of node click events */}
			<HandleNodeClicks onClick={handleVertexClick} />

			{/* Highlights the given set of node ids */}
			<NodeSetHighlight vertexIds={nodeIds} />

			{ /* Controls rendering of edges */ }
			<Edges minWidth={5} maxWidth={5} alpha={1}/>

			{ /* Controls rendering of nodes */ }
			<Nodes minRadius={5} maxRadius={5} color={categoricalColorizer} />

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

## Standalone

```js edit=true previewHeight=300
import {
	WebGLGraphRenderer,
	enableClickEvents,
	VertexSetRenderable,
} from '@graspologic/renderer'
import { GraphContainer } from '@graspologic/graph'
import { exampleData, utils } from 'docs'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { NodesRenderable } from '@graspologic/renderables-nodes'

function createRenderer(data, width, height) {
	const graph = GraphContainer.intern(data)

	// A function which takes a "group" property from a node and returns a color
	const categoricalColorizer = utils.createColorizer()

	for (const node in graph.nodes) {
		node.color = categoricalColorizer(node)
	}

	// Create a renderer and add it to the container
	const renderer = WebGLGraphRenderer.createInstance(graph, {
		width,
		height,

		// Set the min/max width of the edges to be a constant width
		edgeMinWidth: 5,
		edgeMaxWidth: 5,

		// All edges are completely opaque
		edgeAlpha: 1,

		// Control the sizing of the nodes
		nodeMinRadius: 5,
		nodeMaxRadius: 5,
	})

	// create nodes renderable
	const nodes = new NodesRenderable(renderer.gl!, renderer.config)

	// create edges renderable
	const edges = new EdgesRenderable(renderer.gl!, renderer.config)

	renderer.scene.addRenderable(edges, true)
	renderer.scene.addRenderable(nodes, true)

	// Enable the click events
	enableClickEvents(renderer)

	// Add a renderer that highlights hovered nodes
	const renderable = new VertexSetRenderable(renderer.gl)
	renderable.color = [0.5, 0.5, 0.8, 1]
	renderer.scene.addRenderable(renderable)
	renderer.on('node:hover', hovered => {
		renderable.setData(hovered ? [hovered] : [])
	})

	// Start rendering
	renderer.start()

	return renderer
}

const GRAPH_DATA = exampleData.smallGraph()
export default () => {
	// Create the renderer
	const renderer = createRenderer(GRAPH_DATA, 600, 300)
	let selectedNodeIds = []

	renderer.on('node:click', id => {
		console.log('click', id)
		if (id) {
			if (selectedNodeIds.indexOf(id) === -1) {
				selectedNodeIds = [...selectedNodeIds, id]
			} else {
				selectedNodeIds = selectedNodeIds.filter(v => v !== id)
			}
		}
	})

	// Return the renderer's canvas to the docs site, so it can be viewed
	return renderer.view
}
```

## Output

![Output](./images/extended.png)
