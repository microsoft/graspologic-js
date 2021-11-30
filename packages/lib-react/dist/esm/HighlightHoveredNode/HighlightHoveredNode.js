import { memo, useEffect } from 'react';
import { useHoveredVertexRenderable } from './hooks/useHoveredVertexRenderable';
import { DEFAULT_HOVER_HIGHLIGHT_COLOR } from '@graspologic/renderer';
/**
 * Adds functionality to the GraphView component which highlights hovered nodes
 */

export var HighlightHoveredNode = memo(function (_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? DEFAULT_HOVER_HIGHLIGHT_COLOR : _ref$color,
      onHover = _ref.onHover;
  var renderable = useHoveredVertexRenderable(onHover);
  useEffect(function () {
    if (renderable) {
      renderable.color = color;
    }
  }, [color, renderable]);
  return null;
});
HighlightHoveredNode.displayName = 'HighlightHoveredNode';