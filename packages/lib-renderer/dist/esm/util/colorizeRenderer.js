const DEFAULT_NAME = 'DEFAULT';
export function correctColor(color) {
  return (color ^ 0xff000000 | 0xff000000) >>> 0;
}
export function createBGRAColorizer(colorizerFn = () => 0xff0000ff) {
  return (id, group) => {
    const arr = colorizerFn(id, group);
    return typeof arr === 'number' ? arr : componentColorToBGRA(arr);
  };
}
/**
 * Applies a colorizer function to the graph renderer
 * @param renderer The renderer to colorize
 * @param colorizerFn The function to use to color the renderer
 */

export function colorizeRenderer(renderer, colorizerFn) {
  const colorizer = createBGRAColorizer(colorizerFn);
  const nodeColors = new Map();
  let color;
  const edgeCount = renderer.graph.edges.count;

  for (const node of renderer.scene.nodes(true)) {
    color = correctColor(colorizer(node.id, node.group));
    node.color = color;

    if (edgeCount > 0) {
      nodeColors.set(node.id || DEFAULT_NAME, color);
    }
  }

  if (edgeCount > 0) {
    let nodeColor;

    for (const edge of renderer.scene.edges(true)) {
      nodeColor = nodeColors.get(edge.source);

      if (nodeColor != null) {
        edge.color = nodeColor;
      }

      nodeColor = nodeColors.get(edge.target);

      if (nodeColor != null) {
        edge.color2 = nodeColor;
      }
    }
  }
}
/**
 * Converts color components to a BGRA int color
 * @param components The color components [r, g, b, a]
 */

export function componentColorToBGRA(components) {
  return (components[3] * 255 << 24) + (components[2] * 255 << 16) + (components[1] * 255 << 8) + components[0] * 255;
}