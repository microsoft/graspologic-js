/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TickingClock } from './types'

/**
 * @internal
 *
 * An implementation of a clock which will tick until it reaches a target tick count
 */
export class CountdownClock implements TickingClock {
	private _targetTicks: number
	private _ticks = 0

	/**
	 * Constructor for the countdown clock
	 * @param targetTicks The target number of ticks to run
	 */
	public constructor(targetTicks: number) {
		this._targetTicks = targetTicks
	}

	/**
	 * Gets the current ticks
	 */
	public get currentTicks() {
		return this._ticks
	}

	/**
	 * Gets the target ticks
	 */
	public get targetTicks() {
		return this._targetTicks
	}

	/**
	 * Ticks the current clock
	 */
	public tick() {
		this._ticks++
		return this._ticks < this._targetTicks
	}
}
