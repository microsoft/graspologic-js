"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataboundRenderable = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _DirtyRenderable = require("./DirtyRenderable");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Base class for a vertex renderable
 */
class DataboundRenderable extends _DirtyRenderable.DirtyableRenderable {
  constructor() {
    super(...arguments);

    _defineProperty(this, "data", void 0);
  }

  /**
   * Determines whether this renderable is enabled
   */
  get enabled() {
    return this.data != null;
  }
  /**
   * Get the related vertex
   */


  getData() {
    return this.data;
  }
  /**
   * Set the related vertex
   * @param vertex The related vertex
   */


  setData(data) {
    if (this.isEqual(data, this.data)) {
      this.data = data;
      this.handleSetData(data);
      this.setNeedsRedraw(true);
    }
  }
  /**
   * Returns true if the new data is equal to the old data
   * @param data The new data
   * @param existing The edisting data
   */


  isEqual(data, existing) {
    return data !== existing;
  }

}

exports.DataboundRenderable = DataboundRenderable;