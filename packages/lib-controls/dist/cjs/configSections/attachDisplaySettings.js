"use strict";

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachDisplaySettings = attachDisplaySettings;
var DEFAULT_SETTINGS = {
  interpolationTimeRange: [10, 10000]
};
/**
 * @internal
 *
 * Attaches the "Display" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */

function attachDisplaySettings(gui, renderer) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$interpolationTim = _ref.interpolationTimeRange,
      interpolationTimeRange = _ref$interpolationTim === void 0 ? DEFAULT_SETTINGS.interpolationTimeRange : _ref$interpolationTim;

  var folder = gui.addFolder('Display');
  folder.add(renderer.config, 'cornerAxes').name('Axes in Corner');
  folder.add(renderer.config, 'is3D').name('3D');
  folder.add(renderer.config, 'hideDeselected').name('Hide Deselected');
  folder.add(renderer.config, 'interpolationTime', interpolationTimeRange[0], interpolationTimeRange[1]).name('Interpolation Time');
  folder.addColor(renderer.config, 'hoverHighlightColor').name('Highlight Color');
  return function () {
    return gui.removeFolder(folder);
  };
}