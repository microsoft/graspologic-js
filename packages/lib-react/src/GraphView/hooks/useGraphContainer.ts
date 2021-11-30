/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { InputGraph, GraphContainer } from '@graspologic/graph'

/**
 * Converts __data__ to a GraphContainer
 * @param data The input data
 */
export function useGraphContainer(
	data: InputGraph | GraphContainer | undefined,
): GraphContainer | undefined {
	return useMemo<GraphContainer | undefined>(() => {
		if (!data) {
			return undefined
		} else if (Array.isArray(data.nodes)) {
			return GraphContainer.intern(data as InputGraph)
		} else {
			return data as GraphContainer
		}
	}, [data])
}
