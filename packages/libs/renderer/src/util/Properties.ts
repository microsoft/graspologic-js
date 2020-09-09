/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Subject, Observable, animationFrameScheduler } from 'rxjs'
import { observeOn } from 'rxjs/operators'

export type PropertyChangeHandler<T> = (newValue: T) => void
export type PropertyChangeValidator<T> = (newValue: T) => boolean

/**
 * @internal
 *
 * A class for managing a property that emits an event when it changes
 */
export class PropertyContainer<T> {
	private _onChange = new Subject<T>()
	private isValid: PropertyChangeValidator<T> = () => true

	/**
	 * Constructor
	 * @param _value The current value
	 * @param areEqual An equality function
	 */
	public constructor(
		private _value: T,
		private areEqual = (a: T, b: T): boolean => a === b,
	) {}

	/**
	 * Sets the validator which validates whether or not a value is a valid value for this property container
	 * @param isValid The validator
	 */
	public checkValidity(isValid: PropertyChangeValidator<T>): void {
		this.isValid = isValid
	}

	/**
	 * Gets the value contained in the container
	 */
	public get value(): T {
		return this._value
	}

	/**
	 * Sets the value in the container
	 */
	public set value(newValue: T) {
		if (this.isValid(newValue) && !this.areEqual(newValue, this._value)) {
			this._value = newValue
			this._onChange.next(newValue)
		}
	}

	/**
	 * Gets an observable for observing the value changes in this container
	 */
	public get onChange(): Observable<T> {
		return this._onChange.pipe(observeOn(animationFrameScheduler))
	}
}
