/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
/**
 * The SettingsPane props
 */
export interface SettingsPaneProps {
    /**
     * The classname to attach to the settings pane
     */
    className?: string;
    /**
     * The styles to apply to the settings pane
     */
    style?: React.CSSProperties;
    /**
     * The width of the settings pane
     */
    guiWidth?: number;
}
/**
 * Attaches a settings pane to the GraphView component
 */
export declare const SettingsPane: React.FC<SettingsPaneProps>;
