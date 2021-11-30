/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, Quaternion } from 'math.gl';
import { CameraState } from './CameraState';
import { EventEmitter } from '@graspologic/common';
export interface TransitioningCameraStateEvents {
    /**
     * An event which is raised when the transition is complete
     */
    complete(): void;
}
/**
 * @internal
 *
 * A camera state that transitions between two different camera states
 */
export declare class TransitioningCameraState extends EventEmitter<TransitioningCameraStateEvents> {
    private interpolator?;
    /**
     * The start camera state
     */
    start: CameraState;
    /**
     * The end camera state
     */
    end: CameraState;
    /**
     * The current interpolated camera state
     */
    current: CameraState;
    /**
     * Constructor
     * @param start The start camera state
     * @param end The end camera state
     * @param current The current state of the camera
     * @param duration The length of the transition
     */
    constructor(start: CameraState, end: CameraState, current: CameraState, duration: number);
    /**
     * Updates the current state according to the interpolation
     * @param time The current engine time
     */
    tick(time: number): void;
    /**
     * Completes the current transition
     * @param position The final position (default: this.end.position)
     * @param rotation The final rotation (default: this.end.rotation)
     */
    complete(position?: Vector3, rotation?: Quaternion): void;
    /**
     * True if the camera state has transitioned to the end state
     */
    get isComplete(): any;
}
