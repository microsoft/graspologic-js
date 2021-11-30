import { EventEmitter } from '@graspologic/common';
import { GraphContainer } from '@graspologic/graph';
export interface LayoutWorkerManagerEvents<TickProgress> {
    /**
     * An even for when the layout progresses
     */
    progress: (progress: TickProgress) => void;
}
/**
 * A manager class for using webworker-based layout execution
 */
export declare class LayoutWorkerManager<Configuration, TickProgress> extends EventEmitter<LayoutWorkerManagerEvents<TickProgress>> {
    private _createWorker;
    private _worker?;
    private _configuration;
    /**
     * Constructor for the LayoutWorkerManager
     * @param createWorker A callback for instantiating the worker
     */
    constructor(createWorker: () => Worker);
    /**
     * Configures the layout worker
     * @param configuration The configuration options for the layout worker
     */
    configure(configuration: Partial<Configuration>): void;
    /**
     * Performs the layout on the given graph
     * @param graph The graph to perform the layout on
     * @returns A promise for when the layout is completed
     */
    layout(graph: GraphContainer): Promise<TickProgress>;
    /**
     * Resets the layout worker to it's initial state
     */
    reset(): void;
    /**
     * Stops the current layout process
     */
    halt(): void;
    /**
     * Resumes the current layout process
     */
    resume(): void;
    /**
     * Sends a message to the layout worker
     * @param type The message type
     * @param payload The payload
     * @param share The data to share
     */
    private sendMessage;
}
