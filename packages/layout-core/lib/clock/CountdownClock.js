/**
 * @internal
 *
 * An implementation of a clock which will tick until it reaches a target tick count
 */
export class CountdownClock {
    _targetTicks;
    _ticks = 0;
    /**
     * Constructor for the countdown clock
     * @param targetTicks The target number of ticks to run
     */
    constructor(targetTicks) {
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
