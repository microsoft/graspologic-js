---
menu: Examples
name: Advanced -- OpenOrd Layout
---

> Note: **graspologic-js** layout engine is compatible only with browsers which support SharedArrayBuffer.

In this example, we'll show how you can apply a OpenOrd layout to your graph.

First off, we need to get a reference to the graph renderer, see [Dynamic Graph Example](/src-examples-intermediate-dynamic-graph#Getting_a_renderer_reference) for an example on how to retrieve a reference.

```js edit=true previewHeight=500
import { LayoutWorkerManager } from '@graspologic/layout-core'
import { utils, exampleData } from 'docs'
import { enablePanZoomEvents } from '@graspologic/renderer'

export default () => {
	// Get your reference to your renderer
	const renderer = utils.createRenderer(
		500,
		500,
		exampleData.mediumGraph({ randomize: true }),
		{
			drawEdges: false,
			autoBind: false,
			colorize: true,
		},
	)

	enablePanZoomEvents(renderer)

	// This is a url to the `@graspologic/layout-openord/dist/openord_worker.js` script
	const workerUrl = utils.getLayoutUrl('openord')

	// Construct the layout manager which manages the layout worker scripts
	const layoutManager = new LayoutWorkerManager(() => new Worker(workerUrl))

	// A layout tick was performed
	layoutManager.on('progress', () => {
		// As the layout progresses, tell the graph renderer to rebind to the underlying data
		renderer.rebind()

		// Tell the renderer to re-fit to the graph
		renderer.zoomToGraph()
	})

	layoutManager.layout(renderer.graph)

	return renderer.view
}
```

## Output

![Output](./images/openord.gif)
