# @graspologic/renderer

Contains the **graspologic-js** graph renderer.

React bindings are also available [here](../react/README.md).

## Basic Usage

```js
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
	const graph = GraphContainer.intern(data)

	// Create a renderer and add it to the container
	const renderer = WebGLGraphRenderer.createInstance(graph, {
		width,
		height,

		// Set the min/max width of the edges to be a constant width
		edgeMinWidth: 5,
		edgeMaxWidth: 5,

		// All edges are completely opaque
		edgeAlpha: 1,
	})

	// create nodes renderable
	const nodes = new NodesRenderable(renderer.gl!, renderer.config)

	// create edges renderable
	const edges = new EdgesRenderable(renderer.gl!, renderer.config)

	renderer.scene.addRenderable(edges, true)
	renderer.scene.addRenderable(nodes, true)

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

## Extended Usage

```js
import { WebGLGraphRenderer, VertexSetRenderable } from '@graspologic/renderer'
import { GraphContainer } from '@graspologic/graph'
import { exampleData, utils } from 'docs'

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

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
