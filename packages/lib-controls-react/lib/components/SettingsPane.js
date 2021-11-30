/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
import { memo } from 'react';
import { DatGuiContext } from '../context';
import { useDatGui } from '../hooks/useDatGui';
const defaultStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    maxHeight: '100%',
    minHeight: 20,
    overflow: 'auto',
    pointerEvents: 'none',
};
const DEFAULT_GUI_WIDTH = 250;
/**
 * Attaches a settings pane to the GraphView component
 */
export const SettingsPane = memo(function SettingsPane({ className, children, style = defaultStyle, guiWidth = DEFAULT_GUI_WIDTH, }) {
    const [gui, guiRef] = useDatGui(guiWidth);
    return (React.createElement("div", { ref: guiRef, className: className, style: style },
        React.createElement(DatGuiContext.Provider, { value: gui }, children)));
});
