"use strict";

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachNodeSettings = attachNodeSettings;
var DEFAULT_SETTINGS = {
  minRadiusRange: [0.01, 50],
  maxRadiusRange: [0.01, 100]
};
/**
 * @internal
 *
 * Attaches the "Node" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */

function attachNodeSettings(gui, renderer) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$minRadiusRange = _ref.minRadiusRange,
      minRadiusRange = _ref$minRadiusRange === void 0 ? DEFAULT_SETTINGS.maxRadiusRange : _ref$minRadiusRange,
      _ref$maxRadiusRange = _ref.maxRadiusRange,
      maxRadiusRange = _ref$maxRadiusRange === void 0 ? DEFAULT_SETTINGS.maxRadiusRange : _ref$maxRadiusRange;

  var folder = gui.addFolder('Nodes');
  folder.add(renderer.config, 'drawNodes').name('Draw Nodes');
  folder.add(renderer.config, 'hideNodesOnMove').name('Hide Nodes Move');
  folder.add(renderer.config, 'nodeOutline').name('Node Outlines');
  folder.add(renderer.config, 'nodeMinRadius', minRadiusRange[0], minRadiusRange[1]).name('Node Min Radius');
  folder.add(renderer.config, 'nodeMaxRadius', maxRadiusRange[0], maxRadiusRange[1]).name('Node Max Radius');
  return function () {
    return gui.removeFolder(folder);
  };
}