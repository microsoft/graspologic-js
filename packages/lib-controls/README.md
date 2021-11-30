# @graspologic/render-controls

Library that provides a set of dat.gui controls for manipulating the settings for the graph renderer

## Usage

### React

This library should not be used directly if you are using React. Instead, please see [@graspologic/controls-react](../controls-react/README.md) for instructions on how to configure the settings in a React environment.

### Standalone

```js
import { GraphRenderer } from '@graspologic/renderer'
import {
	attachDisplaySettings,
	attachEdgeSettings,
	attachNodeSettings,
} from '@graspologic/render-controls'
import * as dat from 'dat.gui'

/**
 * Attaches the config settings to the Settings Pane
 */
export function attachSettings(gui: dat.GUI, renderer: GraphRenderer) {
	// Adds the "Nodes" configuration section to the Settings Pane
	attachNodeSettings(gui, renderer)

	// Adds the "Edges" configuration section to the Settings Pane
	attachEdgeSettings(gui, renderer)

	// Adds the "Display" configuration section to the Settings Pane
	attachDisplaySettings(gui, renderer)
}
```

See the [API documentation](./dist/docs/globals.md) or [examples](../../../examples) for additional examples.
