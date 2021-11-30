/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer, NodeBGRAColorizer, NodeColorizer } from '../types';
export declare function correctColor(color: number): number;
export declare function createBGRAColorizer(colorizerFn?: NodeColorizer): NodeBGRAColorizer;
/**
 * Applies a colorizer function to the graph renderer
 * @param renderer The renderer to colorize
 * @param colorizerFn The function to use to color the renderer
 */
export declare function colorizeRenderer(renderer: GraphRenderer, colorizerFn?: NodeColorizer): void;
/**
 * Converts color components to a BGRA int color
 * @param components The color components [r, g, b, a]
 */
export declare function componentColorToBGRA(components: [number, number, number, number]): number;
