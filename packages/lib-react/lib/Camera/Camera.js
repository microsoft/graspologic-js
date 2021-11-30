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
export const Camera = memo(({ bounds, transitionDuration, zoom, mode = CameraAdjustmentMode.Graph, interactive = true, doubleClickZoom = true, }) => {
    const renderer = useContext(GraphRendererContext);
    // Override mode if bounds is passed in
    useCameraAdjustmentMode(renderer, bounds ? CameraAdjustmentMode.None : mode);
    useCameraBounds(renderer, bounds, transitionDuration);
    usePanZoomBehavior(renderer, interactive, doubleClickZoom);
    useZoomSynchronization(renderer, zoom);
    return null;
});
Camera.displayName = 'Camera';
