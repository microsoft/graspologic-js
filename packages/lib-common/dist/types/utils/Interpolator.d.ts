/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export declare class Interpolator {
    private _interpolationTime;
    private _frameTime;
    private _current;
    private _target;
    /**
     * Constructor
     * @param config The render configuration
     */
    constructor(_interpolationTime: number);
    /**
     * Resets the interpolation state
     */
    reset(): void;
    /**
     * Gets the current value of the interpolator
     */
    get current(): number;
    /**
     * Sets the current value of the interpolator
     */
    set current(value: number);
    /**
     * Gets the target value of the interpolator
     */
    set target(value: number);
    /**
     * Sets the target value of the interpolator
     */
    get target(): number;
    /**
     * Gets whether or not interpolation is complete
     */
    get isComplete(): boolean;
    /**
     * Gets the interpolation time
     */
    get interpolationTime(): number;
    /**
     * Sets the interpolation time
     */
    set interpolationTime(value: number);
    /**
     * Updates the interpolation state based on the current time
     * @param time The current time
     */
    tick(time: number): void;
}
