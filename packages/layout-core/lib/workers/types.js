/**
 * @internal
 *
 * The type of message for Manager <-> Worker communication
 */
export var WorkerMessageType;
(function (WorkerMessageType) {
    // Manager -> Worker
    /**
     * Tells the worker to configure itself
     */
    WorkerMessageType["Configure"] = "CONFIGURE";
    /**
     * Tells the worker to execute the layout
     */
    WorkerMessageType["Execute"] = "EXECUTE";
    /**
     * Tells the worker to halt layout
     */
    WorkerMessageType["Halt"] = "HALT";
    /**
     * Tells the worker to resume layout
     */
    WorkerMessageType["Resume"] = "RESUME";
    /**
     * Tells the worker to reset it's to the initial state
     */
    WorkerMessageType["Reset"] = "RESET";
    // Worker -> Manager
    /**
     * Tells the manager that the worker experienced an error
     */
    WorkerMessageType["Error"] = "ERROR";
    /**
     * Tells the manager that progress has occurred on the graph layout
     */
    WorkerMessageType["Progress"] = "PROGRESS";
    /**
     * Tells the manager that the worker has completed layout of the graph
     */
    WorkerMessageType["Complete"] = "COMPLETE";
})(WorkerMessageType || (WorkerMessageType = {}));
