"use strict";

var _factory = require("./factory");

var _graph = require("@graspologic/graph");

var _layoutCore = require("@graspologic/layout-core");

/**
 * The ForceAtlas2 layout worker
 */

/**
 * The current executor
 */
let executor;
/**
 * The onTick subscription
 */

let subscription;
self.console.log('fa2 worker bootstrapping');
/**
 * Handles when a message is received from the main thread
 */

self.onmessage = message => {
  const {
    type,
    payload
  } = message.data;
  self.console.log('fa2 receive message', type);

  switch (type) {
    case _layoutCore.WorkerMessageType.Configure:
      {
        var _executor;

        (_executor = executor) === null || _executor === void 0 ? void 0 : _executor.configure(payload);
        break;
      }

    case _layoutCore.WorkerMessageType.Execute:
      {
        stopExecution();
        terminateExecution();
        startExecution(payload);
        break;
      }

    case _layoutCore.WorkerMessageType.Halt:
      {
        haltExecution();
        break;
      }

    case _layoutCore.WorkerMessageType.Reset:
      {
        stopExecution();
        executor = undefined;
        subscription = undefined;
        break;
      }

    case _layoutCore.WorkerMessageType.Resume:
      {
        resumeExecution();
        break;
      }

    default:
      self.console.log('fa2 worker - unhandled message type', type);
  }
};
/**
 * Halts the execute of the algorithm
 */


function haltExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not halt executor, instance not defined');
  }
}
/**
 * Resumes the execute of the algorithm
 */


function resumeExecution() {
  if (executor != null) {
    if (!executor.isHalted && !executor.isComplete) {
      executor.execute();
    } else {
      self.console.log('executor is not in a resumable state');
    }
  } else {
    self.console.log('could not resume executor, instance not defined');
  }
}
/**
 * Halts the execution of the algorithm
 */


function stopExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not stop executor, instance not defined');
  }
}
/**
 * Terminates the execution of the layout
 */


function terminateExecution() {
  if (subscription != null) {
    subscription();
  }

  subscription = undefined;
  executor = undefined;
}
/**
 * Starts the layout execution
 * @param param0
 */


function startExecution({
  graph,
  configuration
}) {
  try {
    executor = (0, _factory.createInstance)(_graph.GraphContainer.deserialize(graph), configuration, self);
    subscription = executor.on('tick', data => {
      sendMessage(_layoutCore.WorkerMessageType.Progress, data);
    });
    executor.execute().then(data => {
      // clean up after execution
      if (subscription) {
        subscription();
      } // clear out execution state


      executor = undefined;
      subscription = undefined; // emit completion event

      sendMessage(_layoutCore.WorkerMessageType.Complete, data);
    });
  } catch (err) {
    self.console.log('caught error', err);
    self.postMessage(_layoutCore.WorkerMessageType.Error, err);
  }
}
/**
 * Sends a message to the parent thread
 * @param type The message type
 * @param payload The message payload
 */


function sendMessage(type, payload) {
  self.postMessage({
    type,
    payload
  }, undefined);
}