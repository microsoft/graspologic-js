import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachDisplaySettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer display settings to the SettingsPane
 */
export const DisplaySettings = memo(function DisplaySettings({ interpolationTimeRange }) {
    const gui = useContext(DatGuiContext);
    const renderer = useContext(GraphRendererContext);
    useEffect(() => {
        if (gui && renderer) {
            return attachDisplaySettings(gui, renderer, { interpolationTimeRange });
        }
    }, [gui, renderer, interpolationTimeRange]);
    return null;
});
