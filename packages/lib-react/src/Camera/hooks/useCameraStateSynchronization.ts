/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CameraState } from '@graspologic/camera'
import { GraphRenderer } from '@graspologic/renderer'
import { useEffect } from 'react'

export function useCameraStateSynchronization(
	renderer: GraphRenderer | undefined,
	state: CameraState | undefined,
	onCameraStateChange: ((state: CameraState) => void) | undefined,
) {
	useEffect(
		function injectCameraState() {
			if (renderer && state) {
				renderer.onInitialize(() => renderer.camera.transitionToState(state, 0))
				renderer.camera.transitionToState(state, 0)
			}
		},
		[renderer, state],
	)

	useEffect(
		function setChangeHandler() {
			if (renderer && onCameraStateChange) {
				return renderer.camera.on('movingComplete', () => {
					onCameraStateChange(renderer.camera.state)
				})
			}
		},
		[renderer, onCameraStateChange],
	)
}
