function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4, Quaternion, Vector3 } from 'math.gl';
import { CameraState } from './CameraState';
import { TransitioningCameraState } from './TransitioningCameraState';
import { computeCameraPosition } from './utils';
import { EventEmitter } from '@graspologic/common';
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_FOV = 45 * Math.PI / 180;
/**
 * Maintains Camera State for Graph Renderer
 */

export class Camera extends EventEmitter {
  /**
   * The current camera state
   */

  /**
   * Constructor for the Camera
   */
  constructor() {
    super();

    _defineProperty(this, "_fov", DEFAULT_FOV);

    _defineProperty(this, "_isUserMoving", false);

    _defineProperty(this, "_projectionSettings", {
      aspect: 1,
      near: 0.01,
      // An infinite far plane
      far: null,
      fov: DEFAULT_FOV
    });

    _defineProperty(this, "_projection", void 0);

    _defineProperty(this, "_state", void 0);

    this._projectionSettings.aspect = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    this._projection = new Matrix4().perspective(this._projectionSettings); // Make the default view of -1 to 1 in all dimensions

    const defaultState = new CameraState(computeCameraPosition({
      x: {
        min: -1,
        max: 1
      },
      y: {
        min: -1,
        max: 1
      }
    }, DEFAULT_FOV, 1.0), new Quaternion());
    this._state = new TransitioningCameraState(defaultState.clone(), defaultState.clone(), defaultState.clone(), 0);
  }
  /**
   * Resizes the camera
   * @param width The width of the display
   * @param height The height of the display
   */


  resize(width, height) {
    this._projectionSettings.aspect = width / height;
    this._projection = new Matrix4().perspective(this._projectionSettings);
  }
  /**
   * Updates the camera such that the given bounds is what will be displayed on screen
   * @param bounds The bounds of the view
   * @param duration How long the transition should take
   */


  fitToView(bounds, duration = 0) {
    // Move the camera to the optimal position
    const newState = new CameraState(computeCameraPosition(bounds, this._projectionSettings.fov, this._projectionSettings.aspect), new Quaternion());
    this.transitionToState(newState, duration);
  }
  /**
   * Moves the camera to the given coordinates
   * @param x The x coordinate of the camera
   * @param y The y coordinate of the camera
   * @param z The z coordinate of the camera
   */


  moveTo(x, y, z, duration = 0) {
    this.transitionToState(new CameraState(new Vector3(x, y, z), this._state.current.rotation.clone()), duration);
  }
  /**
   * Gets the current projection matrix
   */


  get projection() {
    return this._projection;
  }
  /**
   * Gets the field of view of the camera
   */


  fov() {
    return this._fov;
  }
  /**
   * Gets the view matrix representing the current position and rotation of the camera
   * @param rotation True if the rotation component should be included
   */


  computeViewMatrix(rotation = false) {
    let matrix = new Matrix4().translate(this._state.current.position);

    if (rotation) {
      matrix = matrix.multiplyRight(new Matrix4().fromQuaternion(this._state.current.rotation));
    }

    return matrix;
  }
  /**
   * Gets the current position of the camera
   */


  get position() {
    return this._state.current.position.clone();
  }
  /**
   * Sets the current position of the camera
   */


  set position(value) {
    this._state.complete(value);
  }
  /**
   * Gets the current rotation (3d or 2d) based on the is3D configuration
   */


  get rotation() {
    return this._state.current.rotation.clone();
  }
  /**
   * Sets the current rotation (3d or 2d) based on the is3D configuration
   */


  set rotation(value) {
    this._state.complete(undefined, value);
  }
  /**
   * Function indicating that a user is currently moving the camera
   */


  beginUser() {
    this._isUserMoving = true;
  }
  /**
   * Function indicating that a user is done moving the camera
   */


  endUser() {
    if (this._isUserMoving) {
      this._isUserMoving = false; // If we are not still moving through transitions or whatever

      if (!this.isMoving) {
        this.emit('movingComplete');
      }
    }
  }
  /**
   * Returns true if the camera is currently moving (either via transitions or user activity)
   */


  get isMoving() {
    return !this._state.isComplete || this._isUserMoving;
  }
  /**
   * Ticks the camera, so it can transition from state to state smoothly
   * @param time The current time
   */


  tick(time) {
    // Let the state know that a tick has occurred
    this._state.tick(time);
  }
  /**
   * Transitions to the given state
   * @param state The state to transition to
   * @param duration The duration to take
   */


  transitionToState(newState, duration) {
    this._state = new TransitioningCameraState(this._state.current.clone(), newState, this._state.current.clone(), duration);

    if (duration > 0) {
      this._state.on('complete', () => {
        // If we are not currently being moved by other means
        if (!this.isMoving) {
          this.emit('movingComplete');
        }
      });
    }
  }

}