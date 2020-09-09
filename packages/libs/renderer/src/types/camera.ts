/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum CameraAdjustmentMode {
	/**
	 * Camera is automatically adjusted to fit the graph to the window
	 */
	Graph,

	/**
	 * Camera is adjusted such that the graph coordinate space is a 1 to 1 mapping of the coordinate space to pixel space
	 * i.e. A node at (1000, 1000) will show up at (1000, 1000) on the screen
	 */
	Viewport,

	/**
	 * Camera is not adjusted automatically
	 */
	None,
}
