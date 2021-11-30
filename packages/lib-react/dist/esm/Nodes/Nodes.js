import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { DEFAULT_NODE_MIN_RADIUS, DEFAULT_NODE_MAX_RADIUS, DEFAULT_NODE_OUTLINE, DEFAULT_HIDE_NODES_ON_MOVE, DEFAULT_DRAW_NODES, DEFAULT_NODE_FILTERED_OUT_SATURATION, DEFAULT_NODE_FILTERED_IN_SATURATION } from '@graspologic/renderer';
/**
 * Configures the node rendering for the GraphView component
 */

export var Nodes = memo(function (_ref) {
  var _ref$minRadius = _ref.minRadius,
      minRadius = _ref$minRadius === void 0 ? DEFAULT_NODE_MIN_RADIUS : _ref$minRadius,
      _ref$maxRadius = _ref.maxRadius,
      maxRadius = _ref$maxRadius === void 0 ? DEFAULT_NODE_MAX_RADIUS : _ref$maxRadius,
      _ref$outline = _ref.outline,
      outline = _ref$outline === void 0 ? DEFAULT_NODE_OUTLINE : _ref$outline,
      _ref$hideOnMove = _ref.hideOnMove,
      hideOnMove = _ref$hideOnMove === void 0 ? DEFAULT_HIDE_NODES_ON_MOVE : _ref$hideOnMove,
      _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? DEFAULT_DRAW_NODES : _ref$shown,
      filteredIds = _ref.filteredIds,
      _ref$filteredOutSatur = _ref.filteredOutSaturation,
      filteredOutSaturation = _ref$filteredOutSatur === void 0 ? DEFAULT_NODE_FILTERED_OUT_SATURATION : _ref$filteredOutSatur,
      _ref$filteredInSatura = _ref.filteredInSaturation,
      filteredInSaturation = _ref$filteredInSatura === void 0 ? DEFAULT_NODE_FILTERED_IN_SATURATION : _ref$filteredInSatura;
  var renderer = useContext(GraphRendererContext);
  useEffect(function () {
    if (renderer && minRadius != null) {
      renderer.config.nodeMinRadius = minRadius;
    }
  }, [renderer, minRadius]);
  useEffect(function () {
    if (renderer && maxRadius != null) {
      renderer.config.nodeMaxRadius = maxRadius;
    }
  }, [renderer, maxRadius]);
  useEffect(function () {
    if (renderer) {
      renderer.config.nodeOutline = outline;
    }
  }, [renderer, outline]);
  useEffect(function () {
    if (renderer) {
      renderer.config.hideNodesOnMove = hideOnMove;
    }
  }, [renderer, hideOnMove]);
  useEffect(function () {
    if (renderer) {
      renderer.config.drawNodes = shown;
    }
  }, [renderer, shown]);
  useEffect(function () {
    if (renderer) {
      renderer.config.nodeFilteredIds = filteredIds;
    }
  }, [renderer, filteredIds]);
  useEffect(function () {
    if (renderer) {
      renderer.config.nodeFilteredInSaturation = filteredInSaturation;
    }
  }, [renderer, filteredInSaturation]);
  useEffect(function () {
    if (renderer) {
      renderer.config.nodeFilteredOutSaturation = filteredOutSaturation;
    }
  }, [renderer, filteredOutSaturation]);
  return null;
});
Nodes.displayName = 'Nodes';