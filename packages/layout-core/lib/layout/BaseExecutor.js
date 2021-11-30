import { EventEmitter } from '@graspologic/common';
/**
 * @internal
 *
 * Base class for layout executors
 */
export class BaseExecutor extends EventEmitter {
    _graph;
    _halted = false;
    _complete = false;
    _global;
    _configuration;
    _tickListener;
    _clock;
    /**
     * Constructor for the base executor
     * @param graph The graph to run the layout on
     * @param config The configuration for the layout
     * @param clock The clock which is used to indicate when a layout cycle has occurred
     * @param globalObject The "global" object environment
     */
    constructor(graph, config, clock, globalObject) {
        super();
        this._clock = clock;
        this._graph = graph;
        this._global = globalObject;
        this._configuration = config;
        this.executeStep = this.executeStep.bind(this);
        globalObject.console.log(`create new ${this.getName()} instance`, this._configuration);
    }
    /**
     * Halts the layout process
     */
    halt() {
        this._halted = true;
    }
    /**
     * Returns true if the layout is halted
     */
    get isHalted() {
        return this._halted;
    }
    /**
     * Returns true if the layout is completed
     */
    get isComplete() {
        return this._complete;
    }
    /**
     * Gets the current clock
     */
    get clock() {
        return this._clock;
    }
    /**
     * Gets the current graph
     */
    get graph() {
        return this._graph;
    }
    /**
     * Gets the current global object
     */
    get globalObject() {
        return this._global;
    }
    /**
     * Gets the current configuration
     */
    get configuration() {
        return this._configuration;
    }
    /**
     * Configures the executor
     * @param config The layout config
     */
    configure(config) {
        this._configuration = { ...this.defaultConfiguration, ...config };
    }
    /**
     * Executes the layout process
     */
    execute() {
        this._global.console.log(`execute ${this.getName()}, %s nodes, %s edges`, this.graph.nodes.count, this.graph.edges.count);
        this._halted = false;
        this._complete = false;
        this.clearTickListener();
        return new Promise(resolve => {
            this.executeStep();
            this._tickListener = this.on('tick', () => {
                if (this._complete) {
                    resolve(this.getProgress());
                    this.clearTickListener();
                }
            });
        });
    }
    /**
     * Clears the tick listener
     */
    clearTickListener() {
        if (this._tickListener) {
            this._tickListener();
            this._tickListener = undefined;
        }
    }
    /**
     * Executes one step of the layout algorithm
     */
    executeStep() {
        this.performUnitOfWork();
        // Advance the annealing clock
        const ticking = this._clock.tick();
        if (!ticking) {
            this._complete = true;
        }
        // Perform the next layout step on the event queue
        if (ticking && !this._halted) {
            this._global.setTimeout(this.executeStep, 0);
        }
        // Emit the tick event
        this.emit('tick', this.getProgress());
    }
}
