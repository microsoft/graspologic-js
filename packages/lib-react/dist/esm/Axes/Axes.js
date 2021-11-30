import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView/context';
import { useAxesRenderable } from './hooks/useAxesRenderable';
import { DEFAULT_DRAW_AXES, DEFAULT_CORNER_AXES } from '@graspologic/renderer';
/**
 * Display's a set of Axes on the graph renderer
 */

export var Axes = memo(function (_ref) {
  var _ref$shown = _ref.shown,
      shown = _ref$shown === void 0 ? DEFAULT_DRAW_AXES : _ref$shown,
      _ref$inCorner = _ref.inCorner,
      inCorner = _ref$inCorner === void 0 ? DEFAULT_CORNER_AXES : _ref$inCorner;
  var renderer = useContext(GraphRendererContext);
  useAxesRenderable(renderer);
  useEffect(function () {
    if (renderer) {
      renderer.config.cornerAxes = inCorner;
    }
  }, [renderer, inCorner]);
  useEffect(function () {
    if (renderer) {
      renderer.config.drawAxes = shown;
    }
  }, [renderer, shown]);
  return null;
});
Axes.displayName = 'Axes';