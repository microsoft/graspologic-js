/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GUI } from 'dat.gui'
import { GraphRenderer } from '@graspologic/renderer'

export interface DisplaySettingsConfig {
	interpolationTimeRange: [number, number]
}

const DEFAULT_SETTINGS: DisplaySettingsConfig = {
	interpolationTimeRange: [10, 10000],
}

/**
 * @internal
 *
 * Attaches the "Display" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export function attachDisplaySettings(
	gui: GUI,
	renderer: GraphRenderer,
	{
		interpolationTimeRange = DEFAULT_SETTINGS.interpolationTimeRange,
	}: Partial<DisplaySettingsConfig> = {},
): () => void {
	const folder = gui.addFolder('Display')
	folder.add(renderer.config, 'cornerAxes').name('Axes in Corner')
	folder.add(renderer.config, 'is3D').name('3D')
	folder.add(renderer.config, 'hideDeselected').name('Hide Deselected')
	folder
		.add(
			renderer.config,
			'interpolationTime',
			interpolationTimeRange[0],
			interpolationTimeRange[1],
		)
		.name('Interpolation Time')
	folder
		.addColor(renderer.config, 'hoverHighlightColor')
		.name('Highlight Color')

	return () => gui.removeFolder(folder)
}
