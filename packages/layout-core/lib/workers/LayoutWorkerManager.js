/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { WorkerMessageType, } from './types';
import { EventEmitter } from '@graspologic/common';
/**
 * A manager class for using webworker-based layout execution
 */
export class LayoutWorkerManager extends EventEmitter {
    _createWorker;
    _worker;
    _configuration = {};
    /**
     * Constructor for the LayoutWorkerManager
     * @param createWorker A callback for instantiating the worker
     */
    constructor(createWorker) {
        super();
        this._createWorker = createWorker;
    }
    /**
     * Configures the layout worker
     * @param configuration The configuration options for the layout worker
     */
    configure(configuration) {
        this._configuration = configuration;
    }
    /**
     * Performs the layout on the given graph
     * @param graph The graph to perform the layout on
     * @returns A promise for when the layout is completed
     */
    layout(graph) {
        this._worker = this._createWorker();
        // Listen for completion
        const result = new Promise((resolve, reject) => {
            this._worker.onmessage = ev => {
                const { type, payload } = ev.data;
                if (type === WorkerMessageType.Progress) {
                    this.emit('progress', payload);
                }
                else if (type === WorkerMessageType.Complete) {
                    this.reset();
                    resolve(payload);
                }
                else if (type === WorkerMessageType.Error) {
                    this.reset();
                    reject(payload);
                }
            };
        });
        // kick off the layout
        this.sendMessage(WorkerMessageType.Execute, {
            graph: graph.serialize(),
            configuration: this._configuration,
        });
        return result;
    }
    /**
     * Resets the layout worker to it's initial state
     */
    reset() {
        if (this._worker) {
            this._worker.terminate();
            this._worker = undefined;
        }
    }
    /**
     * Stops the current layout process
     */
    halt() {
        this.sendMessage(WorkerMessageType.Halt);
    }
    /**
     * Resumes the current layout process
     */
    resume() {
        this.sendMessage(WorkerMessageType.Resume);
    }
    /**
     * Sends a message to the layout worker
     * @param type The message type
     * @param payload The payload
     * @param share The data to share
     */
    sendMessage(type, payload, share) {
        if (this._worker) {
            this._worker.postMessage({
                type,
                payload,
            }, share || []);
        }
    }
}
