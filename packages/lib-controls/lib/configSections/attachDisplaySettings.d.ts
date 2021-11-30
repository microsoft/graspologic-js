/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GUI } from 'dat.gui';
import { GraphRenderer } from '@graspologic/renderer';
export interface DisplaySettingsConfig {
    interpolationTimeRange: [number, number];
}
/**
 * @internal
 *
 * Attaches the "Display" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export declare function attachDisplaySettings(gui: GUI, renderer: GraphRenderer, { interpolationTimeRange, }?: Partial<DisplaySettingsConfig>): () => void;
