"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createModel;

require("core-js/modules/es.typed-array.float32-array.js");

require("core-js/modules/es.typed-array.sort.js");

var _engine = require("@luma.gl/engine");

var _graph = require("@graspologic/graph");

var _lumaUtils = require("@graspologic/luma-utils");

var _edgeFs = _interopRequireDefault(require("@graspologic/renderer-glsl/dist/esm/shaders/edge.fs.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GL_TYPE_MAPPINGS = {
  color: _lumaUtils.uint32ColorTypeMapping,
  color2: _lumaUtils.uint32ColorTypeMapping
};
/**
 * Returns the shaders used for the edges
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */

function getShaders(vs) {
  let defines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    vs: vs,
    fs: _edgeFs.default,
    modules: [_lumaUtils.tween],
    defines: _objectSpread({
      USE_ANIMATION: 1
    }, defines)
  };
}
/**
 * @internal
 *
 * Creates a model object representing our edges
 * @param gl The gl context
 * @param id The id of the model
 * @param vs The vertex shader code
 * @param defines The set of defines to pass to the compiler
 */


function createModel(gl, id, vs) {
  let defines = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const positions = [-1, 0, 1, 0, -1, 1, 1, 1];
  const geometry = new _engine.Geometry({
    drawMode: _lumaUtils.GL_TRIANGLE_STRIP,
    vertexCount: 4,
    attributes: {
      aVertex: {
        value: new Float32Array(positions),
        size: 2,
        type: _lumaUtils.GL_FLOAT
      }
    }
  });
  const {
    buffer,
    attributes
  } = (0, _lumaUtils.adaptMemoryLayoutToLuma)(gl, _graph.edgeMemoryLayout, GL_TYPE_MAPPINGS);
  return {
    model: new _engine.Model(gl, _objectSpread(_objectSpread({}, getShaders(vs, defines)), {}, {
      id,
      isInstanced: true,
      shaderCache: null,
      geometry,
      attributes
    })),
    buffer
  };
}