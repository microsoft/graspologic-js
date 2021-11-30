import { memo, useContext, useEffect } from 'react';
import { GraphRendererContext } from '../GraphView';
import { useVertexSelectionSynchronization } from './hooks/useVertexSelectionSynchronization';
import { useVertexSetHighlightRenderable } from './hooks/useVertexSetHighlightRenderable';
import { DEFAULT_HOVER_HIGHLIGHT_COLOR } from '@graspologic/renderer';
/**
 * Adds functionality to the GraphView component which colors a set of verticies a given color
 */

export var NodeSetHighlight = memo(function (_ref) {
  var vertexIds = _ref.vertexIds,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? DEFAULT_HOVER_HIGHLIGHT_COLOR : _ref$color;
  var renderer = useContext(GraphRendererContext);
  var renderable = useVertexSetHighlightRenderable(renderer);
  useVertexSelectionSynchronization(renderer, renderable, vertexIds);
  useEffect(function () {
    if (renderable && color != null) {
      renderable.color = color;
    }
  }, [renderable, color]);
  return null;
});
NodeSetHighlight.displayName = 'NodeSetHighlight';