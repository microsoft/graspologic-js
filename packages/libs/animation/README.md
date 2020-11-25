# @graspologic/animation

Provides a set of utilities for animating `@graspologic/renderer` primitives.

## Usage

```js
import { createAnimationUtil, AnimationUtil } from '@graspologic/animation'
import { GraphRenderer } from '@graspologic/renderer'

// ...

// Create an instance of the animation util that can be re-used
const utils: AnimationUtil = createAnimationUtil()

/**
 * Randomizes the renderer's nodes/edges positions and colors
 */
export function randomizeRenderer(renderer: GraphRenderer) {
	for (const node of renderer.graph.nodes) {
		const x = Math.random()
		const y = Math.random()
		const z = Math.random()

		// Animates the nodes color from it's previous color to 0xFF00BBFF over 1000ms
		utils.animatePosition(node, 'position', [x, y, z], 1000)

		// Animates the nodes color from it's previous color to 0xFF00BBFF over 500ms
		utils.animateColor(node, 'color', 0xff00bbff, 500)
	}

	for (const edge of renderer.graph.edges) {
		const sourceX = Math.random()
		const sourceY = Math.random()
		const sourceZ = Math.random()
		const targetX = Math.random()
		const targetY = Math.random()
		const targetZ = Math.random()

		// Animates the edge's sourcePosition to the new source position over 2000ms
		utils.animatePosition(
			edge,
			'sourcePosition',
			[sourceX, sourceY, sourceZ],
			2000,
		)

		// Animates the edge's targetPosition immediately, since no duration was passed in
		utils.animatePosition(edge, 'targetPosition', [targetX, targetY, targetZ])
	}
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
