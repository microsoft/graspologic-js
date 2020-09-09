# @graspologic/graph

Provides a set of graph data structures, used with the layout engine and the renderer.

## Usage

Below are several common usage patterns for this library.

### Dynamically adding nodes to your graph

#### Standalone

```js
import { NodeImpl } from '@graspologic/graph'
import { WebGLGraphRenderer } from '@graspologic/renderer'
const renderer = WebGLGraphRenderer.createInstance(/*...*/)

// Create the node
const node = new NodeImpl()

// Position it
node.position = [10, 10, 0]

// Size it
node.radius = 10

// Finally, add it to the scene
renderer.scene.add(node)
```

#### React

```jsx
import React, { useEffect, useRef } from 'react'
import { NodeImpl } from '@graspologic/graph'
import { GraphView } from '@graspologic/react'
import { GraphRenderer } from '@graspologic/renderer'
export const MyRenderer: React.FC = () => {
	const graphRef = useRef<GraphRenderer>(null)
	useEffect(() => {
		if (graphRef.current) {
			// Create the node
			const node = new NodeImpl()

			// Position it
			node.position = [10, 10, 0]

			// Size it
			node.radius = 10

			// Finally, add it to the scene
			graphRef.current!.scene.add(node)
		}
	}, [graphRef])
	return (
		<GraphView ref={graphRef} data={{ nodes: [], edges: [] }}/>
	)
}
```

### Dynamically adding edges to your graph

#### Standalone

```js
import { EdgeImpl } from '@graspologic/graph'
import { WebGLGraphRenderer } from '@graspologic/renderer'
const renderer = WebGLGraphRenderer.createInstance(/*...*/)

// Create the edge
const edge = new EdgeImpl()

// Position the edge
edge.sourcePosition = [0, 0, 0]
edge.targetPosition = [10, 10, 0]

// Add it to the scene
renderer.scene.add(edge)
```

#### React

```jsx
import React, { useEffect, useRef } from 'react'
import { EdgeImpl } from '@graspologic/graph'
import { GraphView } from '@graspologic/react'
import { GraphRenderer } from '@graspologic/renderer'
export const MyRenderer: React.FC = () => {
	const graphRef = useRef<GraphRenderer>(null)
	useEffect(() => {
		if (graphRef.current) {
			// Create the edge
			const edge = new EdgeImpl()

			// Position the edge
			edge.sourcePosition = [0, 0, 0]
			edge.targetPosition = [10, 10, 0]

			// Add it to the scene
			graphRef.current!.scene.add(edge)
		}
	}, [graphRef])
	return (
		<GraphView ref={graphRef} data={{ nodes: [], edges: [] }}/>
	)
}
```

### Dynamically animating the edges of your graph

#### Standalone

```js
import { EdgeImpl } from '@graspologic/graph'
import { WebGLGraphRenderer } from '@graspologic/renderer'
const renderer = WebGLGraphRenderer.createInstance(/*...*/)

// Add an edge to the scene
// and assign some start positions
const edge = new EdgeImpl()
edge.sourcePosition = [0, 0, 0]
edge.targetPosition = [10, 10, 0]
renderer.scene.add(edge)

// Animate from the original position to this one over 1000ms
edge.animateSourcePosition([100, 100, 0], 1000)
```

#### React

```jsx
import React, { useEffect, useRef } from 'react'
import { EdgeImpl } from '@graspologic/graph'
import { GraphView } from '@graspologic/react'
import { GraphRenderer } from '@graspologic/renderer'
export const MyRenderer: React.FC = () => {
	const graphRef = useRef<GraphRenderer>(null)
	useEffect(() => {
		if (graphRef.current) {

			// Add an edge to the scene
			// and assign some start positions
			const edge = new EdgeImpl()
			edge.sourcePosition = [0, 0, 0]
			edge.targetPosition = [10, 10, 0]
			graphRef.current!.scene.add(edge)

			// Animate from the original position to this one over 1000ms
			edge.animateSourcePosition([100, 100, 0], 1000)
		}
	}, [graphRef])
	return (
		<GraphView ref={graphRef} data={{ nodes: [], edges: [] }}/>
	)
}
```

### Dynamically animating the nodes of your graph

#### Standalone

```js
import { NodeImpl } from '@graspologic/graph'
import { WebGLGraphRenderer } from '@graspologic/renderer'

const renderer = WebGLGraphRenderer.createInstance(/*...*/)

// Add an node to the scene
// and assign some start positions
const node = new NodeImpl()
node.position = [10, 10, 0]
node.radius = 10
renderer.scene.add(node)

// Animate from the original position to this one over 1000ms
node.animatePosition([100, 100, 0], 1000)
```

#### React

```jsx
import React, { useEffect, useRef } from 'react'
import { NodeImpl } from '@graspologic/graph'
import { GraphView } from '@graspologic/react'
import { GraphRenderer } from '@graspologic/renderer'

export const MyRenderer: React.FC = () => {
	const graphRef = useRef < GraphRenderer > null
	useEffect(() => {
		if (graphRef.current) {
			// Add an node to the scene
			// and assign some start positions
			const node = new NodeImpl()
			node.position = [10, 10, 0]
			node.radius = 10
			renderer.scene.add(node)

			// Animate from the original position to this one over 1000ms
			node.animatePosition([100, 100, 0], 1000)
		}
	}, [graphRef])
	return <GraphView ref={graphRef} data={{ nodes: [], edges: [] }} />
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
