import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachDisplaySettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer display settings to the SettingsPane
 */

export var DisplaySettings = memo(function DisplaySettings(_ref) {
  var interpolationTimeRange = _ref.interpolationTimeRange;
  var gui = useContext(DatGuiContext);
  var renderer = useContext(GraphRendererContext);
  useEffect(function () {
    if (gui && renderer) {
      return attachDisplaySettings(gui, renderer, {
        interpolationTimeRange: interpolationTimeRange
      });
    }
  }, [gui, renderer, interpolationTimeRange]);
  return null;
});