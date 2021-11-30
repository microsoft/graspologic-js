import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachEdgeSettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer edge settings to the SettingsPane
 */

export var EdgeSettings = memo(function EdgeSettings(_ref) {
  var alphaRange = _ref.alphaRange,
      minWidthRange = _ref.minWidthRange,
      maxWidthRange = _ref.maxWidthRange;
  var gui = useContext(DatGuiContext);
  var renderer = useContext(GraphRendererContext);
  useEffect(function () {
    if (gui && renderer) {
      return attachEdgeSettings(gui, renderer, {
        alphaRange: alphaRange,
        minWidthRange: minWidthRange,
        maxWidthRange: maxWidthRange
      });
    }
  }, [gui, renderer, alphaRange, minWidthRange, maxWidthRange]);
  return null;
});