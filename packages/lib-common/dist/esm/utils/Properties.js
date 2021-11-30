function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { EventEmitter } from './events';
export const identity = (a, b) => a === b;
/**
 * @internal
 *
 * A class for managing a property that emits an event when it changes
 */

export class PropertyContainer extends EventEmitter {
  /**
   * Constructor
   * @param _value The current value
   * @param areEqual An equality function
   */
  constructor(_value, areEqual = identity) {
    super();

    _defineProperty(this, "_value", void 0);

    _defineProperty(this, "isValid", () => true);

    _defineProperty(this, "areEqual", void 0);

    this._value = _value;
    this.areEqual = areEqual;
  }
  /**
   * Sets the validator which validates whether or not a value is a valid value for this property container
   * @param isValid The validator
   */


  checkValidity(isValid) {
    this.isValid = isValid;
  }
  /**
   * Gets the value contained in the container
   */


  get value() {
    return this._value;
  }
  /**
   * Sets the value in the container
   */


  set value(newValue) {
    if (this.isValid(newValue) && !this.areEqual(newValue, this._value)) {
      this._value = newValue;
      this.emit('change', newValue);
    }
  }

}