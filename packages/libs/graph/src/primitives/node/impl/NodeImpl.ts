/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ClassType } from '../../types'
import { nodeMemoryLayout, nodeType, ADDITIONAL_NODE_PROPS } from '../layout'
import { Node } from '../types'
import { createReader, MemoryReader } from '@graspologic/memstore'

/**
 * An implementation of a Node
 */
export const NodeImpl: ClassType<MemoryReader & Node> = createReader<Node>(
	nodeType,
	nodeMemoryLayout,
	ADDITIONAL_NODE_PROPS,
)
