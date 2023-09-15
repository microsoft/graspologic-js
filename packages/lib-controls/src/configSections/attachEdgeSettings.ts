/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphRenderer } from '@graspologic/renderer'
import type { GUI } from 'dat.gui'

export interface EdgeSettingsConfig {
	alphaRange: [number, number]
	minWidthRange: [number, number]
	maxWidthRange: [number, number]
}

const DEFAULT_SETTINGS: EdgeSettingsConfig = {
	alphaRange: [0, 1],
	minWidthRange: [0.1, 50],
	maxWidthRange: [0.1, 50],
}

/**
 * @internal
 *
 * Attaches the "Edge" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export function attachEdgeSettings(
	gui: GUI,
	renderer: GraphRenderer,
	{
		alphaRange = DEFAULT_SETTINGS.alphaRange,
		minWidthRange = DEFAULT_SETTINGS.minWidthRange,
		maxWidthRange = DEFAULT_SETTINGS.maxWidthRange,
	}: Partial<EdgeSettingsConfig> = {},
): () => void {
	const folder = gui.addFolder('Edges')
	folder.add(renderer.config, 'drawEdges').name('Draw Edges')
	folder.add(renderer.config, 'hideEdgesOnMove').name('Hide Edges Move')
	folder.add(renderer.config, 'edgeConstantWidth').name('Constant Edge Width')
	folder.add(renderer.config, 'edgeDepthWrite').name('Depth Write')
	folder.add(renderer.config, 'edgeAntialias').name('Edge Antialias')
	folder
		.add(renderer.config, 'edgeAlpha', alphaRange[0], alphaRange[1])
		.name('Edge Alpha')
	folder
		.add(renderer.config, 'edgeMinWidth', minWidthRange[0], minWidthRange[1])
		.name('Edges Min Width')
	folder
		.add(renderer.config, 'edgeMaxWidth', maxWidthRange[0], maxWidthRange[1])
		.name('Edges Max Width')
	return () => gui.removeFolder(folder)
}
