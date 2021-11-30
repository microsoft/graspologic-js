"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VertexSetLabelRenderable = void 0;

var _VertexLabelRenderable = require("./VertexLabelRenderable");

var _renderablesBase = require("@graspologic/renderables-base");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a set of nodes
 */
class VertexSetLabelRenderable extends _renderablesBase.CompositeDataboundRenderable {
  /**
   * Constructor
   * @param gl The gl context
   */
  constructor(gl) {
    super([]);

    _defineProperty(this, "gl", void 0);

    this.gl = gl;
  }
  /**
   * Sets the verticies to label
   * @param data The set of verticies to label
   */


  handleSetData(data) {
    this.renderables = (data || []).map(d => {
      const renderable = new _VertexLabelRenderable.VertexLabelRenderable(this.gl);
      renderable.setData(d);
      return renderable;
    });
  }

}

exports.VertexSetLabelRenderable = VertexSetLabelRenderable;