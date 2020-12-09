# graspologic-js

![CI](https://github.com/microsoft/graspologic-js/workflows/CI/badge.svg)

## 📄Overview

**graspologic-js** is a high-performance graph toolkit for the web.

### Features

- A fast, memory-efficient, graph renderer.
  - **WebGL** based engine that can handle hundreds of thousands or even millions of nodes.
  - Utilizes **SharedArrayBuffer** for efficient and fast memory storage that can be shared between the UI thread and Web Workers, allowing for blazing fast layout algorithms that display output in real-time.
  - Supports [**ReactJS**](https://reactjs.org/) or standalone.
- Contains experimental implementations of a few popular graph layout algorithms that work directly with the graph renderer.

**graspologic-js** is a companion library to [**topologic**](https://github.com/microsoft/topologic), which is a python library for intelligently building networks and network embeddings, and for analyzing connected data.

## 🌐Browser Compatibility

Any browser which supports WebGL2. To see which browsers support WebGL2, please see [caniuse.com](https://caniuse.com/#feat=webgl2)

It is recommended that you use a JavaScript bundling tool, such as Webpack or Browserify, as **graspologic-js** only exports CommonJS and ECMAScript module formats. It does not provide a web-friendly bundle in order to allow bundling tools to use tree-shaking to minimize dependency size.

It is also recommended that your bundler targets the following browser versions in order to minimize the amount of polyfills, which can adversely affect performance:

- Edge 79+
- Firefox 60+
- Chrome 72+

## 🔥 2 Minute Quick Start

### React

Install the `@graspologic/react` dependency

```sh
npm install @graspologic/react
```

Add the GraphView component to your app

```js
import React, { useMemo } from 'react'
import { GraphView, Nodes, Edges } from '@graspologic/react'
export default () => {
	const data = useMemo(
		() => ({
			// Pass in your data here
			nodes: [],
			edges: [],
		}),
		[],
	)
	return (
		<GraphView style={{ width: '100%', height: '100%' }} data={data}>
			<Nodes />
			<Edges />
		</GraphView>
	)
}
```

### Standalone

Install the `@graspologic/renderer` dependency

```sh
npm install @graspologic/renderer
```

```js
import { WebGLGraphRenderer } from '@graspologic/renderer'
import { GraphContainer } from '@graspologic/graph'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { NodesRenderable } from '@graspologic/renderables-nodes'
function createRenderer(width, height) {
	const graph =
		GraphContainer.intern({
			// Pass in your data here
			nodes: [],
			edges: [],
		})

	// Create a renderer and add it to the container
	const renderer = WebGLGraphRenderer.createInstance(graph, {
		width,
		height,
	})

	// create nodes renderable
	const nodes = new NodesRenderable(renderer.gl!, renderer.config)

	// create edges renderable
	const edges = new EdgesRenderable(renderer.gl!, renderer.config)

	renderer.scene.addRenderable(edges, true)
	renderer.scene.addRenderable(nodes, true)

	// Start rendering
	renderer.start()

	// Return the container
	return renderer
}

// ...elsewhere in your app

// Instantiate the renderer
const renderer = createRenderer(500, 500)

// Add the renderer's canvas to your container element
containerElement.appendChild(renderer.view)
```

You can see more examples in the [examples](./examples) folder.

## ✅ License

Under the permissive **MIT** license

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
