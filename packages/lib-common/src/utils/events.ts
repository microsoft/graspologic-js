/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { applyMixins, ClassType, SingleArgument } from './mixin'

export type Disconnect = () => void

/**
 * An interface which represents object which emits a set of events
 */
export interface HasEvents<Events> {
	/**
	 * Adds an event listener for the given event
	 */
	on<N extends keyof Events>(name: N, handler: Events[N]): () => void

	/**
	 * Removes an event listener for the given event
	 */
	off<N extends keyof Events>(name: N, handler: Events[N]): void

	/**
	 * Raises the given event
	 */
	emit<N extends keyof Events>(
		name: N,
		payload?: SingleArgument<Events[N]>,
	): void

	/**
	 * Returns true if there are any listeners for the given event
	 * @param name The event name
	 */
	hasListeners<N extends keyof Events>(name: N): boolean
}

/**
 * An implementation of an object which emits a set of events
 */
export class EventEmitter<Events> implements HasEvents<Events> {
	private listeners: {
		[P in keyof Events]?: Events[P][]
	} = {}

	/**
	 * Adds an event listener for the given event
	 */
	public on<N extends keyof Events>(name: N, handler: Events[N]): Disconnect {
		this.listeners[name] = this.listeners[name] || []
		this.listeners[name]!.push(handler)
		return () => this.off(name, handler)
	}

	/**
	 * Removes an event listener for the given event
	 */
	public off<N extends keyof Events>(name: N, handler: Events[N]) {
		const listeners = this.listeners[name]
		if (listeners) {
			const idx = listeners.indexOf(handler)
			if (idx >= 0) {
				listeners.splice(idx, 1)
			}
		}
	}

	/**
	 * Raises the given event
	 */
	public emit<N extends keyof Events>(
		name: N,
		payload?: SingleArgument<Events[N]>,
	) {
		const listeners = this.listeners[name]
		if (listeners) {
			listeners.forEach(l => {
				;(l as any).call(this, payload)
			})
		}
	}

	/**
	 * Returns true if there are any listeners for the given event
	 * @param name The event name
	 */
	public hasListeners<N extends keyof Events>(name: N): boolean {
		this.listeners = this.listeners || {}
		const listeners = this.listeners[name]
		if (listeners) {
			return listeners.length > 0
		}
		return false
	}
}

/**
 * A mixin that adds support for event emitting
 * @param Base The base class to mixin the EventEmitter into
 */
export function EventsMixin<Events, TBase>(Base: ClassType<TBase>) {
	class EventImpl extends (Base as any) {
		// This is a necessary evil, to ensure that the "listeners" fields gets added
		private listeners: {
			[P in keyof Events]?: Events[P][]
		} = {}
	}
	applyMixins(EventImpl, [EventEmitter])
	return EventImpl as any as ClassType<TBase & EventEmitter<Events>>
}
