/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react';
export interface NodeSettingsProps {
    /**
     * The range of values to allow for the min-radius settings
     */
    minRadiusRange?: [number, number];
    /**
     * The range of values to allow for the max-radius settings
     */
    maxRadiusRange?: [number, number];
}
/**
 * Attaches the graph renderer node settings to the SettingsPane
 */
export declare const NodeSettings: React.FC<NodeSettingsProps>;
