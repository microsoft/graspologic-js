/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { EventEmitter } from './events';
export declare type PropertyChangeHandler<T> = (newValue: T) => void;
export declare type PropertyChangeValidator<T> = (newValue: T) => boolean;
export declare type AreEqualFn<T> = (a: T, b: T) => boolean;
export declare const identity: <T>(a: any, b: any) => boolean;
export interface PropertyContainerEvents<T> {
    /**
     * Event that is raised when the property is changed
     * @param value The new value
     */
    change(value: T | undefined): void;
}
/**
 * @internal
 *
 * A class for managing a property that emits an event when it changes
 */
export declare class PropertyContainer<T> extends EventEmitter<PropertyContainerEvents<T>> {
    private _value;
    private isValid;
    private areEqual;
    /**
     * Constructor
     * @param _value The current value
     * @param areEqual An equality function
     */
    constructor(_value: T, areEqual?: AreEqualFn<T>);
    /**
     * Sets the validator which validates whether or not a value is a valid value for this property container
     * @param isValid The validator
     */
    checkValidity(isValid: PropertyChangeValidator<T>): void;
    /**
     * Gets the value contained in the container
     */
    get value(): T;
    /**
     * Sets the value in the container
     */
    set value(newValue: T);
}
