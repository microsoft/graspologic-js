import { memo, useContext, useEffect } from 'react';
import { DatGuiContext } from '../context';
import { GraphRendererContext } from '@graspologic/react';
import { attachEdgeSettings } from '@graspologic/render-controls';
/**
 * Attaches the graph renderer edge settings to the SettingsPane
 */
export const EdgeSettings = memo(function EdgeSettings({ alphaRange, minWidthRange, maxWidthRange }) {
    const gui = useContext(DatGuiContext);
    const renderer = useContext(GraphRendererContext);
    useEffect(() => {
        if (gui && renderer) {
            return attachEdgeSettings(gui, renderer, {
                alphaRange,
                minWidthRange,
                maxWidthRange,
            });
        }
    }, [gui, renderer, alphaRange, minWidthRange, maxWidthRange]);
    return null;
});
