/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { computeBounds, GraphContainer } from '@graspologic/graph'
import { Bounds3D } from '@graspologic/renderer'
import { useMemo } from 'react'

/**
 * Hook for computing the data bounds of the given container
 * @param container The data to compute the data bounds for
 */
export function useDataBounds(container: GraphContainer): Bounds3D | undefined {
	return useMemo(
		() => (container && computeBounds(container)) || undefined,
		[container],
	)
}
