# @graspologic/render-controls-react

Provides a set of controls for adjusting how the graph renderer renders.

## Usage

```jsx
import React from 'react'
import { GraphView } from '@graspologic/renderer'
import {
	NodeSettings,
	EdgeSettings,
	DisplaySettings,
	SettingsPane,
} from '@graspologic/render-controls-react'
export const MyGraphComponent: React.FC = () => {
	return (
		<GraphView data={{ nodes: [], edges: [] }}>
			{/* This will attach the settings pane to the graph view */}
			<SettingsPane>
				{/* This will add the "Display" section to the settings pane */}
				<DisplaySettings />

				{/* This will add the "Node" section to the settings pane */}
				<NodeSettings />

				{/* This will add the "Edge" section to the settings pane */}
				<EdgeSettings />
			</SettingsPane>
		</GraphView>
	)
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
