/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { type ColorVector, CameraAdjustmentMode, type Bounds3D } from './types.js'

// Default color is transparent
export const DEFAULT_BG_COLOR: ColorVector = [0, 0, 0, 0]
export const DEFAULT_DRAW_EDGES = true
export const DEFAULT_HIDE_EDGES_ON_MOVE = false
export const DEFAULT_DRAW_NODES = true
export const DEFAULT_HIDE_NODES_ON_MOVE = false
export const DEFAULT_HIDE_DESELECTED = false
export const DEFAULT_IS_3D = false
export const DEFAULT_INTERPOLATION_TIME = 1000
export const DEFAULT_HOVER_HIGHLIGHT_COLOR: ColorVector = [
	160 / 255,
	240 / 255,
	255 / 255,
	207 / 255,
]
export const DEFAULT_DRAW_AXES = true
export const DEFAULT_CORNER_AXES = true
export const DEFAULT_EDGE_CONSTANT_WIDTH = true
export const DEFAULT_EDGE_DEPTH_WRITE = false
export const DEFAULT_EDGE_ANTIALIAS = false
export const DEFAULT_EDGE_ALPHA = 0.15
export const DEFAULT_EDGE_MIN_WIDTH = 1.0
export const DEFAULT_EDGE_MAX_WIDTH = 2.0
export const DEFAULT_EDGE_FILTERED_OUT_SATURATION = 0.1
export const DEFAULT_EDGE_FILTERED_IN_SATURATION = 1.0
export const DEFAULT_NODE_MIN_RADIUS = 4.0
export const DEFAULT_NODE_MAX_RADIUS = 8.0
export const DEFAULT_NODE_OUTLINE = true
export const DEFAULT_NODE_FILTERED_OUT_SATURATION = 0.1
export const DEFAULT_NODE_FILTERED_IN_SATURATION = 1.0
export const DEFAULT_NODE_COUNT_HINT = 10000
export const DEFAULT_EDGE_COUNT_HINT = 10000
export const DEFAULT_WIDTH = 500
export const DEFAULT_HEIGHT = 500
export const DEFAULT_BOUNDS: Bounds3D | undefined = undefined
export const DEFAULT_USE_DEVICE_PIXELS = true as boolean | number
export const DEFAULT_SCALE_VIEW_ON_INIT = true
export const DEFAULT_CAMERA_MODE = CameraAdjustmentMode.Graph
export const DEFAULT_AUTO_BIND = true
