import { memo } from 'react';
import { useHoveredVertexRenderable } from './hooks/useHoveredVertexRenderable';
/**
 * Adds functionality to the GraphView component which adds labels to hovered nodes
 */

export var LabelHoveredNode = memo(function (_ref) {
  var onHover = _ref.onHover;
  useHoveredVertexRenderable(onHover);
  return null;
});
LabelHoveredNode.displayName = 'LabelHoveredNode';