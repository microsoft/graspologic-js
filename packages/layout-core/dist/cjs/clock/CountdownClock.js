"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountdownClock = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * An implementation of a clock which will tick until it reaches a target tick count
 */
class CountdownClock {
  /**
   * Constructor for the countdown clock
   * @param targetTicks The target number of ticks to run
   */
  constructor(targetTicks) {
    _defineProperty(this, "_targetTicks", void 0);

    _defineProperty(this, "_ticks", 0);

    this._targetTicks = targetTicks;
  }
  /**
   * Gets the current ticks
   */


  get currentTicks() {
    return this._ticks;
  }
  /**
   * Gets the target ticks
   */


  get targetTicks() {
    return this._targetTicks;
  }
  /**
   * Ticks the current clock
   */


  tick() {
    this._ticks++;
    return this._ticks < this._targetTicks;
  }

}

exports.CountdownClock = CountdownClock;