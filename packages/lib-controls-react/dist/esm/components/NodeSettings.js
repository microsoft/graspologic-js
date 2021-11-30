import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachNodeSettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer node settings to the SettingsPane
 */

export var NodeSettings = memo(function NodeSettings(_ref) {
  var minRadiusRange = _ref.minRadiusRange,
      maxRadiusRange = _ref.maxRadiusRange;
  var gui = useContext(DatGuiContext);
  var renderer = useContext(GraphRendererContext);
  useEffect(function () {
    if (gui && renderer) {
      return attachNodeSettings(gui, renderer, {
        minRadiusRange: minRadiusRange,
        maxRadiusRange: maxRadiusRange
      });
    }
  }, [gui, renderer, minRadiusRange, maxRadiusRange]);
  return null;
});