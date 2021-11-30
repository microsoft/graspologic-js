import { OpenOrdLayoutExecutor } from './OpenOrdLayoutExecutor';
import { OpenOrdConfiguration } from './types';
import { GraphContainer } from '@graspologic/graph';
/**
 * @internal
 *
 * Creates an instance of the OpenOrdLayoutExector
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param globalObject The global object to use
 */
export declare function createInstance(graph: GraphContainer, configuration?: Partial<OpenOrdConfiguration>, globalObject?: Window & typeof globalThis): OpenOrdLayoutExecutor;
