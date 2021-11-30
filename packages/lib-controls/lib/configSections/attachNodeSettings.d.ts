/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GUI } from 'dat.gui';
import { GraphRenderer } from '@graspologic/renderer';
export interface NodeSettingsConfig {
    minRadiusRange: [number, number];
    maxRadiusRange: [number, number];
}
/**
 * @internal
 *
 * Attaches the "Node" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export declare function attachNodeSettings(gui: GUI, renderer: GraphRenderer, { minRadiusRange, maxRadiusRange, }?: Partial<NodeSettingsConfig>): () => void;
