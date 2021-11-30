function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { applyMixins } from './mixin';
/**
 * An implementation of an object which emits a set of events
 */

export class EventEmitter {
  constructor() {
    _defineProperty(this, "listeners", {});
  }

  /**
   * Adds an event listener for the given event
   */
  on(name, handler) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(handler);
    return () => this.off(name, handler);
  }
  /**
   * Removes an event listener for the given event
   */


  off(name, handler) {
    const listeners = this.listeners[name];

    if (listeners) {
      const idx = listeners.indexOf(handler);

      if (idx >= 0) {
        listeners.splice(idx, 1);
      }
    }
  }
  /**
   * Raises the given event
   */


  emit(name, payload) {
    const listeners = this.listeners[name];

    if (listeners) {
      listeners.forEach(l => {
        ;
        l.call(this, payload);
      });
    }
  }
  /**
   * Returns true if there are any listeners for the given event
   * @param name The event name
   */


  hasListeners(name) {
    this.listeners = this.listeners || {};
    const listeners = this.listeners[name];

    if (listeners) {
      return listeners.length > 0;
    }

    return false;
  }

}
/**
 * A mixin that adds support for event emitting
 * @param Base The base class to mixin the EventEmitter into
 */

export function EventsMixin(Base) {
  class EventImpl extends Base {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "listeners", {});
    }

  }

  applyMixins(EventImpl, [EventEmitter]);
  return EventImpl;
}