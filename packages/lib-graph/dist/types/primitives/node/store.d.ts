import { NodeStoreConfig, NodeStore } from './types';
/**
 * @internal
 *
 * Returns a data buffer to keep track of Nodes
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Node objects
 */
export declare function createNodeStore(config?: Partial<NodeStoreConfig>): NodeStore;
