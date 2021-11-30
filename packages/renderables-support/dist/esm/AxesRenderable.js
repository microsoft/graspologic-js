function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4 } from 'math.gl';
import { createEdgeStore } from '@graspologic/graph';
import { EdgesRenderable } from '@graspologic/renderables-edges';
const AXIS_COLORS = [0xff0000ff, 0xff00ff00, 0xffff0000];
const X = [0.1, 0, 0];
const Y = [0, 0.1, 0];
const Z = [0, 0, 0.1];
const OFFSET_X = -0.4;
const OFFSET_Y = -0.4;
const OFFSET_Z = -420;
const AXIS_WIDTH = 2;
const SCALE_CENTER_AXES = 3;
/**
 * A renderable that can be added to a GraphRenderer to render a set of Axes on the graph
 */

export class AxesRenderable extends EdgesRenderable {
  /**
   * Constructor
   * @param gl The gl context to render the axes to
   * @param config The render configuration
   */
  constructor(gl, config) {
    super(gl, config);

    _defineProperty(this, "projection", void 0);

    config.onCornerAxesChanged(this.makeDirtyHandler);
    config.onDrawAxesChanged(this.makeDirtyHandler);
    config.onIs3DChanged(() => this.generateEdges());
    config.onCornerAxesChanged(() => this.generateEdges());
    this.setNeedsRedraw(true);
  }
  /**
   * Resizes the axes renderable
   * @param width The render width
   * @param height The render height
   */


  resize(width, height) {
    super.resize(width, height);
    this.generateEdges();
    this.setNeedsRedraw(true);
  }
  /**
   * Gets the maxiumum width of an edge
   */


  get edgeMaxWidth() {
    return AXIS_WIDTH;
  }
  /**
   * Gets whether or not the edges are antialiased
   */


  get edgeAntialias() {
    return false;
  }
  /**
   * Gets the alpha used to render the edges
   */


  get edgeAlpha() {
    return 1;
  }
  /**
   * Gets whether or not the edges should be rendered with a constant width
   */


  get edgeConstantWidth() {
    return true;
  }
  /**
   * Renders the axes renderable
   * @param options The set of render options
   */


  draw(options) {
    if (this.data && this.config.drawAxes) {
      const localMatrix = options.modelViewMatrix.clone();

      if (this.config.cornerAxes) {
        localMatrix[12] = OFFSET_X * this.width;
        localMatrix[13] = OFFSET_Y * this.height;
        localMatrix[14] = OFFSET_Z;
      } else {
        localMatrix[0] = SCALE_CENTER_AXES;
        localMatrix[5] = SCALE_CENTER_AXES;
        localMatrix[10] = SCALE_CENTER_AXES;
      }

      super.draw(_objectSpread(_objectSpread({}, options), {}, {
        modelViewMatrix: localMatrix || options.modelViewMatrix,
        projectionMatrix: this.config.cornerAxes ? this.projection : options.projectionMatrix
      }));
    }
  }
  /**
   * Generates the set of edges used as our axes
   */


  generateEdges() {
    const screenSize = Math.min(this.width, this.height);
    const axisCount = this.config.is3D ? 3 : 2;
    const edgesBuffer = createEdgeStore({
      capacity: axisCount
    });
    this.data = edgesBuffer;
    this.projection = new Matrix4().ortho({
      left: -0.5 * this.width,
      right: 0.5 * this.width,
      bottom: -0.5 * this.height,
      top: 0.5 * this.height
    });

    for (let i = 0; i < axisCount; i++) {
      const storeId = edgesBuffer.add();
      const newEdge = edgesBuffer.itemAt(storeId);
      newEdge.sourcePosition = [0, 0, 0];
      newEdge.targetPosition = [X[i] * screenSize, Y[i] * screenSize, Z[i] * screenSize];
      newEdge.weight = 1;
      newEdge.color = AXIS_COLORS[i];
      newEdge.color2 = AXIS_COLORS[i];
    }
  }

}