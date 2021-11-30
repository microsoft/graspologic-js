"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphView = void 0;

var React = _interopRequireWildcard(require("react"));

var _SizedToParent = require("../SizedToParent");

var _context = require("./context");

var _use3DMode = require("./hooks/use3DMode");

var _useBindCallbacks = require("./hooks/useBindCallbacks");

var _useGraphColorizer = require("./hooks/useGraphColorizer");

var _useGraphContainer = require("./hooks/useGraphContainer");

var _useGraphHideDeselected = require("./hooks/useGraphHideDeselected");

var _useGraphImperativeApi = require("./hooks/useGraphImperativeApi");

var _useGraphInterpolationTime = require("./hooks/useGraphInterpolationTime");

var _useGraphRenderKickoff = require("./hooks/useGraphRenderKickoff");

var _useGraphRenderer3 = require("./hooks/useGraphRenderer");

var _useGraphRendererBackgroundColor = require("./hooks/useGraphRendererBackgroundColor");

var _renderer = require("@graspologic/renderer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_STYLE = {
  width: 500,
  height: 500,
  position: 'relative'
};
var GraphViewRaw = (0, React.forwardRef)(function (_ref, ref) {
  var style = _ref.style,
      className = _ref.className,
      children = _ref.children,
      data = _ref.data,
      colorizer = _ref.colorizer,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? _renderer.DEFAULT_BG_COLOR : _ref$backgroundColor,
      _ref$hideDeselected = _ref.hideDeselected,
      hideDeselected = _ref$hideDeselected === void 0 ? _renderer.DEFAULT_HIDE_DESELECTED : _ref$hideDeselected,
      _ref$is3D = _ref.is3D,
      is3D = _ref$is3D === void 0 ? _renderer.DEFAULT_IS_3D : _ref$is3D,
      _ref$interpolationTim = _ref.interpolationTime,
      interpolationTime = _ref$interpolationTim === void 0 ? _renderer.DEFAULT_INTERPOLATION_TIME : _ref$interpolationTim,
      nodeCountHint = _ref.nodeCountHint,
      edgeCountHint = _ref.edgeCountHint,
      _ref$drawEdges = _ref.drawEdges,
      drawEdges = _ref$drawEdges === void 0 ? _renderer.DEFAULT_DRAW_EDGES : _ref$drawEdges,
      dataBounds = _ref.dataBounds,
      onInitialize = _ref.onInitialize,
      onDataLoad = _ref.onDataLoad,
      onResize = _ref.onResize,
      onNodeClick = _ref.onNodeClick,
      onNodeHover = _ref.onNodeHover;
  var graphContainer = (0, _useGraphContainer.useGraphContainer)(data);

  var _useGraphRenderer = (0, _useGraphRenderer3.useGraphRenderer)(nodeCountHint, edgeCountHint, drawEdges, graphContainer, dataBounds),
      _useGraphRenderer2 = _slicedToArray(_useGraphRenderer, 2),
      renderRef = _useGraphRenderer2[0],
      renderer = _useGraphRenderer2[1];

  (0, _useBindCallbacks.useBindCallbacks)({
    renderer: renderer,
    callbacks: {
      onInitialize: onInitialize,
      onLoad: onDataLoad,
      onResize: onResize,
      onNodeClick: onNodeClick,
      onNodeHover: onNodeHover
    }
  });
  (0, _useGraphRendererBackgroundColor.useGraphRendererBackgroundColor)(renderer, backgroundColor);
  (0, _useGraphHideDeselected.useGraphHideDeselected)(renderer, hideDeselected);
  (0, _useGraphInterpolationTime.useGraphInterpolationTime)(renderer, interpolationTime);
  (0, _useGraphImperativeApi.useGraphImperativeApi)(renderer, ref);
  (0, _use3DMode.use3DMode)(renderer, is3D);
  (0, _useGraphRenderKickoff.useGraphRenderKickoff)(renderer);
  (0, _useGraphColorizer.useGraphColorizer)(renderer, colorizer);
  var finalStyle = (0, React.useMemo)(function () {
    return _objectSpread(_objectSpread({}, DEFAULT_STYLE), style || {});
  }, [style]);
  var handleResize = (0, React.useCallback)(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;

    if (renderer) {
      renderer.resize(width, height);
    }
  }, [renderer]);
  return React.createElement("div", {
    className: className,
    style: finalStyle
  }, React.createElement(_SizedToParent.SizedToParent, {
    sizedRef: renderRef,
    onResize: handleResize
  }, React.createElement(_context.GraphRendererContext.Provider, {
    value: renderer
  }, children)));
});
GraphViewRaw.displayName = 'GraphView';
/**
 * The GraphView component. This is the entry point for rendering graph data.
 */

var GraphView = (0, React.memo)(GraphViewRaw);
exports.GraphView = GraphView;