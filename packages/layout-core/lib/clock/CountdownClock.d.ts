/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TickingClock } from './types';
/**
 * @internal
 *
 * An implementation of a clock which will tick until it reaches a target tick count
 */
export declare class CountdownClock implements TickingClock {
    private _targetTicks;
    private _ticks;
    /**
     * Constructor for the countdown clock
     * @param targetTicks The target number of ticks to run
     */
    constructor(targetTicks: number);
    /**
     * Gets the current ticks
     */
    get currentTicks(): number;
    /**
     * Gets the target ticks
     */
    get targetTicks(): number;
    /**
     * Ticks the current clock
     */
    tick(): boolean;
}
