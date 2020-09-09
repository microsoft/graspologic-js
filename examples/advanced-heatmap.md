---
menu: Examples
name: Advanced -- Heatmap
---

Because of the flexibility of **graspologic-js**, other types of charts can be emulated. In this example, we show how to implement a basic heat map.

```js edit=true previewHeight=200
import { utils } from 'docs'

function convertHeatMapToGraphData(heatmap) {
	const nodes = []
	const diameter = 2

	for (let rowIdx = 0; rowIdx < heatmap.length; rowIdx++) {
		const row = heatmap[rowIdx]
		for (let colIdx = 0; colIdx < row.length; colIdx++) {
			const value = row[colIdx]
			const r = Math.floor((1 - value) * 255)
			const g = 255
			const b = r
			nodes.push({
				x: colIdx * diameter,
				y: -(rowIdx * diameter),
				radius: diameter / 2,
				shape: 'square',

				// BBGGRR
				color: (b << 16) + (g << 8) + r,
			})
		}
	}

	return {
		nodes,
		edges: [],
	}
}

export default () => {
	const heatmap = [
		[0.1, 0.2, 1.0],
		[0.0, 0.5, 0.25],
		[0.75, 1.0, 0.5],
		[0.25, 0.25, 0.5],
	]

	// Use your renderer reference
	const renderer = utils.createRenderer(
		200,
		200,
		convertHeatMapToGraphData(heatmap),

		// Disable the borders around the nodes
		{ nodeOutline: false },
	)

	// Return the view so we can render it in the docs
	return renderer.view
}
```

## Output

![Output](./images/heatmap.png)
