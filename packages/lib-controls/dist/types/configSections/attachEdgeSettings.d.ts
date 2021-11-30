/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GUI } from 'dat.gui';
import { GraphRenderer } from '@graspologic/renderer';
export interface EdgeSettingsConfig {
    alphaRange: [number, number];
    minWidthRange: [number, number];
    maxWidthRange: [number, number];
}
/**
 * @internal
 *
 * Attaches the "Edge" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export declare function attachEdgeSettings(gui: GUI, renderer: GraphRenderer, { alphaRange, minWidthRange, maxWidthRange, }?: Partial<EdgeSettingsConfig>): () => void;
