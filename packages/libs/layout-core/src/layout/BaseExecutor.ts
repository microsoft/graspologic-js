/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TickingClock } from '../clock'
import { Disconnect, EventEmitterImpl } from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'

export interface BaseExecutorEvents<Progress> {
	/**
	 * A layout tick has occurred occurred
	 */
	tick: (progress: Progress) => void
}

/**
 * @internal
 *
 * Base class for layout executors
 */
export abstract class BaseExecutor<
	Config,
	Clock extends TickingClock,
	Progress
> extends EventEmitterImpl<BaseExecutorEvents<Progress>> {
	private _graph: GraphContainer
	private _halted = false
	private _complete = false
	private _global: any
	private _configuration: Config
	private _tickListener: Disconnect | undefined
	private _clock: Clock

	/**
	 * Constructor for the base executor
	 * @param graph The graph to run the layout on
	 * @param config The configuration for the layout
	 * @param clock The clock which is used to indicate when a layout cycle has occurred
	 * @param globalObject The "global" object environment
	 */
	public constructor(
		graph: GraphContainer,
		config: Config,
		clock: Clock,
		globalObject: any,
	) {
		super()
		this._clock = clock
		this._graph = graph
		this._global = globalObject
		this._configuration = config
		this.executeStep = this.executeStep.bind(this)
		globalObject.console.log(
			`create new ${this.getName()} instance`,
			this._configuration,
		)
	}

	/**
	 * Halts the layout process
	 */
	public halt() {
		this._halted = true
	}

	/**
	 * Returns true if the layout is halted
	 */
	public get isHalted() {
		return this._halted
	}

	/**
	 * Returns true if the layout is completed
	 */
	public get isComplete() {
		return this._complete
	}

	/**
	 * Gets the current clock
	 */
	public get clock() {
		return this._clock
	}

	/**
	 * Gets the current graph
	 */
	public get graph() {
		return this._graph
	}

	/**
	 * Gets the current global object
	 */
	public get globalObject() {
		return this._global
	}

	/**
	 * Gets the current configuration
	 */
	public get configuration() {
		return this._configuration
	}

	/**
	 * Configures the executor
	 * @param config The layout config
	 */
	public configure(config: Partial<Config>) {
		this._configuration = { ...this.defaultConfiguration, ...config }
	}

	/**
	 * The default configuration for the executor
	 */
	protected abstract defaultConfiguration: Config

	/**
	 * Executes the layout process
	 */
	public execute(): Promise<Progress> {
		this._global.console.log(
			`execute ${this.getName()}, %s nodes, %s edges`,
			this.graph.nodes.count,
			this.graph.edges.count,
		)
		this._halted = false
		this._complete = false
		this.clearTickListener()

		return new Promise(resolve => {
			this.executeStep()
			this._tickListener = this.on('tick', () => {
				if (this._complete) {
					resolve(this.getProgress())
					this.clearTickListener()
				}
			})
		})
	}

	/**
	 * Clears the tick listener
	 */
	private clearTickListener() {
		if (this._tickListener) {
			this._tickListener()
			this._tickListener = undefined
		}
	}

	/**
	 * Executes one step of the layout algorithm
	 */
	private executeStep() {
		this.performUnitOfWork()

		// Advance the annealing clock
		const ticking = this._clock.tick()
		if (!ticking) {
			this._complete = true
		}

		// Perform the next layout step on the event queue
		if (ticking && !this._halted) {
			this._global.setTimeout(this.executeStep, 0)
		}

		// Emit the tick event
		this.emit('tick', this.getProgress())
	}

	/**
	 * Gets the name of the layout algorithm
	 * @returns The name
	 */
	protected abstract getName(): string

	/**
	 * Gets the the current progress of the layout algorithm
	 * @returns The current progress
	 */
	protected abstract getProgress(): Progress

	/**
	 * Performs a unit of work on the layout
	 */
	protected abstract performUnitOfWork(): void
}
