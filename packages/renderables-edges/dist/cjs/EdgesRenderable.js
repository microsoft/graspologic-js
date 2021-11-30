"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EdgesRenderable = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _model = _interopRequireDefault(require("./model"));

var _common = require("@graspologic/common");

var _graph = require("@graspologic/graph");

var _lumaUtils = require("@graspologic/luma-utils");

var _renderablesBase = require("@graspologic/renderables-base");

var _edgeVs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/edge.vs.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getNextId = (0, _lumaUtils.createIdFactory)('EdgesInstance');
/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering edges
 */

class EdgesRenderable extends _renderablesBase.DirtyableRenderable {
  /**
   * Constructor for EdgesRenderable
   * @param gl The gl context the edges should be rendered to
   * @param config The render configuration
   * @param id The id of the renderable
   */
  constructor(gl, config) {
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getNextId();
    super();

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "modelBuffer", void 0);

    _defineProperty(this, "translucentModel", void 0);

    _defineProperty(this, "translucentModelBuffer", void 0);

    _defineProperty(this, "needsDataBind", true);

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "handleEdgeAdded", edgeOrIndex => {
      const edge = typeof edgeOrIndex === 'number' ? this.data.itemAt(edgeOrIndex) : edgeOrIndex; // Assign edge defaults

      edge.saturation = 1;
      edge.saturation2 = 1;
      edge.visible = true;
      this.needsDataBind = true;
      this.setNeedsRedraw(true);
    });

    _defineProperty(this, "handleEdgeRemoved", edgeOrIndex => {
      const edge = typeof edgeOrIndex === 'number' ? this.data.itemAt(edgeOrIndex) : edgeOrIndex;
      edge.visible = false;
      this.needsDataBind = true;
      this.setNeedsRedraw(true);
    });

    _defineProperty(this, "handleEdgeAttributeUpdated", (storeId, attribute) => {
      this.needsDataBind = true;
      this.setNeedsRedraw(true);
    });

    this.config = config;
    const {
      model,
      buffer
    } = (0, _model.default)(gl, id, _edgeVs.default);
    this.model = model;
    this.modelBuffer = buffer;
    const {
      model: translucentModel,
      buffer: translucentModelBuffer
    } = (0, _model.default)(gl, getNextId(), _edgeVs.default, {
      ALPHA_MODE: 1
    });
    this.translucentModel = translucentModel;
    this.translucentModelBuffer = translucentModelBuffer;
    config.onDrawEdgesChanged(this.makeDirtyHandler);
    config.onHideEdgesOnMoveChanged(this.makeDirtyHandler);
    config.onEdgeConstantWidthChanged(this.makeDirtyHandler);
    config.onEdgeDepthWriteChanged(this.makeDirtyHandler);
    config.onEdgeAlphaChanged(this.makeDirtyHandler);
    config.onEdgeAntialiasChanged(this.makeDirtyHandler);
    config.onEdgeMinWidthChanged(this.makeDirtyHandler);
    config.onEdgeMaxWidthChanged(this.makeDirtyHandler);
  }
  /**
   * Gets the data type associated with this renderable
   */


  get itemType() {
    return _graph.edgeType;
  }
  /**
   * The edge data that should be rendered
   */


  get data() {
    return this._data;
  }
  /**
   * Sets the edge data to be rendered
   */


  set data(value) {
    // We attach this here, because in the onChange handler it can be fired after changes happen
    if (value !== this._data && value) {
      value.onAttributeUpdated(this.handleEdgeAttributeUpdated);
      value.onAddItem(this.handleEdgeAdded);
      value.onRemoveItem(this.handleEdgeRemoved);

      for (const edge of value.scan()) {
        this.handleEdgeAdded(edge);
      }

      this.bindDataToModel(true);
      this.setNeedsRedraw(true);
    }

    this._data = value;
  }
  /**
   * Returns true if edges behind other edges should not be rendered
   */


  get edgeDepthWrite() {
    return this.config.edgeDepthWrite;
  }
  /**
   * Returns true if the edges should be rendered using a constant width
   */


  get edgeConstantWidth() {
    return this.config.edgeConstantWidth;
  }
  /**
   * Returns the min edge with
   */


  get edgeMinWidth() {
    return this.config.edgeMinWidth;
  }
  /**
   * Returns the max edge with
   */


  get edgeMaxWidth() {
    return this.config.edgeMaxWidth;
  }
  /**
   * Returns the alpha used for the edges
   */


  get edgeAlpha() {
    return this.config.edgeAlpha;
  }
  /**
   * Returns true if edges should be anti-aliased
   */


  get edgeAntialias() {
    return this.config.edgeAntialias;
  }

  updateEngineTime(engineTime) {
    this.data.engineTime = engineTime;
  }
  /**
   * Draws the EdgeRenderable
   * @param options The set of render options
   */


  draw(options) {
    const {
      modelViewMatrix,
      projectionMatrix,
      canvasPixelSize,
      hideDeselected,
      framebuffer,
      engineTime
    } = options;

    if (this.enabled) {
      this.bindDataToModel();
      const drawConfig = {
        parameters: {
          depthMask: this.edgeDepthWrite,
          [_lumaUtils.GL_DEPTH_TEST]: true,
          blend: true
        },
        uniforms: {
          uModelView: modelViewMatrix,
          uProjection: projectionMatrix,
          uScreenSize: canvasPixelSize,
          uConstantSize: this.edgeConstantWidth ? 1 : 0,
          uMinWidth: this.edgeMinWidth,
          uMaxWidth: this.edgeMaxWidth,
          uAlpha: this.edgeAlpha,
          uAntialias: this.edgeAntialias ? 1 : 0,
          uTime: engineTime
        },
        framebuffer
      };
      this.model.draw(drawConfig);

      if (!hideDeselected) {
        drawConfig.parameters.depthMask = false;
        this.translucentModel.draw(drawConfig);
      }
    }

    this.setNeedsRedraw(true);
  }
  /**
   * Computes the bounds of the edges
   */


  computeBounds() {
    let bounds; // Below is a little more complicated to allow us to set the initial bounds
    // to the first primitives bounds, without doing a "first" check each time

    const iterator = this._data[Symbol.iterator]();

    if (iterator) {
      let result = iterator.next();

      if (result.value) {
        bounds = this.computeEdgeBounds(result.value);
      }

      while (!result.done) {
        const primBounds = this.computeEdgeBounds(result.value);
        (0, _common.processMinMaxBounds)(bounds, primBounds);
        result = iterator.next();
      }
    }

    return bounds;
  }
  /**
   * Computes the given edges bounds
   * @param edge The edge to compute the bounds for
   */


  computeEdgeBounds(edge) {
    const source = edge.sourcePosition;
    const target = edge.targetPosition;
    const rangeX = source[0] < target[0] ? [source[0], target[0]] : [target[0], source[0]];
    const rangeY = source[1] < target[1] ? [source[1], target[1]] : [target[1], source[1]];
    const rangeZ = source[2] < target[2] ? [source[2], target[2]] : [target[2], source[2]];
    return {
      x: {
        min: rangeX[0],
        max: rangeX[1]
      },
      y: {
        min: rangeY[0],
        max: rangeY[1]
      },
      z: {
        min: rangeZ[0],
        max: rangeZ[1]
      }
    };
  }
  /**
   * Handler for when a node is added
   * @param primitive The primitive to add
   */


  /**
   * Binds the data in our databuffer to the model
   * @param forceAll Force all the attributes to return
   */
  bindDataToModel() {
    let forceAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let updated = false;

    if (this.data) {
      updated = forceAll || this.needsDataBind;

      if (updated) {
        this.needsDataBind = false;
        const uint8 = this._data.store.uint8Array;
        this.modelBuffer.setData(uint8);
        this.translucentModelBuffer.setData(uint8);
        const instanceCount = this._data.count;
        this.model.setInstanceCount(instanceCount);
        this.translucentModel.setInstanceCount(instanceCount);
      }
    }

    return updated;
  }

}

exports.EdgesRenderable = EdgesRenderable;