"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeDataboundRenderable = void 0;

var _DataboundRenderable = require("./DataboundRenderable");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Base class for a renderable that operates on Vertex data
 */
class CompositeDataboundRenderable extends _DataboundRenderable.DataboundRenderable {
  constructor(renderables) {
    super();

    _defineProperty(this, "renderables", void 0);

    this.renderables = renderables;
  }
  /**
   * Draws out this renderable
   */


  draw(options) {
    if (this.enabled) {
      this.renderables.forEach(r => r.draw(options));
    }
  }
  /**
   * Determines if this renderable needs to be redrawn
   */


  get needsRedraw() {
    return this.enabled && this.renderables.some(r => r.needsRedraw);
  }

}

exports.CompositeDataboundRenderable = CompositeDataboundRenderable;