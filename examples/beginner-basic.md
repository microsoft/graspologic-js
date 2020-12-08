---
menu: Examples
name: Beginner -- Basic
---

These examples show how to instantiate a basic graph renderer instance

## React

```js edit=true previewHeight=200
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

## Standalone

```js edit=true previewHeight=200
import { WebGLGraphRenderer } from '@graspologic/renderer'
import { GraphContainer } from '@graspologic/graph'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { NodesRenderable } from '@graspologic/renderables-nodes'

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

function createRenderer(data, width, height) {
	// Create a renderer and add it to the container
	const renderer = WebGLGraphRenderer.createInstance({
		width,
		height,

		// Set the min/max width of the edges to be a constant width
		edgeMinWidth: 5,
		edgeMaxWidth: 5,

		// All edges are completely opaque
		edgeAlpha: 1,
	})

	// create nodes renderable
	const nodes = new NodesRenderable(gl!, config)

	// create edges renderable
	const edges = new EdgesRenderable(gl!, config)

	renderer.scene.addRenderable(edges, true)
	renderer.scene.addRenderable(nodes, true)

	// Load the dataset
	renderer.load(GraphContainer.intern(data))

	// Start rendering
	renderer.start()

	return renderer
}

export default () => {
	// Create the renderer
	const renderer = createRenderer(GRAPH_DATA, 200, 200)

	// Return the renderer's canvas to the docs site, so it can be viewed
	return renderer.view
}
```

## Output

![Output](./images/basic.png)
