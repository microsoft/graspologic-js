/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DataStore } from '../../types'
import { GenericTypeStore } from './TypeStore'
import {
	createNodeStore,
	createEdgeStore,
	nodeType,
	edgeType,
} from '@graspologic/graph'
import { ReaderStore } from '@graspologic/memstore'

/**
 * Constructs a generic data store with node and edge stores
 * @param nodeCountHint The number of nodes
 * @param edgeCountHint The number of edges
 * @param notifications If the stores should emit update notifications
 * @returns A datastore containing node and edge stores
 */
export function createDataStore(
	nodeCountHint: number | undefined,
	edgeCountHint: number | undefined,
	notifications = true,
): DataStore {
	const result = new GenericTypeStore<ReaderStore<any>>()
	const nodeStore = createNodeStore({
		capacity: nodeCountHint,
		notifications,
	})
	const edgeStore = createEdgeStore({
		capacity: edgeCountHint,
		notifications,
	})
	result.register(nodeType, nodeStore)
	result.register(edgeType, edgeStore)
	return result
}
