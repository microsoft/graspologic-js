"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VertexLabelRenderable = void 0;

var _LabelRenderable = require("./LabelRenderable");

var _renderablesBase = require("@graspologic/renderables-base");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a single node
 */
class VertexLabelRenderable extends _renderablesBase.DataboundRenderable {
  /**
   * Constructor
   * @param gl The gl context
   */
  constructor(gl) {
    super();

    _defineProperty(this, "renderable", void 0);

    this.renderable = new _LabelRenderable.LabelRenderable(gl);
  }
  /**
   * Sets the vertex to render the label for
   * @param vertex The vertex to render the label for
   */


  handleSetData(vertex) {
    if (vertex) {
      this.renderable.text = vertex.label || vertex.id || '';
      this.renderable.setPositions(vertex.position);
      this.renderable.weight = vertex.weight || 0;
    } else {
      this.renderable.text = '';
    }
  }

  draw(options) {
    if (this.enabled) {
      this.renderable.draw(options);
    }
  }

}

exports.VertexLabelRenderable = VertexLabelRenderable;