/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
export interface DisplaySettingsProps {
    interpolationTimeRange?: [number, number];
}
/**
 * Attaches the graph renderer display settings to the SettingsPane
 */
export declare const DisplaySettings: React.FC<DisplaySettingsProps>;
