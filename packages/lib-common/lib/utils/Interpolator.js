/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export class Interpolator {
    _interpolationTime;
    _frameTime = 0;
    _current = 0;
    _target = 1;
    /**
     * Constructor
     * @param config The render configuration
     */
    constructor(_interpolationTime) {
        this._interpolationTime = _interpolationTime;
    }
    /**
     * Resets the interpolation state
     */
    reset() {
        this._frameTime = 0;
        this.current = 0;
    }
    /**
     * Gets the current value of the interpolator
     */
    get current() {
        return this._current;
    }
    /**
     * Sets the current value of the interpolator
     */
    set current(value) {
        this._current = value;
    }
    /**
     * Gets the target value of the interpolator
     */
    set target(value) {
        this._target = value;
    }
    /**
     * Sets the target value of the interpolator
     */
    get target() {
        return this._target;
    }
    /**
     * Gets whether or not interpolation is complete
     */
    get isComplete() {
        return this._current === this.target;
    }
    /**
     * Gets the interpolation time
     */
    get interpolationTime() {
        return this._interpolationTime;
    }
    /**
     * Sets the interpolation time
     */
    set interpolationTime(value) {
        this._interpolationTime = value;
    }
    /**
     * Updates the interpolation state based on the current time
     * @param time The current time
     */
    tick(time) {
        if (this._frameTime === 0) {
            this._frameTime = time;
        }
        if (this._interpolationTime > 0) {
            this.current += (time - this._frameTime) / this._interpolationTime;
            if (this.current > this.target) {
                this.current = this.target;
            }
        }
        else {
            this._frameTime = 0;
            this._current = this.target;
        }
        this._frameTime = time;
    }
}
