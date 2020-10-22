/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable no-restricted-globals */
import { Subscription } from 'rxjs'
import { FA2LayoutExecutor } from './FA2LayoutExecutor'
import { createInstance } from './factory'
import { FA2Configuration } from './types'
import { GraphContainer } from '@graspologic/graph'
import {
	WorkerMessage,
	WorkerMessageType,
	ExecuteMessagePayload,
} from '@graspologic/layout-core'

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
let subscription: Subscription | undefined

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
			executor.execute()
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
		subscription.unsubscribe()
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
		subscription = executor.onTick.subscribe(data => {
			sendMessage(WorkerMessageType.Progress, data)
		})

		executor.execute().then(data => {
			// clean up after execution
			if (subscription) {
				subscription.unsubscribe()
			}

			// clear out execution state
			executor = undefined
			subscription = undefined

			// emit completion event
			sendMessage(WorkerMessageType.Complete, data)
		})
	} catch (err) {
		self.console.log('caught error', err)
		self.postMessage(WorkerMessageType.Error, err)
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
