import { GenericTypeStore } from './TypeStore';
import { createNodeStore, createEdgeStore, nodeType, edgeType, } from '@graspologic/graph';
/**
 * Constructs a generic data store with node and edge stores
 * @param nodeCountHint The number of nodes
 * @param edgeCountHint The number of edges
 * @param animation If the stores should emit update animation
 * @returns A datastore containing node and edge stores
 */
export function createDataStore(nodeCountHint, edgeCountHint, animation = true) {
    const result = new GenericTypeStore();
    const nodeStore = createNodeStore({
        capacity: nodeCountHint,
        animation,
    });
    const edgeStore = createEdgeStore({
        capacity: edgeCountHint,
        animation,
    });
    result.register(nodeType, nodeStore);
    result.register(edgeType, edgeStore);
    return result;
}
/**
 * Constructs a generic data store with node and edge stores
 * @param container The graph container to use
 * @returns A datastore containing node and edge stores
 */
export function createDataStoreFromContainer(container) {
    const result = new GenericTypeStore();
    result.register(nodeType, container.nodes);
    result.register(edgeType, container.edges);
    return result;
}
