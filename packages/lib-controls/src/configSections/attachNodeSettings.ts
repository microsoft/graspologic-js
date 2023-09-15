/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphRenderer } from '@graspologic/renderer'
import type { GUI } from 'dat.gui'

export interface NodeSettingsConfig {
	minRadiusRange: [number, number]
	maxRadiusRange: [number, number]
}

const DEFAULT_SETTINGS: NodeSettingsConfig = {
	minRadiusRange: [0.01, 50],
	maxRadiusRange: [0.01, 100],
}

/**
 * @internal
 *
 * Attaches the "Node" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export function attachNodeSettings(
	gui: GUI,
	renderer: GraphRenderer,
	{
		minRadiusRange = DEFAULT_SETTINGS.maxRadiusRange,
		maxRadiusRange = DEFAULT_SETTINGS.maxRadiusRange,
	}: Partial<NodeSettingsConfig> = {},
): () => void {
	const folder = gui.addFolder('Nodes')
	folder.add(renderer.config, 'drawNodes').name('Draw Nodes')
	folder.add(renderer.config, 'hideNodesOnMove').name('Hide Nodes Move')
	folder.add(renderer.config, 'nodeOutline').name('Node Outlines')
	folder
		.add(renderer.config, 'nodeMinRadius', minRadiusRange[0], minRadiusRange[1])
		.name('Node Min Radius')
	folder
		.add(renderer.config, 'nodeMaxRadius', maxRadiusRange[0], maxRadiusRange[1])
		.name('Node Max Radius')
	return () => gui.removeFolder(folder)
}
