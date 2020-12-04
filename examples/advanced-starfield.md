---
menu: Examples
name: Advanced -- Starfield
---

Because of the flexibility of **graspologic-js**, other non-chart related visualizations can be produced, such as a starfield.

```js edit=true previewHeight=1000
import { AnimatableNodeImpl } from '@graspologic/graph'
import { CameraAdjustmentMode } from '@graspologic/renderer'
import { utils } from 'docs'

function randComp() {
	return Math.random() * 2000 - 1000
}

function addStarfield(renderer, nodeCount) {
	const nodes = Array.from({ length: nodeCount }).map((a, i) => {
		const n = new AnimatableNodeImpl()
		n.position = [randComp() * 2, randComp() * 2, -(Math.random() * 100000)]
		n.color = 0xffffffff
		n.radius = 5
		return n
	})

	renderer.graph.add(nodes)
}

export default () => {
	const nodeCount = 100000
	const speed = 1
	const renderer = utils.createRenderer(1000, 1000, undefined, {
		is3D: true,
		// interpolationTime: 0,
		backgroundColor: [0, 0, 0, 1.0],
		nodeOutline: false,
		cameraAdjustmentMode: CameraAdjustmentMode.None,
	})

	addStarfield(renderer, nodeCount)

	// Define the initial view bounds of the camera to match the space of our starfield
	renderer.camera.fitToView(
		{
			x: { min: -1000, max: 1000 },
			y: { min: -1000, max: 1000 },
		},
		0,
	)

	// Slowly move the camera in towards the extents
	renderer.camera.moveTo(0, 0, 100000, 100000 / speed)

	// An alternate way of pulling off a starfield, is to keep the camera stationary, but move the nodes from in front of the camera to behind it

	return renderer.view
}
```

## Output

![Output](./images/starfield.gif)
