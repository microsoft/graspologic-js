/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphContainer } from '@graspologic/graph'
import { AnnealingClock } from './AnnealingClock'
import { DensityGrid } from './DensityGrid'
import { OpenOrdLayoutExecutor } from './OpenOrdLayoutExecutor'
import { OpenOrdConfiguration, DEFAULT_CONFIGURATION } from './types'

/**
 * @internal
 *
 * Creates an instance of the OpenOrdLayoutExector
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param globalObject The global object to use
 */
export function createInstance(
	graph: GraphContainer,
	configuration: Partial<OpenOrdConfiguration> = {},
	globalObject = window,
): OpenOrdLayoutExecutor {
	const finalConfig: OpenOrdConfiguration = {
		...DEFAULT_CONFIGURATION,
		...configuration,
	}
	return new OpenOrdLayoutExecutor(
		graph,
		finalConfig,
		new AnnealingClock(configuration.edgeCut, configuration.schedule),
		globalObject,
		new DensityGrid(),
	)
}
