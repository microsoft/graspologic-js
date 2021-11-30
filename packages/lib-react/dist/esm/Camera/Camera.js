import { memo, useContext } from 'react';
import { GraphRendererContext } from '../GraphView/context';
import { useCameraAdjustmentMode } from './hooks/useCameraAdjustmentMode';
import { useCameraBounds } from './hooks/useCameraBounds';
import { usePanZoomBehavior } from './hooks/usePanZoomBehavior';
import { useZoomSynchronization } from './hooks/useZoomSynchronization';
import { CameraAdjustmentMode } from '@graspologic/renderer';
/**
 * Adds an adjustable camera to the current GraphRenderer
 */

export var Camera = memo(function (_ref) {
  var bounds = _ref.bounds,
      transitionDuration = _ref.transitionDuration,
      zoom = _ref.zoom,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? CameraAdjustmentMode.Graph : _ref$mode,
      _ref$interactive = _ref.interactive,
      interactive = _ref$interactive === void 0 ? true : _ref$interactive,
      _ref$doubleClickZoom = _ref.doubleClickZoom,
      doubleClickZoom = _ref$doubleClickZoom === void 0 ? true : _ref$doubleClickZoom;
  var renderer = useContext(GraphRendererContext); // Override mode if bounds is passed in

  useCameraAdjustmentMode(renderer, bounds ? CameraAdjustmentMode.None : mode);
  useCameraBounds(renderer, bounds, transitionDuration);
  usePanZoomBehavior(renderer, interactive, doubleClickZoom);
  useZoomSynchronization(renderer, zoom);
  return null;
});
Camera.displayName = 'Camera';