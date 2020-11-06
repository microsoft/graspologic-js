/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// https://github.com/andywer/typed-emitter/blob/178536737cf6923a01224c46c29d777de7a5c8ac/index.d.ts#L1-L3 - MIT
export type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T]

export interface ClassType<T> {
	new (...args: any[]): T
}

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
    public emit<N extends keyof Events>(name: N, ...args: Arguments<Events[N]>): void
}

/**
 * A mixin that adds support for event emitting
 */
export function EventEmitter<Events, TBase>(Base: ClassType<TBase>) {
    const listeners: {
        [P in keyof Events]?: Events[P][]
    } = {};
    class EventEmitterImpl extends Base {

        /**
         * Adds an event listener for the given event
         */
        public on<N extends keyof Events>(name: N, handler: Events[N]) {
            listeners[name] = listeners[name] || [];
            listeners[name]!.push(handler);
            return () => this.off(name, handler);
        }

        /**
         * Removes an event listener for the given event
         */
        public off<N extends keyof Events>(name: N, handler: Events[N]) {
            var listeners = listeners[name];
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
        public emit<N extends keyof Events>(name: N, ...args: any[]) {
            var listeners = listeners[name];
            if (listeners) {
                listeners.forEach((l) => {
                    (l as any).apply(this, args);
                });
            }
        }
    }

    return EventEmitterImpl as ClassType<TBase & HasEvents<Events>>
}