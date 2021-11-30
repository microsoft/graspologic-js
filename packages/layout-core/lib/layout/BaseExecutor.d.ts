/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TickingClock } from '../clock';
import { EventEmitter } from '@graspologic/common';
import { GraphContainer } from '@graspologic/graph';
export interface BaseExecutorEvents<Progress> {
    /**
     * A layout tick has occurred occurred
     */
    tick: (progress: Progress) => void;
}
/**
 * @internal
 *
 * Base class for layout executors
 */
export declare abstract class BaseExecutor<Config, Clock extends TickingClock, Progress> extends EventEmitter<BaseExecutorEvents<Progress>> {
    private _graph;
    private _halted;
    private _complete;
    private _global;
    private _configuration;
    private _tickListener;
    private _clock;
    /**
     * Constructor for the base executor
     * @param graph The graph to run the layout on
     * @param config The configuration for the layout
     * @param clock The clock which is used to indicate when a layout cycle has occurred
     * @param globalObject The "global" object environment
     */
    constructor(graph: GraphContainer, config: Config, clock: Clock, globalObject: any);
    /**
     * Halts the layout process
     */
    halt(): void;
    /**
     * Returns true if the layout is halted
     */
    get isHalted(): boolean;
    /**
     * Returns true if the layout is completed
     */
    get isComplete(): boolean;
    /**
     * Gets the current clock
     */
    get clock(): Clock;
    /**
     * Gets the current graph
     */
    get graph(): GraphContainer;
    /**
     * Gets the current global object
     */
    get globalObject(): any;
    /**
     * Gets the current configuration
     */
    get configuration(): Config;
    /**
     * Configures the executor
     * @param config The layout config
     */
    configure(config: Partial<Config>): void;
    /**
     * The default configuration for the executor
     */
    protected abstract defaultConfiguration: Config;
    /**
     * Executes the layout process
     */
    execute(): Promise<Progress>;
    /**
     * Clears the tick listener
     */
    private clearTickListener;
    /**
     * Executes one step of the layout algorithm
     */
    private executeStep;
    /**
     * Gets the name of the layout algorithm
     * @returns The name
     */
    protected abstract getName(): string;
    /**
     * Gets the the current progress of the layout algorithm
     * @returns The current progress
     */
    protected abstract getProgress(): Progress;
    /**
     * Performs a unit of work on the layout
     */
    protected abstract performUnitOfWork(): void;
}
