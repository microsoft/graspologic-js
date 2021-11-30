"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirtyableRenderable = void 0;

var _common = require("@graspologic/common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Base-class for property-holding renderable models
 */
class DirtyableRenderable {
  constructor() {
    _defineProperty(this, "_needsRedraw", false);

    _defineProperty(this, "_enabled", true);

    _defineProperty(this, "width", _common.DEFAULT_WIDTH);

    _defineProperty(this, "height", _common.DEFAULT_HEIGHT);

    _defineProperty(this, "makeDirtyHandler", () => this.setNeedsRedraw(true));
  }

  /**
   * Resizes the renderable
   * @param width The render width
   * @param height The render height
   */
  resize(width, height) {
    this.width = width || _common.DEFAULT_WIDTH;
    this.height = height || _common.DEFAULT_HEIGHT;
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

exports.DirtyableRenderable = DirtyableRenderable;