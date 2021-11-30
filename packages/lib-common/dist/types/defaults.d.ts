/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorVector, CameraAdjustmentMode, Bounds3D } from './types';
export declare const DEFAULT_BG_COLOR: ColorVector;
export declare const DEFAULT_DRAW_EDGES = true;
export declare const DEFAULT_HIDE_EDGES_ON_MOVE = false;
export declare const DEFAULT_DRAW_NODES = true;
export declare const DEFAULT_HIDE_NODES_ON_MOVE = false;
export declare const DEFAULT_HIDE_DESELECTED = false;
export declare const DEFAULT_IS_3D = false;
export declare const DEFAULT_INTERPOLATION_TIME = 1000;
export declare const DEFAULT_HOVER_HIGHLIGHT_COLOR: ColorVector;
export declare const DEFAULT_DRAW_AXES = true;
export declare const DEFAULT_CORNER_AXES = true;
export declare const DEFAULT_EDGE_CONSTANT_WIDTH = true;
export declare const DEFAULT_EDGE_DEPTH_WRITE = false;
export declare const DEFAULT_EDGE_ANTIALIAS = false;
export declare const DEFAULT_EDGE_ALPHA = 0.15;
export declare const DEFAULT_EDGE_MIN_WIDTH = 1;
export declare const DEFAULT_EDGE_MAX_WIDTH = 2;
export declare const DEFAULT_EDGE_FILTERED_OUT_SATURATION = 0.1;
export declare const DEFAULT_EDGE_FILTERED_IN_SATURATION = 1;
export declare const DEFAULT_NODE_MIN_RADIUS = 4;
export declare const DEFAULT_NODE_MAX_RADIUS = 8;
export declare const DEFAULT_NODE_OUTLINE = true;
export declare const DEFAULT_NODE_FILTERED_OUT_SATURATION = 0.1;
export declare const DEFAULT_NODE_FILTERED_IN_SATURATION = 1;
export declare const DEFAULT_NODE_COUNT_HINT = 10000;
export declare const DEFAULT_EDGE_COUNT_HINT = 10000;
export declare const DEFAULT_WIDTH = 500;
export declare const DEFAULT_HEIGHT = 500;
export declare const DEFAULT_BOUNDS: Bounds3D | undefined;
export declare const DEFAULT_USE_DEVICE_PIXELS: number | boolean;
export declare const DEFAULT_SCALE_VIEW_ON_INIT = true;
export declare const DEFAULT_CAMERA_MODE = CameraAdjustmentMode.Graph;
export declare const DEFAULT_AUTO_BIND = true;
