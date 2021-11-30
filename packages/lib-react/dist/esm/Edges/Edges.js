import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { DEFAULT_HIDE_EDGES_ON_MOVE, DEFAULT_DRAW_EDGES, DEFAULT_EDGE_CONSTANT_WIDTH, DEFAULT_EDGE_DEPTH_WRITE, DEFAULT_EDGE_ANTIALIAS, DEFAULT_EDGE_ALPHA, DEFAULT_EDGE_MIN_WIDTH, DEFAULT_EDGE_MAX_WIDTH, DEFAULT_EDGE_FILTERED_OUT_SATURATION, DEFAULT_EDGE_FILTERED_IN_SATURATION } from '@graspologic/renderer';
/**
 * Configures the edge rendering for a GraphView
 */

export var Edges = memo(function (_ref) {
  var _ref$hideOnMove = _ref.hideOnMove,
      hideOnMove = _ref$hideOnMove === void 0 ? DEFAULT_HIDE_EDGES_ON_MOVE : _ref$hideOnMove,
      _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? DEFAULT_DRAW_EDGES : _ref$shown,
      _ref$constantWidth = _ref.constantWidth,
      constantWidth = _ref$constantWidth === void 0 ? DEFAULT_EDGE_CONSTANT_WIDTH : _ref$constantWidth,
      _ref$depthWrite = _ref.depthWrite,
      depthWrite = _ref$depthWrite === void 0 ? DEFAULT_EDGE_DEPTH_WRITE : _ref$depthWrite,
      _ref$antialias = _ref.antialias,
      antialias = _ref$antialias === void 0 ? DEFAULT_EDGE_ANTIALIAS : _ref$antialias,
      _ref$alpha = _ref.alpha,
      alpha = _ref$alpha === void 0 ? DEFAULT_EDGE_ALPHA : _ref$alpha,
      _ref$minWidth = _ref.minWidth,
      minWidth = _ref$minWidth === void 0 ? DEFAULT_EDGE_MIN_WIDTH : _ref$minWidth,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === void 0 ? DEFAULT_EDGE_MAX_WIDTH : _ref$maxWidth,
      _ref$filteredOutSatur = _ref.filteredOutSaturation,
      filteredOutSaturation = _ref$filteredOutSatur === void 0 ? DEFAULT_EDGE_FILTERED_OUT_SATURATION : _ref$filteredOutSatur,
      _ref$filteredInSatura = _ref.filteredInSaturation,
      filteredInSaturation = _ref$filteredInSatura === void 0 ? DEFAULT_EDGE_FILTERED_IN_SATURATION : _ref$filteredInSatura;
  var renderer = useContext(GraphRendererContext);
  useEffect(function () {
    if (renderer) {
      renderer.config.drawEdges = shown;
    }
  }, [renderer, shown]);
  useEffect(function () {
    if (renderer) {
      renderer.config.hideEdgesOnMove = hideOnMove;
    }
  }, [renderer, hideOnMove]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeConstantWidth = constantWidth;
    }
  }, [renderer, constantWidth]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeDepthWrite = depthWrite;
    }
  }, [renderer, depthWrite]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeAntialias = antialias;
    }
  }, [renderer, antialias]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeMinWidth = minWidth;
    }
  }, [renderer, minWidth]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeMaxWidth = maxWidth;
    }
  }, [renderer, maxWidth]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeAlpha = alpha;
    }
  }, [renderer, alpha]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeFilteredInSaturation = filteredInSaturation;
    }
  }, [renderer, filteredInSaturation]);
  useEffect(function () {
    if (renderer) {
      renderer.config.edgeFilteredOutSaturation = filteredOutSaturation;
    }
  }, [renderer, filteredOutSaturation]);
  return null;
});
Edges.displayName = 'Edges';