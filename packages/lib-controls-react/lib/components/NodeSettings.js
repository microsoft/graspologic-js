import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachNodeSettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer node settings to the SettingsPane
 */
export const NodeSettings = memo(function NodeSettings({ minRadiusRange, maxRadiusRange }) {
    const gui = useContext(DatGuiContext);
    const renderer = useContext(GraphRendererContext);
    useEffect(() => {
        if (gui && renderer) {
            return attachNodeSettings(gui, renderer, {
                minRadiusRange,
                maxRadiusRange,
            });
        }
    }, [gui, renderer, minRadiusRange, maxRadiusRange]);
    return null;
});
