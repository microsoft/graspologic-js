import { createInstance } from './factory';
import { GraphContainer } from '@graspologic/graph';
import { WorkerMessageType } from '@graspologic/layout-core';
let executor;
let subscription;
self.console.log('openord worker bootstrapping');
/**
 * Listens for messages from the layout exectuor
 */

self.onmessage = message => {
  const {
    type,
    payload
  } = message.data;
  self.console.log('openord receive message', type);

  switch (type) {
    case WorkerMessageType.Configure:
      {
        var _executor;

        (_executor = executor) === null || _executor === void 0 ? void 0 : _executor.configure(payload);
        break;
      }

    case WorkerMessageType.Execute:
      {
        stopExecution();
        terminateExecution();
        startExecution(payload);
        break;
      }

    case WorkerMessageType.Halt:
      {
        haltExecution();
        break;
      }

    case WorkerMessageType.Reset:
      {
        stopExecution();
        executor = undefined;
        subscription = undefined;
        break;
      }

    case WorkerMessageType.Resume:
      {
        resumeExecution();
        break;
      }

    default:
      self.console.log('openord worker - unhandled message type', type);
  }
};
/**
 * Halts the execution of the layout
 */


function haltExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not halt oord, instance not defined');
  }
}
/**
 * Resumes the execution of the layout
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
 * Halts the execution of the layout
 */


function stopExecution() {
  if (executor != null) {
    executor.halt();
  } else {
    self.console.log('could not stop oord, instance not defined');
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
 * Starts the execution of the layout
 * @param param0 The execute payload
 */


function startExecution({
  graph,
  configuration
}) {
  try {
    executor = createInstance(GraphContainer.deserialize(graph), configuration, self);
    subscription = executor.on('tick', data => {
      sendMessage(WorkerMessageType.Progress, data);
    });
    executor.execute().then(data => {
      // clean up after execution
      if (subscription) {
        subscription();
      } // clear out execution state


      executor = undefined;
      subscription = undefined; // emit completion event

      sendMessage(WorkerMessageType.Complete, data);
    });
  } catch (err) {
    self.console.log('caught error', err);
    self.postMessage(WorkerMessageType.Error, err);
  }
}
/**
 * Sends a message to the layout executor
 * @param type The type of message
 * @param payload The payload for the message
 */


function sendMessage(type, payload) {
  self.postMessage({
    type,
    payload
  }, undefined);
}