function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Vector3, Quaternion } from 'math.gl';
/**
 * @internal
 *
 * Represents the state of a camera
 */

export class CameraState {
  constructor(position = new Vector3(), rotation = new Quaternion()) {
    _defineProperty(this, "position", void 0);

    _defineProperty(this, "rotation", void 0);

    _defineProperty(this, "clone", () => {
      return new CameraState(this.position.clone(), this.rotation.clone());
    });

    this.position = position;
    this.rotation = rotation;
  }
  /**
   * Creates a copy of this CameraState
   */


}