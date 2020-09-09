/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4, Quaternion, Vector3 } from 'math.gl'
import { Subject, Subscription } from 'rxjs'
import { Bounds } from '../../../types'
import { CameraState } from './CameraState'
import { TransitioningCameraState } from './TransitioningCameraState'
import { computeState } from './computeState'

const DEFAULT_WIDTH = 500
const DEFAULT_HEIGHT = 500
const DEFAULT_FOV = (45 * Math.PI) / 180

/**
 * Maintains Camera State for Graph Renderer
 */
export class Camera {
	public projection = new Matrix4()
	private _fov = DEFAULT_FOV
	private _isUserMoving = false
	private _onMovingComplete = new Subject()
	private _projectionSettings = {
		aspect: 1,
		near: 0.1,
		far: 1000,
		fov: DEFAULT_FOV,
	} as any

	/**
	 * The current camera state
	 */
	private _state: TransitioningCameraState

	/**
	 * Constructor for the Camera
	 */
	public constructor() {
		this._projectionSettings.aspect = DEFAULT_WIDTH / DEFAULT_HEIGHT
		this.projection = new Matrix4().perspective(this._projectionSettings)

		// Make the default view of -1 to 1 in all dimensions
		const defaultState = computeState(
			{
				x: {
					min: -1,
					max: 1,
				},
				y: {
					min: -1,
					max: 1,
				},
			},
			this.projection,
		)

		this._state = new TransitioningCameraState(
			defaultState.clone(),
			defaultState.clone(),
			defaultState.clone(),
			0,
		)
	}

	/**
	 * Resizes the camera
	 * @param width The width of the display
	 * @param height The height of the display
	 */
	public resize(width: number, height: number): void {
		this._projectionSettings.aspect = width / height
		this.projection = new Matrix4().perspective(this._projectionSettings)
	}

	/**
	 * Updates the camera such that the given bounds is what will be displayed on screen
	 * @param bounds The bounds of the view
	 * @param duration How long the transition should take
	 */
	public viewBounds(bounds: Bounds, duration = 0) {
		const newState = computeState(bounds, this.projection)

		// Distance from origin on the z axis
		const zDist = -newState.position.z

		// Update the projection to make sure the graph is in view based on the bounds
		Object.assign(this._projectionSettings, {
			near: zDist / 100,
			far: zDist * 100,
		})
		this.projection = new Matrix4().perspective(this._projectionSettings)

		this.transitionToState(newState, duration)
	}

	/**
	 * Moves the camera to the given coordinates
	 * @param x The x coordinate of the camera
	 * @param y The y coordinate of the camera
	 * @param z The z coordinate of the camera
	 */
	public moveTo(x: number, y: number, z: number, duration = 0): void {
		this.transitionToState(
			new CameraState(
				new Vector3(x, y, z),
				this._state.current.rotation.clone(),
			),
			duration,
		)
	}

	/**
	 * Gets the field of view of the camera
	 */
	public fov() {
		return this._fov
	}

	/**
	 * Gets the view matrix representing the current position and rotation of the camera
	 * @param rotation True if the rotation component should be included
	 */
	public computeViewMatrix(rotation = false): Matrix4 {
		let matrix = new Matrix4().translate(this._state.current.position)
		if (rotation) {
			matrix = matrix.multiplyRight(
				new Matrix4().fromQuaternion(this._state.current.rotation),
			)
		}
		return matrix
	}

	/**
	 * Gets the current position of the camera
	 */
	public get position(): Vector3 {
		return this._state.current.position.clone()
	}

	/**
	 * Sets the current position of the camera
	 */
	public set position(value: Vector3) {
		this._state.complete(value)
	}

	/**
	 * Gets the current rotation (3d or 2d) based on the is3D configuration
	 */
	public get rotation(): Quaternion {
		return this._state.current.rotation.clone()
	}

	/**
	 * Sets the current rotation (3d or 2d) based on the is3D configuration
	 */
	public set rotation(value: Quaternion) {
		this._state.complete(undefined, value)
	}

	/**
	 * Function indicating that a user is currently moving the camera
	 */
	public beginUser(): void {
		this._isUserMoving = true
	}

	/**
	 * Function indicating that a user is done moving the camera
	 */
	public endUser(): void {
		if (this._isUserMoving) {
			this._isUserMoving = false

			// If we are not still moving through transitions or whatever
			if (!this.isMoving) {
				this._onMovingComplete.next()
			}
		}
	}

	/**
	 * Returns true if the camera is currently moving (either via transitions or user activity)
	 */
	public get isMoving(): boolean {
		return !this._state.isComplete || this._isUserMoving
	}

	/**
	 * Ticks the camera, so it can transition from state to state smoothly
	 * @param time The current time
	 */
	public tick(time: number): void {
		this._state.tick(time)
	}

	/**
	 * Event that is fired when moving is complete
	 * @param handler The handler to call when moving is complete
	 */
	public onMovingComplete(handler: () => any): Subscription {
		return this._onMovingComplete.subscribe(handler)
	}

	/**
	 * Transitions to the given state
	 * @param state The state to transition to
	 * @param duration The duration to take
	 */
	private transitionToState(newState: CameraState, duration: number): void {
		this._state = new TransitioningCameraState(
			this._state.current.clone(),
			newState,
			this._state.current.clone(),
			duration,
		)

		if (duration > 0) {
			this._state.onComplete(() => {
				// If we are not currently being moved by other means
				if (!this.isMoving) {
					this._onMovingComplete.next()
				}
			})
		}
	}
}
