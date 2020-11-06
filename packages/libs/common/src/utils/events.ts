/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Mixin, ClassType, Arguments } from './mixin'

export type Disconnect = () => void

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
    emit<N extends keyof Events>(name: N, ...args: any[]): void

    /**
     * Returns true if there are any listeners for the given event
     * @param name The event name
     */
    hasListeners<N extends keyof Events>(name: N): boolean
}

export class EventEmitter<Events> implements HasEvents<Events> {
    private listeners: {
        [P in keyof Events]?: Events[P][]
    } = {};

    /**
     * Adds an event listener for the given event
     */
    public on<N extends keyof Events>(name: N, handler: Events[N]): Disconnect {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name]!.push(handler);
        return () => this.off(name, handler);
    }

    /**
     * Removes an event listener for the given event
     */
    public off<N extends keyof Events>(name: N, handler: Events[N]) {
        var listeners = this.listeners[name];
        if (listeners) {
            var idx = listeners.indexOf(handler);
            if (idx >= 0) {
                listeners.splice(idx, 1);
            }
        }
    }

    /**
     * Raises the given event
     */
    public emit<N extends keyof Events>(name: N, ...args: Arguments<Events[N]>) {
        var listeners = this.listeners[name];
        if (listeners) {
            listeners.forEach((l) => {
                (l as any).apply(this, args);
            });
        }
    }

    /**
     * Returns true if there are any listeners for the given event
     * @param name The event name
     */
    public hasListeners<N extends keyof Events>(name: N): boolean {
        var listeners = this.listeners[name];
        if (listeners) {
            return listeners.length > 0
        }
        return false
    }
}

/**
 * A mixin that adds support for event emitting
 */
export function EventsMixin<Events, TBase>(Base: ClassType<TBase>) {
    return Mixin(Base, EventEmitter as ClassType<EventEmitter<Events>>)
}