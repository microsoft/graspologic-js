/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable no-restricted-globals */
import { Subscription } from 'rxjs'
import { OpenOrdLayoutExecutor } from './OpenOrdLayoutExecutor'
import { createInstance } from './factory'
import { OpenOrdConfiguration } from './types'
import { GraphContainer } from '@graspologic/graph'
import {
	WorkerMessage,
	WorkerMessageType,
	ExecuteMessagePayload,
} from '@graspologic/layout-core'

let executor: OpenOrdLayoutExecutor | undefined
let subscription: Subscription | undefined

self.console.log('openord worker bootstrapping')

/**
 * Listens for messages from the layout exectuor
 */
self.onmessage = (message: MessageEvent) => {
	const { type, payload } = message.data as WorkerMessage<unknown>
	self.console.log('openord receive message', type)
	switch (type) {
		case WorkerMessageType.Configure: {
			executor?.configure(payload as Partial<OpenOrdConfiguration>)
			break
		}

		case WorkerMessageType.Execute: {
			stopExecution()
			terminateExecution()
			startExecution(payload as ExecuteMessagePayload<OpenOrdConfiguration>)
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
			self.console.log('openord worker - unhandled message type', type)
	}
}

/**
 * Halts the execution of the layout
 */
function haltExecution() {
	if (executor != null) {
		executor.halt()
	} else {
		self.console.log('could not halt oord, instance not defined')
	}
}

/**
 * Resumes the execution of the layout
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
 * Halts the execution of the layout
 */
function stopExecution() {
	if (executor != null) {
		executor.halt()
	} else {
		self.console.log('could not stop oord, instance not defined')
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
 * Starts the execution of the layout
 * @param param0 The execute payload
 */
function startExecution({
	graph,
	configuration,
}: ExecuteMessagePayload<OpenOrdConfiguration>) {
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
 * Sends a message to the layout executor
 * @param type The type of message
 * @param payload The payload for the message
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
