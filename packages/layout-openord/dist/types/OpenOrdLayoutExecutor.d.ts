/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AnnealingClock } from './AnnealingClock';
import { DensityGrid } from './DensityGrid';
import { OpenOrdTickProgress, OpenOrdConfiguration } from './types';
import { GraphContainer } from '@graspologic/graph';
import { BaseExecutor } from '@graspologic/layout-core';
/**
 * @internal
 *
 * A layout executor which will run the OpenOrd layout on a graph
 */
export declare class OpenOrdLayoutExecutor extends BaseExecutor<OpenOrdConfiguration, AnnealingClock, OpenOrdTickProgress> {
    private _densityGrid;
    /**
     * Constructor for the OpenOrdLayoutExecutor
     * @param graph The graph to layout
     * @param configuration The configuration for the algorithm
     * @param clock The annealing clock which controls how long phases are run
     * @param globalObject The global object
     * @param densityGrid The node density grid
     */
    constructor(graph: GraphContainer, configuration: OpenOrdConfiguration, clock: AnnealingClock, globalObject: any, densityGrid: DensityGrid);
    /**
     * Gets the name of the layout algorithm
     */
    getName(): string;
    /**
     * Gets the density grid
     */
    get densityGrid(): DensityGrid;
    /**
     * Gets the default configuration
     */
    protected get defaultConfiguration(): OpenOrdConfiguration;
    /**
     * Constructs the tick progress object
     */
    protected getProgress(): OpenOrdTickProgress;
    /**
     * Performs a single unit of work
     */
    protected performUnitOfWork(): void;
    /**
     * Initializes the internal density grid
     */
    private initializeDensityGrid;
    /**
     * perform the unit of work (layout step) with a concurrent force model - updates are applied after they have all been computed
     */
    private performConcurrentUnitOfWork;
    /**
     * perform the unit of work (layout step) with a iterative force model - updates are applied in series
     */
    private performIterativeUnitOfWork;
    /**
     * This is a generator so that we can either resolve the updates iteratively using
     * a stochastic gradient descent method, or all at the same time using a force modeling
     * approach
     * @returns The updates for each of the nodes
     */
    private computeIterativeUpdates;
    private computeNodeUpdate;
    private computeNodePosEnergy;
    private nodeAttractiveForce;
    private nodeRepulsiveForce;
    private computeCentroidJump;
    private getEdgeToCut;
    private applyUpdate;
    /**
     * Gets the working energy. This differs from the objective energy in that we cull low-weight edges as the
     * algorithm progresses. The objective energy keep these in tact.
     */
    get energy(): number;
    /**
     * Gets the objective energy according to Equation 1 of the OpenOrd Paper
     *
     * https://www.researchgate.net/publication/253087985_OpenOrd_An_Open-Source_Toolbox_for_Large_Graph_Layout
     */
    get objectiveEnergy(): [number, number, number, number];
}
