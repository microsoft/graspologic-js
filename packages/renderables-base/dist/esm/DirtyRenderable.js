function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@graspologic/common';
/**
 * Base-class for property-holding renderable models
 */

export class DirtyableRenderable {
  constructor() {
    _defineProperty(this, "_needsRedraw", false);

    _defineProperty(this, "_enabled", true);

    _defineProperty(this, "width", DEFAULT_WIDTH);

    _defineProperty(this, "height", DEFAULT_HEIGHT);

    _defineProperty(this, "makeDirtyHandler", () => this.setNeedsRedraw(true));
  }

  /**
   * Resizes the renderable
   * @param width The render width
   * @param height The render height
   */
  resize(width, height) {
    this.width = width || DEFAULT_WIDTH;
    this.height = height || DEFAULT_HEIGHT;
  }
  /**
   * Gets whether or not the renderable needs to be redrawn
   */


  get needsRedraw() {
    return this._needsRedraw;
  }
  /**
   * Gets whether or not the renderable is enabled
   */


  get enabled() {
    return this._enabled;
  }
  /**
   * Sets whether or not the renderable is enabled
   */


  set enabled(value) {
    if (value !== this._enabled) {
      this._enabled = value;
      this._needsRedraw = true;
    }
  }
  /**
   * Sets the flag indicating whether or not the renderable needs to be redrawn
   * @param value True if the renderable needs to be redrawn
   */


  setNeedsRedraw(value) {
    this._needsRedraw = value;
  }
  /**
   * Draws the renderable
   * @param options The render options
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function


  draw(options) {}

}