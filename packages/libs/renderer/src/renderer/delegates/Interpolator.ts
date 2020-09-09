/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export class Interpolator {
	private _frameTime = 0
	private _current = 0
	private _target = 1

	/**
	 * Constructor
	 * @param config The render configuration
	 */
	public constructor(private _interpolationTime: number) {}

	/**
	 * Resets the interpolation state
	 */
	public reset(): void {
		this._frameTime = 0
		this.current = 0
	}

	/**
	 * Gets the current value of the interpolator
	 */
	public get current(): number {
		return this._current
	}

	/**
	 * Sets the current value of the interpolator
	 */
	public set current(value: number) {
		this._current = value
	}

	/**
	 * Gets the target value of the interpolator
	 */
	public set target(value: number) {
		this._target = value
	}

	/**
	 * Sets the target value of the interpolator
	 */
	public get target(): number {
		return this._target
	}

	/**
	 * Gets whether or not interpolation is complete
	 */
	public get isComplete(): boolean {
		return this._current === this.target
	}

	/**
	 * Gets the interpolation time
	 */
	public get interpolationTime() {
		return this._interpolationTime
	}

	/**
	 * Sets the interpolation time
	 */
	public set interpolationTime(value: number) {
		this._interpolationTime = value
	}

	/**
	 * Updates the interpolation state based on the current time
	 * @param time The current time
	 */
	public tick(time: number): void {
		if (this._frameTime === 0) {
			this._frameTime = time
		}
		if (this._interpolationTime > 0) {
			this.current += (time - this._frameTime) / this._interpolationTime
			if (this.current > this.target) {
				this.current = this.target
			}
		} else {
			this._frameTime = 0
			this._current = this.target
		}
		this._frameTime = time
	}
}
