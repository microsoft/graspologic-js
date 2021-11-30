import { EdgeStore, EdgeStoreConfig } from './types';
/**
 * @internal
 *
 * Returns a data buffer to keep track of Edges
 * @param capacity The initial capacity of the data buffer
 * @param engineTime Function to return the current engine time
 * @returns A data store capable of storing Edge objects
 */
export declare function createEdgeStore(config?: Partial<EdgeStoreConfig>): EdgeStore;
