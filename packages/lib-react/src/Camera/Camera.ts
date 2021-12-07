/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CameraState } from '@graspologic/camera'
import { Bounds, CameraAdjustmentMode } from '@graspologic/renderer'
import { memo, useContext } from 'react'
import { GraphRendererContext } from '../GraphView/context'
import { useCameraAdjustmentMode } from './hooks/useCameraAdjustmentMode'
import { useCameraBounds } from './hooks/useCameraBounds'
import { useCameraStateSynchronization } from './hooks/useCameraStateSynchronization'
import { usePanZoomBehavior } from './hooks/usePanZoomBehavior'
import { useZoomSynchronization } from './hooks/useZoomSynchronization'

/**
 * The properties for the Camera component
 */
export interface CameraProps {
	/**
	 * Optional: The declarative z value of the camera. Zoomed out = -1000, Zoomed in = 0
	 * @defaultValue 0
	 */
	zoom?: number

	/**
	 * Can user's adjust the camera manually
	 * @defaultValue true
	 */
	interactive?: boolean

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

	/**
	 * The camera state to inject
	 */
	state?: CameraState

	/**
	 * An optional state change handler to receive updates when the camera state changes
	 */
	onStateChange?: (state: CameraState) => void
}

/**
 * Adds an adjustable camera to the current GraphRenderer
 */
export const Camera: React.FC<CameraProps> = memo(
	({
		bounds,
		transitionDuration,
		zoom,
		state,
		mode = CameraAdjustmentMode.Graph,
		onStateChange,
		interactive = true,
		doubleClickZoom = true,
	}) => {
		const renderer = useContext(GraphRendererContext)
		// Override mode if bounds is passed in
		useCameraAdjustmentMode(renderer, bounds ? CameraAdjustmentMode.None : mode)
		useCameraBounds(renderer, bounds, transitionDuration)
		usePanZoomBehavior(renderer, interactive, doubleClickZoom)
		useZoomSynchronization(renderer, zoom)
		useCameraStateSynchronization(renderer, state, onStateChange)
		return null
	},
)
Camera.displayName = 'Camera'
