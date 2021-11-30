import "core-js/modules/es.function.name";
var DEFAULT_SETTINGS = {
  alphaRange: [0, 1],
  minWidthRange: [0.1, 50],
  maxWidthRange: [0.1, 50]
};
/**
 * @internal
 *
 * Attaches the "Edge" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */

export function attachEdgeSettings(gui, renderer) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$alphaRange = _ref.alphaRange,
      alphaRange = _ref$alphaRange === void 0 ? DEFAULT_SETTINGS.alphaRange : _ref$alphaRange,
      _ref$minWidthRange = _ref.minWidthRange,
      minWidthRange = _ref$minWidthRange === void 0 ? DEFAULT_SETTINGS.minWidthRange : _ref$minWidthRange,
      _ref$maxWidthRange = _ref.maxWidthRange,
      maxWidthRange = _ref$maxWidthRange === void 0 ? DEFAULT_SETTINGS.maxWidthRange : _ref$maxWidthRange;

  var folder = gui.addFolder('Edges');
  folder.add(renderer.config, 'drawEdges').name('Draw Edges');
  folder.add(renderer.config, 'hideEdgesOnMove').name('Hide Edges Move');
  folder.add(renderer.config, 'edgeConstantWidth').name('Constant Edge Width');
  folder.add(renderer.config, 'edgeDepthWrite').name('Depth Write');
  folder.add(renderer.config, 'edgeAntialias').name('Edge Antialias');
  folder.add(renderer.config, 'edgeAlpha', alphaRange[0], alphaRange[1]).name('Edge Alpha');
  folder.add(renderer.config, 'edgeMinWidth', minWidthRange[0], minWidthRange[1]).name('Edges Min Width');
  folder.add(renderer.config, 'edgeMaxWidth', maxWidthRange[0], maxWidthRange[1]).name('Edges Max Width');
  return function () {
    return gui.removeFolder(folder);
  };
}