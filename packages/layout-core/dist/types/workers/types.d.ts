/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TransportGraph } from '@graspologic/graph';
/**
 * @internal
 *
 * The type of message for Manager <-> Worker communication
 */
export declare enum WorkerMessageType {
    /**
     * Tells the worker to configure itself
     */
    Configure = "CONFIGURE",
    /**
     * Tells the worker to execute the layout
     */
    Execute = "EXECUTE",
    /**
     * Tells the worker to halt layout
     */
    Halt = "HALT",
    /**
     * Tells the worker to resume layout
     */
    Resume = "RESUME",
    /**
     * Tells the worker to reset it's to the initial state
     */
    Reset = "RESET",
    /**
     * Tells the manager that the worker experienced an error
     */
    Error = "ERROR",
    /**
     * Tells the manager that progress has occurred on the graph layout
     */
    Progress = "PROGRESS",
    /**
     * Tells the manager that the worker has completed layout of the graph
     */
    Complete = "COMPLETE"
}
/**
 * @internal
 *
 * The shape of the messages send to the worker
 */
export interface WorkerMessage<T> {
    /**
     * The type of message
     */
    type: WorkerMessageType;
    /**
     * The payload of the message
     */
    payload?: T;
}
/**
 * @internal
 *
 * The shape of the "Execute" message type payload
 */
export interface ExecuteMessagePayload<Configuration> {
    /**
     * The graph to execute layout on
     */
    graph: TransportGraph;
    /**
     * The configuration for the layout
     */
    configuration?: Partial<Configuration>;
}
