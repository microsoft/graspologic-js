import "core-js/modules/web.dom-collections.iterator.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DirtyableRenderable } from './DirtyRenderable';
/**
 * Base class for a vertex renderable
 */

export class DataboundRenderable extends DirtyableRenderable {
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