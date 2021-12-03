# @graspologic/layout-core

This library contains all the core logic for executing graph layout algorithms using Web Workers.

## Basic Usage

```js
// See below for other implementations of createWorker
function createWorker(type) {
	// A url to either
	//
	// OpenOrd:
	// @graspologic/layout-openord/dist/openord_worker.js
	//
	// or
	//
	// ForceAtlas2:
	// @graspologic/layout-fa2/dist/fa2_worker.js
	//
	const workerUrl =
		type === 'fa2'
			? 'https://path-to-fa2.worker.js'
			: 'https://path-to-open-ord.worker.js'
	return new Worker(workerUrl)
}

// Construct the layout manager which manages the layout worker scripts
const layoutManager = new LayoutWorkerManager(() => createWorker('fa2'))

// A layout tick was performed
layoutManager.on('progress', () => {
	// As the layout progresses, tell the graph renderer to rebind to the underlying data
	renderer.rebind()

	// Tell the renderer to re-fit to the graph
	renderer.zoomToGraph()
})

layoutManager.layout(renderer.graph)
```

### Webpack createWorker using worker-loader

Below is a basic implementation of creating workers for the LayoutWorkerManager.

> Note: This requires Webpack's [worker-loader](https://webpack.js.org/loaders/worker-loader/) to be installed.

```js
import FA2Worker from 'worker-loader!./@graspologic/layout-fa2/dist/fa2_worker.js'
import OpenOrdWorker from 'worker-loader!./@graspologic/layout-openord/dist/openord_worker.js'

/**
 * Creates a worker for the given type
 */
export function createWorker(type) {
	if (type === 'fa2') {
		return new FA2Worker()
	}
	return new OpenOrdWorker()
}
```

### Webpack createWorker using raw-loader

Below is a basic implementation of creating workers for the LayoutWorkerManager.

> Note: This requires Webpack's [raw-loader](https://webpack.js.org/loaders/raw-loader/) to be installed.

```js
// Loads the FA2 script as a raw string
const FA2_WORKER_SCRIPT = require('!raw-loader!@graspologic/layout-fa2/dist/fa2_worker.js')
	.default

// Create a blob for the worker script
const FA2_WORKER_BLOB = new Blob([FA2_WORKER_SCRIPT], {
	type: 'text/javascript',
})

// Create a blob url for the fa2 worker script
const FA2_WORKER_URL = window.URL.createObjectURL(FA2_WORKER_BLOB)

// Loads the OpenOrd script as a raw string
const OPEN_ORD_WORKER_SCRIPT = require('!raw-loader!@graspologic/layout-openord/dist/openord_worker.js')
	.default

// Create a blob for the worker script
const OPEN_ORD_WORKER_BLOB = new Blob([OPEN_ORD_WORKER_SCRIPT], {
	type: 'text/javascript',
})

// Create a blob url for the openORD worker script
const OPEN_ORD_WORKER_URL = window.URL.createObjectURL(OPEN_ORD_WORKER_BLOB)

/**
 * Creates a worker for the given type
 */
export function createWorker(type) {
	let url = OPEN_ORD_WORKER_URL
	if (type === 'fa2') {
		url = FA2_WORKER_URL
	}
	return new Worker(url)
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
