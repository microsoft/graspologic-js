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
	GraphContainer,
} from '@graspologic/graph'
import { ReaderStore } from '@graspologic/memstore'

/**
 * Constructs a generic data store with node and edge stores
 * @param numNodes The number of nodes
 * @param numEdges The number of edges
 * @param animation If the stores should emit update animation
 * @returns A datastore containing node and edge stores
 */
export function createDataStore(
	numNodes: number | undefined,
	numEdges: number | undefined,
	animation = true,
): DataStore {
	const result = new GenericTypeStore<ReaderStore<any>>()
	const nodeStore = createNodeStore({
		capacity: numNodes,
		animation,
	})
	const edgeStore = createEdgeStore({
		capacity: numEdges,
		animation,
	})
	result.register(nodeType, nodeStore)
	result.register(edgeType, edgeStore)
	return result
}

/**
 * Constructs a generic data store with node and edge stores
 * @param container The graph container to use
 * @returns A datastore containing node and edge stores
 */
export function createDataStoreFromContainer(
	container: GraphContainer,
): DataStore {
	const result = new GenericTypeStore<ReaderStore<any>>()
	result.register(nodeType, container.nodes)
	result.register(edgeType, container.edges)
	return result
}
