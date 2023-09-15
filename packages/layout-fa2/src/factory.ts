/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphContainer } from '@graspologic/graph'
import { CountdownClock } from '@graspologic/layout-core'
import { FA2LayoutExecutor } from './FA2LayoutExecutor.js'
import type { FA2Configuration} from './types.js';
import { DEFAULT_CONFIGURATION } from './types.js'

/**
 * @internal
 *
 * Creates a new instance of the ForceAtlas2 layout executor
 * @param graph The graph to layout
 * @param configuration The FA2 configuration
 * @param globalObject The global object
 */
export function createInstance(
	graph: GraphContainer,
	configuration: Partial<FA2Configuration> = {},
	globalObject = window,
): FA2LayoutExecutor {
	const finalConfig: FA2Configuration = {
		...DEFAULT_CONFIGURATION,
		...configuration,
	}
	return new FA2LayoutExecutor(
		graph,
		finalConfig,
		new CountdownClock(configuration.targetIterations || 100),
		globalObject,
	)
}
