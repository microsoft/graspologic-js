/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
export interface EdgeSettingsProps {
    alphaRange?: [number, number];
    minWidthRange?: [number, number];
    maxWidthRange?: [number, number];
}
/**
 * Attaches the graph renderer edge settings to the SettingsPane
 */
export declare const EdgeSettings: React.FC<EdgeSettingsProps>;
