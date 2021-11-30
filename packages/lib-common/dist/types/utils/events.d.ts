/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ClassType, SingleArgument } from './mixin';
export declare type Disconnect = () => void;
/**
 * An interface which represents object which emits a set of events
 */
export interface HasEvents<Events> {
    /**
     * Adds an event listener for the given event
     */
    on<N extends keyof Events>(name: N, handler: Events[N]): () => void;
    /**
     * Removes an event listener for the given event
     */
    off<N extends keyof Events>(name: N, handler: Events[N]): void;
    /**
     * Raises the given event
     */
    emit<N extends keyof Events>(name: N, payload?: SingleArgument<Events[N]>): void;
    /**
     * Returns true if there are any listeners for the given event
     * @param name The event name
     */
    hasListeners<N extends keyof Events>(name: N): boolean;
}
/**
 * An implementation of an object which emits a set of events
 */
export declare class EventEmitter<Events> implements HasEvents<Events> {
    private listeners;
    /**
     * Adds an event listener for the given event
     */
    on<N extends keyof Events>(name: N, handler: Events[N]): Disconnect;
    /**
     * Removes an event listener for the given event
     */
    off<N extends keyof Events>(name: N, handler: Events[N]): void;
    /**
     * Raises the given event
     */
    emit<N extends keyof Events>(name: N, payload?: SingleArgument<Events[N]>): void;
    /**
     * Returns true if there are any listeners for the given event
     * @param name The event name
     */
    hasListeners<N extends keyof Events>(name: N): boolean;
}
/**
 * A mixin that adds support for event emitting
 * @param Base The base class to mixin the EventEmitter into
 */
export declare function EventsMixin<Events, TBase>(Base: ClassType<TBase>): ClassType<TBase & EventEmitter<Events>>;
