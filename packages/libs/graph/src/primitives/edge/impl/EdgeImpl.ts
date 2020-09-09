/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createReader, MemoryReader } from '@graspologic/memstore'
import { ClassType } from '../../types'
import { edgeType, edgeMemoryLayout, ADDITIONAL_EDGE_PROPS } from '../layout'
import { Edge } from '../types'

/**
 * An implementation of an Edge
 */
export const EdgeImpl: ClassType<MemoryReader & Edge> = createReader<Edge>(
	edgeType,
	edgeMemoryLayout,
	ADDITIONAL_EDGE_PROPS,
)
