"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGraphRenderer = useGraphRenderer;

var _react = require("react");

var _renderer = require("@graspologic/renderer");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Creates a new GraphRenderer instance
 * @param nodeCountHint The number of nodes in the graph
 * @param edgeCountHint The number of edges in the graph
 * @param container The graph container to use
 * @param drawEdges If true, edges will be drawn
 */
function useGraphRenderer(nodeCountHint, edgeCountHint, drawEdges, container, dataBounds) {
  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      renderer = _useState2[0],
      setRenderer = _useState2[1]; // Create the Renderer Instance when the ref changes


  (0, _react.useEffect)(function () {
    var newRenderer;

    if (ref.current) {
      var current = ref.current;
      newRenderer = _renderer.WebGLGraphRenderer.createInstance({
        nodeCountHint: nodeCountHint,
        edgeCountHint: edgeCountHint,
        drawEdges: drawEdges,
        dataBounds: dataBounds
      }, container);
      current.appendChild(newRenderer.view);
      setRenderer(newRenderer);
      return function () {
        if (newRenderer) {
          current.removeChild(newRenderer.view);
          newRenderer.destroy();
        }
      };
    }
  }, [nodeCountHint, edgeCountHint, drawEdges, dataBounds, container]);
  return [ref, renderer];
}