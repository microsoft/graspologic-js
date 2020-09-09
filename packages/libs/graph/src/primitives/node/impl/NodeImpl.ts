/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createReader, MemoryReader } from '@graspologic/memstore'
import { ClassType } from '../../types'
import { nodeMemoryLayout, nodeType, ADDITIONAL_NODE_PROPS } from '../layout'
import { Node } from '../types'

/**
 * An implementation of a Node
 */
export const NodeImpl: ClassType<MemoryReader & Node> = createReader<Node>(
	nodeType,
	nodeMemoryLayout,
	ADDITIONAL_NODE_PROPS,
)
