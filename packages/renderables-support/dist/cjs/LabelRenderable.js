"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelRenderable = void 0;

require("core-js/modules/es.typed-array.float32-array.js");

require("core-js/modules/es.typed-array.sort.js");

var _engine = require("@luma.gl/engine");

var _webgl = require("@luma.gl/webgl");

var _common = require("@graspologic/common");

var _lumaUtils = require("@graspologic/luma-utils");

var _renderablesBase = require("@graspologic/renderables-base");

var _labelFs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/label.fs.glsl"));

var _labelVs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/label.vs.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// We have no equivalent in the typings
const getNextId = (0, _lumaUtils.createIdFactory)('LabelInstance');
/**
 * A renderable that can be added to a GraphRenderer for rendering labels
 */

class LabelRenderable extends _renderablesBase.DirtyableRenderable {
  /**
   * Constructor
   * @param gl The gl context to render to
   * @param id The id for the renderable
   */
  constructor(gl) {
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getNextId();
    super();

    _defineProperty(this, "renderTextureHandler", () => this._renderTexture());

    _defineProperty(this, "_text", new _common.PropertyContainer(''));

    _defineProperty(this, "_font", new _common.PropertyContainer('monospace'));

    _defineProperty(this, "_fontSize", new _common.PropertyContainer(18));

    _defineProperty(this, "_weight", new _common.PropertyContainer(0));

    _defineProperty(this, "_horizontalPadding", new _common.PropertyContainer(8));

    _defineProperty(this, "_verticalPadding", new _common.PropertyContainer(2));

    _defineProperty(this, "_outline", new _common.PropertyContainer(4));

    _defineProperty(this, "_backgroundColor", new _common.PropertyContainer('rgb(134, 135, 159)'));

    _defineProperty(this, "_outlineColor", new _common.PropertyContainer('rgb(107, 108, 127)'));

    _defineProperty(this, "_textColor", new _common.PropertyContainer('rgb(240, 241, 255)'));

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "texture", void 0);

    _defineProperty(this, "position01", []);

    this.model = this._createModel(gl, id);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') || undefined;
    this.texture = new _webgl.Texture2D(gl, {
      format: _lumaUtils.GL_RGBA,
      mipmaps: false,
      parameters: {
        [_lumaUtils.GL_TEXTURE_MIN_FILTER]: _lumaUtils.GL_LINEAR,
        [_lumaUtils.GL_TEXTURE_WRAP_S]: _lumaUtils.GL_CLAMP_TO_EDGE,
        [_lumaUtils.GL_TEXTURE_WRAP_T]: _lumaUtils.GL_CLAMP_TO_EDGE
      }
    });

    this._text.on('change', this.renderTextureHandler);

    this._font.on('change', this.renderTextureHandler);

    this._fontSize.on('change', this.renderTextureHandler);

    this._weight.on('change', this.makeDirtyHandler);

    this._horizontalPadding.on('change', this.renderTextureHandler);

    this._verticalPadding.on('change', this.renderTextureHandler);

    this._backgroundColor.on('change', this.renderTextureHandler);

    this._outlineColor.on('change', this.renderTextureHandler);

    this._textColor.on('change', this.renderTextureHandler);
  }
  /**
   * Gets the label to display
   */


  get text() {
    return this._text.value;
  }
  /**
   * Sets the label to display
   */


  set text(value) {
    this._text.value = value;
  }
  /**
   * Sets the font
   */


  get font() {
    return this._font.value;
  }
  /**
   * Gets the font
   */


  set font(value) {
    this._font.value = value;
  }
  /**
   * Gets the font size
   */


  get fontSize() {
    return this._fontSize.value;
  }
  /**
   * Sets the font size
   */


  set fontSize(value) {
    this._fontSize.value = value;
  }
  /**
   * Gets the horizontal padding
   */


  get horizontalPadding() {
    return this._horizontalPadding.value;
  }
  /**
   * Sets the horizontal padding
   */


  set horizontalPadding(value) {
    this._horizontalPadding.value = value;
  }
  /**
   * Gets the vertical padding
   */


  get verticalPadding() {
    return this._verticalPadding.value;
  }
  /**
   * Sets the vertical padding
   */


  set verticalPadding(value) {
    this._verticalPadding.value = value;
  }
  /**
   * Gets the outline width
   */


  get outlineWidth() {
    return this._outline.value;
  }
  /**
   * Sets the outline width
   */


  set outlineWidth(value) {
    this._outline.value = value;
  }
  /**
   * Gets the outline color
   */


  get outlineColor() {
    return this._outlineColor.value;
  }
  /**
   * Sets the outline color
   */


  set outlineColor(value) {
    this._outlineColor.value = value;
  }
  /**
   * Gets the background color
   */


  get backgroundColor() {
    return this._backgroundColor.value;
  }
  /**
   * Sets the background color
   */


  set backgroundColor(value) {
    this._backgroundColor.value = value;
  }
  /**
   * Gets the text color
   */


  get textColor() {
    return this._textColor.value;
  }
  /**
   * Sets the text color
   */


  set textColor(value) {
    this._outlineColor.value = value;
  }
  /**
   * Gets the weight
   */


  get weight() {
    return this._weight.value;
  }
  /**
   * Sets the weight
   */


  set weight(value) {
    this._weight.value = value;
  }
  /**
   * Draws the LabelRenderable
   * @param options The render options
   */


  draw(options) {
    const {
      modelViewMatrix,
      projectionMatrix,
      canvasPixelSize,
      minRadius,
      maxRadius
    } = options;

    if (this.enabled) {
      this.model.draw({
        parameters: {
          depthMask: false,
          [_lumaUtils.GL_DEPTH_TEST]: false,
          blend: true
        },
        uniforms: {
          uPosition01: this.position01,
          uModelView: modelViewMatrix,
          uProjection: projectionMatrix,
          uTexture: this.texture,
          uScreenSize: canvasPixelSize,
          uSize: [this.canvas.width, this.canvas.height],
          uMinRadius: minRadius,
          uMaxRadius: maxRadius,
          uWeight: this.weight
        }
      });
    }

    this.setNeedsRedraw(false);
  }
  /**
   * Sets the position of the label
   * @param position01 The position of the label
   */


  setPositions(position01) {
    this.position01 = position01;
  }
  /**
   * Gets the set of shaders used for the label renderable
   */


  _getShaders() {
    return {
      vs: _labelVs.default,
      fs: _labelFs.default,
      modules: []
    };
  }
  /**
   * Creates a model that represents a label
   * @param gl The gl context
   * @param id The id of the model
   */


  _createModel(gl, id) {
    const UVs = [];
    const vertices = [];
    /*
     *  (0, 0)-------------_(1, 0)
     *      |          _,-"  |
     *      o      _,-"      o
     *      |  _,-"          |
     *  (0, 1)"-------------(1, 1)
     */

    vertices.push(0, 0, 0);
    UVs.push(0, 1);
    vertices.push(1, 0, 0);
    UVs.push(1, 1);
    vertices.push(0, 1, 0);
    UVs.push(0, 0);
    vertices.push(1, 1, 0);
    UVs.push(1, 0);
    return new _engine.Model(gl, _objectSpread(_objectSpread({}, this._getShaders()), {}, {
      id: id,
      geometry: new _engine.Geometry({
        drawMode: _lumaUtils.GL_TRIANGLE_STRIP,
        attributes: {
          aVertex: {
            value: new Float32Array(vertices),
            size: 3
          },
          aUV: {
            value: new Float32Array(UVs),
            size: 2
          }
        }
      }),
      isInstanced: false,
      vertexCount: 4
    }));
  }
  /**
   * Renders the label to a texture
   */


  _renderTexture() {
    if (!this.ctx) {
      return;
    }

    const pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio || 1;
    this.ctx.font = "".concat(this.fontSize * pixelRatio, "px monospace");
    this.canvas.width = this.ctx.measureText(this.text).width + this.horizontalPadding * 2 * pixelRatio;
    this.canvas.height = this.fontSize * pixelRatio + this.verticalPadding * 2 * pixelRatio;
    this.ctx.font = "".concat(this.fontSize * pixelRatio, "px ").concat(this.font);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.lineWidth = this.outlineWidth;
    this.ctx.strokeStyle = this.outlineColor;

    this._roundRect(this.outlineWidth, this.outlineWidth, this.canvas.width - this.outlineWidth * 2, this.canvas.height - this.outlineWidth * 2, 10, true);

    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.text, this.canvas.width * 0.5, this.canvas.height * 0.5);
    this.texture.setImageData({
      pixels: this.canvas,
      width: this.canvas.width,
      height: this.canvas.height
    });
    this.setNeedsRedraw(true);
  }
  /**
   * Draws a rounded rect to the current ctx
   * @param x The x location of the rectangle
   * @param y The y location of the rectangle
   * @param width The width of the rectangle
   * @param height The height of the rectangle
   * @param radius The radius of the corners
   * @param fill The fill of the rectangle
   * @param stroke The stroke of the rectangle
   */


  _roundRect(x, y, width, height) {
    let radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;
    let fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    let stroke = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    const ctx = this.ctx;

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      if (stroke) {
        ctx.stroke();
      }

      if (fill) {
        ctx.fill();
      }
    }
  }

}

exports.LabelRenderable = LabelRenderable;