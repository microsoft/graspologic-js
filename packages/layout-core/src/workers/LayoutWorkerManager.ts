/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	WorkerMessageType,
	WorkerMessage,
	ExecuteMessagePayload,
} from './types'
import { EventEmitter } from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'

export interface LayoutWorkerManagerEvents<TickProgress> {
	/**
	 * An even for when the layout progresses
	 */
	progress: (progress: TickProgress) => void
}

/**
 * A manager class for using webworker-based layout execution
 */
export class LayoutWorkerManager<
	Configuration,
	TickProgress
> extends EventEmitter<LayoutWorkerManagerEvents<TickProgress>> {
	private _createWorker: () => Worker
	private _worker?: Worker
	private _configuration: Partial<Configuration> = {}

	/**
	 * Constructor for the LayoutWorkerManager
	 * @param createWorker A callback for instantiating the worker
	 */
	public constructor(createWorker: () => Worker) {
		super()
		this._createWorker = createWorker
	}

	/**
	 * Configures the layout worker
	 * @param configuration The configuration options for the layout worker
	 */
	public configure(configuration: Partial<Configuration>) {
		this._configuration = configuration
	}

	/**
	 * Performs the layout on the given graph
	 * @param graph The graph to perform the layout on
	 * @returns A promise for when the layout is completed
	 */
	public layout(graph: GraphContainer): Promise<TickProgress> {
		this._worker = this._createWorker()

		// Listen for completion
		const result = new Promise<TickProgress>((resolve, reject) => {
			this._worker!.onmessage = ev => {
				const { type, payload } = ev.data as WorkerMessage<any>
				if (type === WorkerMessageType.Progress) {
					this.emit('progress', payload)
				} else if (type === WorkerMessageType.Complete) {
					this.reset()
					resolve(payload)
				} else if (type === WorkerMessageType.Error) {
					this.reset()
					reject(payload)
				}
			}
		})

		// kick off the layout
		this.sendMessage(WorkerMessageType.Execute, {
			graph: graph.serialize(),
			configuration: this._configuration,
		} as ExecuteMessagePayload<Configuration>)
		return result
	}

	/**
	 * Resets the layout worker to it's initial state
	 */
	public reset() {
		if (this._worker) {
			this._worker!.terminate()
			this._worker = undefined
		}
	}

	/**
	 * Stops the current layout process
	 */
	public halt() {
		this.sendMessage(WorkerMessageType.Halt)
	}

	/**
	 * Resumes the current layout process
	 */
	public resume() {
		this.sendMessage(WorkerMessageType.Resume)
	}

	/**
	 * Sends a message to the layout worker
	 * @param type The message type
	 * @param payload The payload
	 * @param share The data to share
	 */
	private sendMessage<T>(
		type: WorkerMessageType,
		payload?: T,
		share?: Transferable[],
	) {
		if (this._worker) {
			this._worker.postMessage(
				{
					type,
					payload,
				} as WorkerMessage<T>,
				share || [],
			)
		}
	}
}
