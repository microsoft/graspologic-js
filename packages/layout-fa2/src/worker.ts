/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable no-restricted-globals */
import type { Disconnect } from '@graspologic/common'
import { GraphContainer } from '@graspologic/graph'
import type {
	WorkerMessage,
	ExecuteMessagePayload} from '@graspologic/layout-core';
import {
	WorkerMessageType
} from '@graspologic/layout-core'
import type { FA2LayoutExecutor } from './FA2LayoutExecutor.js'
import { createInstance } from './factory.js'
import type { FA2Configuration } from './types.js'

/**
 * The ForceAtlas2 layout worker
 */

/**
 * The current executor
 */
let executor: FA2LayoutExecutor | undefined

/**
 * The onTick subscription
 */
let subscription: Disconnect | undefined

self.console.log('fa2 worker bootstrapping')

/**
 * Handles when a message is received from the main thread
 */
self.onmessage = (message: MessageEvent) => {
	const { type, payload } = message.data as WorkerMessage<unknown>
	self.console.log('fa2 receive message', type)
	switch (type) {
		case WorkerMessageType.Configure: {
			executor?.configure(payload as Partial<FA2Configuration>)
			break
		}

		case WorkerMessageType.Execute: {
			stopExecution()
			terminateExecution()
			startExecution(payload as ExecuteMessagePayload<FA2Configuration>)
			break
		}
		case WorkerMessageType.Halt: {
			haltExecution()
			break
		}

		case WorkerMessageType.Reset: {
			stopExecution()
			executor = undefined
			subscription = undefined
			break
		}

		case WorkerMessageType.Resume: {
			resumeExecution()
			break
		}
		default:
			self.console.log('fa2 worker - unhandled message type', type)
	}
}

/**
 * Halts the execute of the algorithm
 */
function haltExecution() {
	if (executor != null) {
		executor.halt()
	} else {
		self.console.log('could not halt executor, instance not defined')
	}
}

/**
 * Resumes the execute of the algorithm
 */
function resumeExecution() {
	if (executor != null) {
		if (!executor.isHalted && !executor.isComplete) {
			executor.execute().catch(console.error)
		} else {
			self.console.log('executor is not in a resumable state')
		}
	} else {
		self.console.log('could not resume executor, instance not defined')
	}
}

/**
 * Halts the execution of the algorithm
 */
function stopExecution() {
	if (executor != null) {
		executor.halt()
	} else {
		self.console.log('could not stop executor, instance not defined')
	}
}

/**
 * Terminates the execution of the layout
 */
function terminateExecution() {
	if (subscription != null) {
		subscription()
	}
	subscription = undefined
	executor = undefined
}

/**
 * Starts the layout execution
 * @param param0
 */
function startExecution({
	graph,
	configuration,
}: ExecuteMessagePayload<FA2Configuration>) {
	try {
		executor = createInstance(
			GraphContainer.deserialize(graph),
			configuration,
			self,
		)
		subscription = executor.on('tick', data => {
			sendMessage(WorkerMessageType.Progress, data)
		})

		executor.execute().then(data => {
			// clean up after execution
			if (subscription) {
				subscription()
			}

			// clear out execution state
			executor = undefined
			subscription = undefined

			// emit completion event
			sendMessage(WorkerMessageType.Complete, data)
		}).catch(console.error)
	} catch (err) {
		self.console.log('caught error', err)
		sendMessage(WorkerMessageType.Error, err)
	}
}

/**
 * Sends a message to the parent thread
 * @param type The message type
 * @param payload The message payload
 */
function sendMessage<T>(type: WorkerMessageType, payload?: T) {
	self.postMessage(
		{
			type,
			payload,
		} as WorkerMessage<T>,
		undefined as any,
	)
}
