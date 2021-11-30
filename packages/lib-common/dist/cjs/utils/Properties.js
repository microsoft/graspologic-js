"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = exports.PropertyContainer = void 0;

var _events = require("./events");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const identity = (a, b) => a === b;
/**
 * @internal
 *
 * A class for managing a property that emits an event when it changes
 */


exports.identity = identity;

class PropertyContainer extends _events.EventEmitter {
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

exports.PropertyContainer = PropertyContainer;