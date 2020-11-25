/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { applyMixins, ClassType, SingleArgument } from './mixin'

export type Disconnect = () => void

/**
 * An interface which represents object which emits a set of events
 */
export interface EventEmitter<Events = any> {
	/**
	 * Adds an event listener for the given event
	 */
	on<N extends keyof Events>(name: N, handler: Events[N]): () => void

	/**
	 * Removes an event listener for the given event
	 */
	off<N extends keyof Events>(name: N, handler: Events[N]): void

	/**
	 * Returns true if the event emitter has any listeners for the given events
	 * @param name The name of the event
	 */
	hasListeners<N extends keyof Events>(name: N): boolean

	/**
	 * Raises the given event
	 */
	emit<N extends keyof Events>(
		name: N,
		payload?: SingleArgument<Events[N]>,
	): void

	/**
	 * Pipes events from this event emitter to another
	 * @param other The other event emitter
	 */
	pipe(other: EventEmitter): Disconnect

	/**
	 * Removes the pipe between this emitter and the given one
	 * @param other The other event emitter
	 */
	unpipe(other: EventEmitter): void
}

/**
 * An implementation of an object which emits a set of events
 */
export class EventEmitterImpl<Events> implements EventEmitter<Events> {
	private listeners: {
		[P in keyof Events]?: Events[P][]
	} = {}

	private pipes: EventEmitter<Events>[] = []

	/**
	 * Adds an event listener for the given event
	 */
	public on<N extends keyof Events>(name: N, handler: Events[N]): Disconnect {
		this.listeners[name] = this.listeners[name] || []
		this.listeners[name]!.push(handler)
		return () => this.off(name, handler)
	}

	/**
	 * Pipes events from this event emitter to another
	 * @param other The other event emitter
	 */
	public pipe(other: EventEmitter<any>) {
		this.pipes.push(other)
		return () => {
			this.unpipe(other)
		}
	}

	/**
	 * Removes the pipe between this emitter and the given one
	 * @param other The other event emitter
	 */
	public unpipe(other: EventEmitter<any>) {
		const idx = this.pipes.indexOf(other)
		if (idx >= 0) {
			this.pipes.splice(idx, 1)
		}
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
		this.pipes.forEach(pipe => {
			pipe.emit(name, payload)
		})
	}

	/**
	 * Returns true if there are any listeners for the given event
	 * @param name The event name
	 */
	public hasListeners<N extends keyof Events>(name: N): boolean {
		this.listeners = this.listeners || {}
		const listeners = this.listeners[name]
		if (listeners && listeners.length > 0) {
			return true
		}
		if (this.pipes) {
			return this.pipes.some(n => n.hasListeners(name as any))
		}
		return false
	}
}

/**
 * A mixin that adds support for event emitting
 * @param Base The base class to mixin the EventEmitterImpl into
 */
export function EventsMixin<Events, TBase>(Base: ClassType<TBase>) {
	class EventImpl extends (Base as any) {
		// This is a necessary evil, to ensure that the "listeners" fields gets added
		private listeners: {
			[P in keyof Events]?: Events[P][]
		} = {}
		private pipes: EventEmitter<Events>[] = []
	}
	applyMixins(EventImpl, [EventEmitterImpl])
	return (EventImpl as any) as ClassType<TBase & EventEmitterImpl<Events>>
}
