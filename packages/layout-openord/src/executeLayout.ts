/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '@graspologic/graph'
import { OnTickHandler } from '@graspologic/layout-core'
import { createInstance } from './factory'
import { OpenOrdConfiguration, OpenOrdTickProgress } from './types'

/**
 * @internal
 *
 * Runs the openOrd layout algorithm
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param onTick A callback for when the layout has performed an interation
 * @param globalObject The global object
 * @returns A promise for when the layout is complete
 */
export function openOrd(
	graph: GraphContainer,
	configuration: Partial<OpenOrdConfiguration> = {},
	onTick: OnTickHandler<OpenOrdTickProgress> = () => null,
	globalObject: any = window,
): Promise<void> {
	const oord = createInstance(graph, configuration, globalObject)
	const subscription = oord.on('tick', onTick)

	// Execute the Layout
	return oord.execute().then(() => subscription())
}
