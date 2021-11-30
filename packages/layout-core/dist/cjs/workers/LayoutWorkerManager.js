"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutWorkerManager = void 0;

var _types = require("./types");

var _common = require("@graspologic/common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A manager class for using webworker-based layout execution
 */
class LayoutWorkerManager extends _common.EventEmitter {
  /**
   * Constructor for the LayoutWorkerManager
   * @param createWorker A callback for instantiating the worker
   */
  constructor(createWorker) {
    super();

    _defineProperty(this, "_createWorker", void 0);

    _defineProperty(this, "_worker", void 0);

    _defineProperty(this, "_configuration", {});

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
    this._worker = this._createWorker(); // Listen for completion

    const result = new Promise((resolve, reject) => {
      this._worker.onmessage = ev => {
        const {
          type,
          payload
        } = ev.data;

        if (type === _types.WorkerMessageType.Progress) {
          this.emit('progress', payload);
        } else if (type === _types.WorkerMessageType.Complete) {
          this.reset();
          resolve(payload);
        } else if (type === _types.WorkerMessageType.Error) {
          this.reset();
          reject(payload);
        }
      };
    }); // kick off the layout

    this.sendMessage(_types.WorkerMessageType.Execute, {
      graph: graph.serialize(),
      configuration: this._configuration
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
    this.sendMessage(_types.WorkerMessageType.Halt);
  }
  /**
   * Resumes the current layout process
   */


  resume() {
    this.sendMessage(_types.WorkerMessageType.Resume);
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
        payload
      }, share || []);
    }
  }

}

exports.LayoutWorkerManager = LayoutWorkerManager;