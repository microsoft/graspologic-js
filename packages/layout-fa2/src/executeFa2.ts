/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createInstance } from './factory'
import { FA2Configuration, FA2TickProgress } from './types'
import { GraphContainer } from '@graspologic/graph'
import { OnTickHandler } from '@graspologic/layout-core'

/**
 * @internal
 *
 * Executes the FA2 algorithm
 * @param graph The graph to layout
 * @param configuration The configuration for the layout
 * @param onTick The callback for when an iteration of the layout was performed
 * @returns A promise that resolves when the layout is completed
 */
export function executeFa2(
	graph: GraphContainer,
	configuration: Partial<FA2Configuration> = {},
	onTick: OnTickHandler<FA2TickProgress> = () => null,
): Promise<void> {
	const executor = createInstance(graph, configuration, window)
	const subscription = executor.on('tick', onTick)

	// Execute the Layout
	return executor.execute().then(() => subscription())
}
