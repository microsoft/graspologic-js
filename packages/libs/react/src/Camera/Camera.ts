/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as React from 'react'
import { memo, useContext } from 'react'
import { GraphRendererContext } from '../GraphView/context'
import { useBindCallbacks, CameraEvents } from './hooks/useBindCallbacks'
import { useCameraAdjustmentMode } from './hooks/useCameraAdjustmentMode'
import { useCameraBounds } from './hooks/useCameraBounds'
import { usePanZoomBehavior } from './hooks/usePanZoomBehavior'
import { useZoomSynchronization } from './hooks/useZoomSynchronization'
import { Bounds, CameraAdjustmentMode } from '@graspologic/renderer'

/**
 * The properties for the Camera component
 */
export interface CameraProps extends CameraEvents {
	/**
	 * Optional: The declarative z value of the camera. Zoomed out = -1000, Zoomed in = 0
	 * @defaultValue 0
	 */
	zoom?: number

	/**
	 * Can user's adjust the camera manually
	 * @defaultValue false
	 */
	nonInteractive?: boolean

	/**
	 * The bounds to view with the camera
	 */
	bounds?: Bounds

	/**
	 * The length of time to take to transition to the new bounds (if the bounds property is provided)
	 */
	transitionDuration?: number

	/**
	 * The adjustment mode for the camera, controls how the camera will automatically move
	 * @defaultValue [[CameraAdjustmentMode.Default]]
	 */
	mode?: CameraAdjustmentMode

	/**
	 * If true, double clicking on the graph will zoom the camera
	 *
	 * @defaultValue true
	 */
	doubleClickZoom?: boolean
}

/**
 * Adds an adjustable camera to the current GraphRenderer
 */
export const Camera: React.FC<CameraProps> = memo(
	({
		bounds,
		transitionDuration,
		zoom,
		mode = CameraAdjustmentMode.Graph,
		nonInteractive = false,
		doubleClickZoom = true,
		onMoveComplete,
	}) => {
		const renderer = useContext(GraphRendererContext)
		// Override mode if bounds is passed in
		useCameraAdjustmentMode(renderer, bounds ? CameraAdjustmentMode.None : mode)
		useCameraBounds(renderer, bounds, transitionDuration)
		usePanZoomBehavior(renderer, !nonInteractive, doubleClickZoom)
		useZoomSynchronization(renderer, zoom)
		useBindCallbacks(renderer, {
			onMoveComplete,
		})
		return null
	},
)
Camera.displayName = 'Camera'
