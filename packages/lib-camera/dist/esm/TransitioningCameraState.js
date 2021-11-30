function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Interpolator, EventEmitter } from '@graspologic/common';
import { lerp3, slerp } from '@graspologic/luma-utils';
/**
 * @internal
 *
 * A camera state that transitions between two different camera states
 */

export class TransitioningCameraState extends EventEmitter {
  /**
   * The start camera state
   */

  /**
   * The end camera state
   */

  /**
   * The current interpolated camera state
   */

  /**
   * Constructor
   * @param start The start camera state
   * @param end The end camera state
   * @param current The current state of the camera
   * @param duration The length of the transition
   */
  constructor(start, end, current, duration) {
    super();

    _defineProperty(this, "interpolator", void 0);

    _defineProperty(this, "start", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "current", void 0);

    this.start = start;
    this.end = end;
    this.current = current;

    if (duration) {
      this.interpolator = new Interpolator(duration);
    } else {
      this.complete();
    }
  }
  /**
   * Updates the current state according to the interpolation
   * @param time The current engine time
   */


  tick(time) {
    if (this.interpolator && !this.interpolator.isComplete) {
      this.interpolator.tick(time);
      this.current.position = lerp3(this.start.position, this.end.position, this.interpolator.current);
      this.current.rotation = slerp(this.start.rotation, this.end.rotation, this.interpolator.current);
    }
  }
  /**
   * Completes the current transition
   * @param position The final position (default: this.end.position)
   * @param rotation The final rotation (default: this.end.rotation)
   */


  complete(position, rotation) {
    position = position || this.end.position;
    this.current.position = position;
    this.end.position = position;
    this.start.position = position;
    rotation = rotation || this.end.rotation;
    this.current.rotation = rotation;
    this.end.rotation = rotation;
    this.start.rotation = rotation;

    if (this.interpolator) {
      // If someone changes the rotation, end the current transition
      this.interpolator.current = 1;
    }

    this.emit('complete');
  }
  /**
   * True if the camera state has transitioned to the end state
   */


  get isComplete() {
    return !this.interpolator || this.interpolator.isComplete;
  }

}