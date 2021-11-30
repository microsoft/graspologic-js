"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weight = exports.visible = exports.shape = exports.radius = exports.position = exports.WEIGHT_OFFSET = exports.VertexSetRenderable = exports.SHAPE_OFFSET = exports.RADIUS_OFFSET = exports.POSITION_OFFSET = exports.LAYOUT_STRIDE = exports.LAYOUT = void 0;

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.float32-array.js");

var _engine = require("@luma.gl/engine");

var _common = require("@graspologic/common");

var _lumaUtils = require("@graspologic/luma-utils");

var _memstore = require("@graspologic/memstore");

var _renderablesBase = require("@graspologic/renderables-base");

var _highlightFs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/highlight.fs.glsl"));

var _highlightVs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/highlight.vs.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// We have no equivalent in the typings
const getNextId = (0, _lumaUtils.createIdFactory)('VertexHighlight');
const position = Symbol('VertexBody::position');
exports.position = position;
const radius = Symbol('VertexBody::radius');
exports.radius = radius;
const weight = Symbol('VertexBody::weight');
exports.weight = weight;
const visible = Symbol('VertexBody::visible');
exports.visible = visible;
const shape = Symbol('VertexBody::shape');
exports.shape = shape;
const LAYOUT = (0, _memstore.createLayoutBuilder)().addFloat32Vec3('position').addFloat32('weight').addFloat32('radius').addFloat32('shape').build();
exports.LAYOUT = LAYOUT;
const LAYOUT_STRIDE = LAYOUT.stride;
exports.LAYOUT_STRIDE = LAYOUT_STRIDE;
const POSITION_OFFSET = LAYOUT.get('position').offset;
exports.POSITION_OFFSET = POSITION_OFFSET;
const WEIGHT_OFFSET = LAYOUT.get('weight').offset;
exports.WEIGHT_OFFSET = WEIGHT_OFFSET;
const RADIUS_OFFSET = LAYOUT.get('radius').offset;
exports.RADIUS_OFFSET = RADIUS_OFFSET;
const SHAPE_OFFSET = LAYOUT.get('shape').offset;
/**
 * A vertex renderable for a multiple vertices, for use in rendering like highlights
 */

exports.SHAPE_OFFSET = SHAPE_OFFSET;

class VertexSetRenderable extends _renderablesBase.DataboundRenderable {
  /**
   * Constructor
   * @param gl The gl context
   * @param id The id of the renderable
   */
  constructor(gl) {
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getNextId();
    super();

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "nodeGLBuffer", void 0);

    _defineProperty(this, "_color", new _common.PropertyContainer([160 / 255, 240 / 255, 255 / 255, 207 / 255], _common.areColorsEqual));

    this.id = id;

    const {
      model,
      buffer
    } = this._createModel(gl, id);

    this.model = model;
    this.nodeGLBuffer = buffer;

    this._color.on('change', this.makeDirtyHandler);
  }
  /**
   * Gets the color for the renderable
   */


  get color() {
    return this._color.value;
  }
  /**
   * Sets the color for the renderable
   */


  set color(value) {
    this._color.value = value;
  }
  /**
   * Draws the VertexSetHighlightRenderable
   * @param options The render options
   */


  draw(options) {
    const {
      modelViewMatrix,
      projectionMatrix,
      minRadius,
      maxRadius,
      weightToPixel
    } = options;

    if (this.enabled) {
      this.model.draw({
        parameters: {
          depthMask: false,
          [_lumaUtils.GL_DEPTH_TEST]: false,
          blend: true
        },
        uniforms: {
          uModelView: modelViewMatrix,
          uProjection: projectionMatrix,
          uMinRadius: minRadius * weightToPixel,
          uMaxRadius: maxRadius * weightToPixel,
          uOutline: 1,
          uColor: this.color.map(c => c * 255)
        }
      });
    }

    this.setNeedsRedraw(false);
  }
  /**
   * Sets the vertex to be rendered
   * @param vertices The vertex to render
   */


  handleSetData(vertices) {
    const buffer = new ArrayBuffer(vertices.length * LAYOUT_STRIDE);
    const view = new DataView(buffer);
    let vertex;
    let pos;
    let itemByteOffset;

    for (let i = 0; i < vertices.length; i++) {
      vertex = vertices[i];
      itemByteOffset = i * LAYOUT_STRIDE;

      if (vertex) {
        pos = vertex.position; // Position

        view.setFloat32(itemByteOffset + POSITION_OFFSET, pos[0], true);
        view.setFloat32(itemByteOffset + POSITION_OFFSET + 4, pos[1], true);
        view.setFloat32(itemByteOffset + POSITION_OFFSET + 8, pos[2], true);
        view.setFloat32(itemByteOffset + RADIUS_OFFSET, vertex.radius, true);
        view.setFloat32(itemByteOffset + WEIGHT_OFFSET, vertex.weight, true);
        view.setFloat32(itemByteOffset + SHAPE_OFFSET, vertex.shape, true);
      }
    }

    this._updateModelData(buffer, vertices.length);

    this.setNeedsRedraw(true);
  }
  /**
   * Updates the data bound to the model
   * @param data The raw data buffer
   * @param count The number of nodes
   */


  _updateModelData(data, count) {
    this.nodeGLBuffer.setData(new Uint8Array(data));
    this.model.setInstanceCount(count);
  }
  /**
   * Gets the shaders used with the vertex body
   */


  _getShaders() {
    return {
      vs: _highlightVs.default,
      fs: _highlightFs.default,
      modules: []
    };
  }
  /**
   * Creates the model used for rendering the vertex body
   * @param gl The gl context
   * @param id The id of the model
   */


  _createModel(gl, id) {
    // prettier-ignore
    const positions = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
    const {
      buffer,
      attributes
    } = (0, _lumaUtils.adaptMemoryLayoutToLuma)(gl, LAYOUT);
    return {
      model: new _engine.Model(gl, _objectSpread(_objectSpread({}, this._getShaders()), {}, {
        id,
        isInstanced: true,
        shaderCache: null,
        geometry: new _engine.Geometry({
          drawMode: _lumaUtils.GL_TRIANGLE_STRIP,
          vertexCount: 4,
          attributes: {
            aVertex: {
              value: new Float32Array(positions),
              size: 3,
              type: _lumaUtils.GL_FLOAT
            }
          }
        }),
        attributes
      })),
      buffer
    };
  }

}

exports.VertexSetRenderable = VertexSetRenderable;