/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, Quaternion } from 'math.gl'
import { CameraState } from './CameraState'
import { Interpolator, EventEmitter } from '@graspologic/common'
import { lerp3, slerp } from '@graspologic/luma-utils'

export interface TransitioningCameraStateEvents {
	/**
	 * An event which is raised when the transition is complete
	 */
	complete(): void
}

/**
 * @internal
 *
 * A camera state that transitions between two different camera states
 */
export class TransitioningCameraState extends EventEmitter<
	TransitioningCameraStateEvents
> {
	private interpolator?: Interpolator

	/**
	 * The start camera state
	 */
	public start: CameraState

	/**
	 * The end camera state
	 */
	public end: CameraState

	/**
	 * The current interpolated camera state
	 */
	public current: CameraState

	/**
	 * Constructor
	 * @param start The start camera state
	 * @param end The end camera state
	 * @param current The current state of the camera
	 * @param duration The length of the transition
	 */
	public constructor(
		start: CameraState,
		end: CameraState,
		current: CameraState,
		duration: number,
	) {
		super()
		this.start = start
		this.end = end
		this.current = current
		if (duration) {
			this.interpolator = new Interpolator(duration)
		} else {
			this.complete()
		}
	}

	/**
	 * Updates the current state according to the interpolation
	 * @param time The current engine time
	 */
	public tick(time: number) {
		if (this.interpolator && !this.interpolator.isComplete) {
			this.interpolator.tick(time)

			this.current.position = lerp3(
				this.start.position,
				this.end.position,
				this.interpolator.current,
			)

			this.current.rotation = slerp(
				this.start.rotation,
				this.end.rotation,
				this.interpolator.current,
			)
		}
	}

	/**
	 * Completes the current transition
	 * @param position The final position (default: this.end.position)
	 * @param rotation The final rotation (default: this.end.rotation)
	 */
	public complete(position?: Vector3, rotation?: Quaternion) {
		position = position || this.end.position
		this.current.position = position
		this.end.position = position
		this.start.position = position

		rotation = rotation || this.end.rotation
		this.current.rotation = rotation
		this.end.rotation = rotation
		this.start.rotation = rotation

		if (this.interpolator) {
			// If someone changes the rotation, end the current transition
			this.interpolator.current = 1
		}

		this.emit('complete')
	}

	/**
	 * True if the camera state has transitioned to the end state
	 */
	public get isComplete() {
		return !this.interpolator || this.interpolator.isComplete
	}
}
