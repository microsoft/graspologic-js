import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-own-property-descriptors";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { memo, forwardRef, useCallback, useMemo } from 'react';
import { SizedToParent } from '../SizedToParent';
import { GraphRendererContext } from './context';
import { use3DMode } from './hooks/use3DMode';
import { useBindCallbacks } from './hooks/useBindCallbacks';
import { useGraphColorizer } from './hooks/useGraphColorizer';
import { useGraphContainer } from './hooks/useGraphContainer';
import { useGraphHideDeselected } from './hooks/useGraphHideDeselected';
import { useGraphImperativeApi } from './hooks/useGraphImperativeApi';
import { useGraphInterpolationTime } from './hooks/useGraphInterpolationTime';
import { useGraphRenderKickoff } from './hooks/useGraphRenderKickoff';
import { useGraphRenderer } from './hooks/useGraphRenderer';
import { useGraphRendererBackgroundColor } from './hooks/useGraphRendererBackgroundColor';
import { DEFAULT_BG_COLOR, DEFAULT_HIDE_DESELECTED, DEFAULT_IS_3D, DEFAULT_INTERPOLATION_TIME, DEFAULT_DRAW_EDGES } from '@graspologic/renderer';
var DEFAULT_STYLE = {
  width: 500,
  height: 500,
  position: 'relative'
};
var GraphViewRaw = forwardRef(function (_ref, ref) {
  var style = _ref.style,
      className = _ref.className,
      children = _ref.children,
      data = _ref.data,
      colorizer = _ref.colorizer,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? DEFAULT_BG_COLOR : _ref$backgroundColor,
      _ref$hideDeselected = _ref.hideDeselected,
      hideDeselected = _ref$hideDeselected === void 0 ? DEFAULT_HIDE_DESELECTED : _ref$hideDeselected,
      _ref$is3D = _ref.is3D,
      is3D = _ref$is3D === void 0 ? DEFAULT_IS_3D : _ref$is3D,
      _ref$interpolationTim = _ref.interpolationTime,
      interpolationTime = _ref$interpolationTim === void 0 ? DEFAULT_INTERPOLATION_TIME : _ref$interpolationTim,
      nodeCountHint = _ref.nodeCountHint,
      edgeCountHint = _ref.edgeCountHint,
      _ref$drawEdges = _ref.drawEdges,
      drawEdges = _ref$drawEdges === void 0 ? DEFAULT_DRAW_EDGES : _ref$drawEdges,
      dataBounds = _ref.dataBounds,
      onInitialize = _ref.onInitialize,
      onDataLoad = _ref.onDataLoad,
      onResize = _ref.onResize,
      onNodeClick = _ref.onNodeClick,
      onNodeHover = _ref.onNodeHover;
  var graphContainer = useGraphContainer(data);

  var _useGraphRenderer = useGraphRenderer(nodeCountHint, edgeCountHint, drawEdges, graphContainer, dataBounds),
      _useGraphRenderer2 = _slicedToArray(_useGraphRenderer, 2),
      renderRef = _useGraphRenderer2[0],
      renderer = _useGraphRenderer2[1];

  useBindCallbacks({
    renderer: renderer,
    callbacks: {
      onInitialize: onInitialize,
      onLoad: onDataLoad,
      onResize: onResize,
      onNodeClick: onNodeClick,
      onNodeHover: onNodeHover
    }
  });
  useGraphRendererBackgroundColor(renderer, backgroundColor);
  useGraphHideDeselected(renderer, hideDeselected);
  useGraphInterpolationTime(renderer, interpolationTime);
  useGraphImperativeApi(renderer, ref);
  use3DMode(renderer, is3D);
  useGraphRenderKickoff(renderer);
  useGraphColorizer(renderer, colorizer);
  var finalStyle = useMemo(function () {
    return _objectSpread(_objectSpread({}, DEFAULT_STYLE), style || {});
  }, [style]);
  var handleResize = useCallback(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;

    if (renderer) {
      renderer.resize(width, height);
    }
  }, [renderer]);
  return React.createElement("div", {
    className: className,
    style: finalStyle
  }, React.createElement(SizedToParent, {
    sizedRef: renderRef,
    onResize: handleResize
  }, React.createElement(GraphRendererContext.Provider, {
    value: renderer
  }, children)));
});
GraphViewRaw.displayName = 'GraphView';
/**
 * The GraphView component. This is the entry point for rendering graph data.
 */

export var GraphView = memo(GraphViewRaw);