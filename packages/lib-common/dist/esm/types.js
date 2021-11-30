/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export var CameraAdjustmentMode;

(function (CameraAdjustmentMode) {
  /**
   * Camera is automatically adjusted to fit the graph to the window
   */
  CameraAdjustmentMode[CameraAdjustmentMode["Graph"] = 0] = "Graph";
  /**
   * Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
   * i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen
   */

  CameraAdjustmentMode[CameraAdjustmentMode["Viewport"] = 1] = "Viewport";
  /**
   * Camera is not adjusted automatically
   */

  CameraAdjustmentMode[CameraAdjustmentMode["None"] = 2] = "None";
})(CameraAdjustmentMode || (CameraAdjustmentMode = {}));