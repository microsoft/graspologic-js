import { OpenOrdConfiguration, OpenOrdTickProgress } from './types';
import { GraphContainer } from '@graspologic/graph';
import { OnTickHandler } from '@graspologic/layout-core';
/**
 * @internal
 *
 * Runs the openOrd layout algorithm
 * @param graph The graph to layout
 * @param configuration The layout configuration
 * @param onTick A callback for when the layout has performed an interation
 * @param globalObject The global object
 * @returns A promise for when the layout is complete
 */
export declare function openOrd(graph: GraphContainer, configuration?: Partial<OpenOrdConfiguration>, onTick?: OnTickHandler<OpenOrdTickProgress>, globalObject?: any): Promise<void>;
