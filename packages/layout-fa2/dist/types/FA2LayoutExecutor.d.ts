import { FA2Configuration, FA2TickProgress } from './types';
import { GraphContainer } from '@graspologic/graph';
import { BaseExecutor, CountdownClock } from '@graspologic/layout-core';
/**
 * @internal
 *
 * The layout executor which applies the ForceAtlas2 layout algorithm
 */
export declare class FA2LayoutExecutor extends BaseExecutor<FA2Configuration, CountdownClock, FA2TickProgress> {
    private _metrics;
    /**
     * Constructor for the fa2 layout executor
     * @param graph The graph to run the layout on
     * @param config The configuration for the layout
     * @param clock The clock which is used to indicate when a layout cycle has occurred
     * @param globalObject The "global" object environment
     */
    constructor(graph: GraphContainer, configuration: FA2Configuration, clock: CountdownClock, globalObject: any);
    /**
     * Gets the name of the layout
     */
    protected getName(): string;
    /**
     * Gets the default layout configuration
     */
    protected get defaultConfiguration(): FA2Configuration;
    /**
     * Performs one iteration of the ForceAtlas2 algorithm
     */
    protected performUnitOfWork(): void;
    /**
     * Returns the current progress of the layout algorithm
     */
    protected getProgress(): FA2TickProgress;
    /**
     * Checks if the graph is setup for randomization
     */
    private checkforRandomization;
    /**
     * Computes the mass of the graph
     */
    private computeMass;
}
