/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Disconnect } from '@graspologic/common'
import { Quaternion } from 'math.gl'
// @ts-ignore
import { EventManager } from 'mjolnir.js'
import { GraphRenderer } from '../types'

const AUTO_END_TIMER_LENGTH = 100

export interface EnablePanZoomEventOptions {
	/**
	 * Enable the zoom to graph operation
	 *
	 * @defaultValue true
	 */
	zoomToGraph: boolean
}

const DEFAULT_OPTIONS: EnablePanZoomEventOptions = {
	zoomToGraph: true,
}

/**
 * Enables pan & zoom events on the given graph renderer
 * @param renderer The graph renderer
 * @returns A disconnect function
 */
export function enablePanZoomEvents(
	renderer: GraphRenderer,
	options: Partial<EnablePanZoomEventOptions> = DEFAULT_OPTIONS,
): Disconnect {
	const view = renderer.view

	let isMouseDown = false
	let lastMouseX = 0
	let lastMouseY = 0

	function getUIMuliplier() {
		// This logic isn't quite correct
		// Since the multiplier is based on the `z` position of the
		// camera, then as you zoom in, the amount of zoom will decrease as `z` approaches 0
		const rect = view.getBoundingClientRect()
		const position = renderer.camera.position
		return (
			Math.abs(position.z) / (rect.width * renderer.camera.projection[0] * 0.5)
		)
	}

	let timeout: any
	function beginUser() {
		if (timeout) {
			clearTimeout(timeout)
			timeout = undefined
		}
		// auto end if no input receieved
		timeout = setTimeout(endUser, AUTO_END_TIMER_LENGTH)
		if (!renderer.destroyed) {
			renderer.camera.beginUser()
		}
	}

	function endUser() {
		if (!renderer.destroyed) {
			renderer.camera.endUser()
		}
	}

	const eventManager = new EventManager(view)
	eventManager.on({
		panstart: (event: any) => {
			isMouseDown = true
			lastMouseX = event.x
			lastMouseY = event.y
			renderer.makeDirty()
			beginUser()
		},
		panmove: (event: any) => {
			if (!isMouseDown) {
				return
			}
			beginUser()

			if (lastMouseX != null) {
				// If shift key is used in 3d mode, execute a pan operation
				if (!renderer.config.is3D || event.srcEvent.shiftKey) {
					const position = renderer.camera.position
					const unitsX = event.center.x - lastMouseX
					const unitsY = event.center.y - lastMouseY
					const mult = getUIMuliplier()
					position.add([unitsX * mult, -unitsY * mult, 0.0])
					renderer.camera.moveTo(position.x, position.y, position.z)
				} else {
					const radiansX = (event.center.x - lastMouseX) / 300
					const radiansY = (event.center.y - lastMouseY) / 300
					const newRotation = new Quaternion()
						.rotateX(radiansY)
						.rotateY(radiansX)

					renderer.camera.rotation = newRotation.multiply(
						renderer.camera.rotation,
						undefined,
					)
				}
				renderer.makeDirty()
			}
			lastMouseX = event.center.x
			lastMouseY = event.center.y
		},
		panend: () => {
			isMouseDown = false
		},
		dblclick: () => {
			if (options.zoomToGraph) {
				beginUser()
				renderer.zoomToGraph()
			}
		},
		wheel: (event: any) => {
			// Sometimes is NaN on Firefox
			if (!Number.isNaN(event.delta)) {
				beginUser()

				const mult = getUIMuliplier()
				const position = renderer.camera.position
				position.add([0.0, 0.0, mult * event.delta])
				renderer.camera.moveTo(position.x, position.y, position.z)
				renderer.makeDirty()

				// No need for endUser, it will automatically end
			}
			event.preventDefault()
		},
	})

	return () => {
		endUser()
		eventManager.destroy()
	}
}
