"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraState = void 0;

var _math = require("math.gl");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * Represents the state of a camera
 */
class CameraState {
  constructor(position = new _math.Vector3(), rotation = new _math.Quaternion()) {
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

exports.CameraState = CameraState;