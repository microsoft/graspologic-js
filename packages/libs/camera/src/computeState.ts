/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4, Quaternion, Vector3 } from 'math.gl'
import { Bounds } from '@graspologic/common'
import { CameraState } from './CameraState'

/**
 * @internal
 *
 * Computes a camera state (position & rotation) that will ensure the given bounds is in view
 * @param bounds The bounds to view
 * @param projection The current projection matrix
 */
export function computeState(bounds: Bounds, projection: Matrix4) {
	const transformed: Matrix4 = (projection.clone().invert() as any).transform([
		1,
		1,
	])
	const scaleX = 1 / (2 * transformed[0])
	const scaleY = 1 / (2 * transformed[1])
	const width = bounds.x.max - bounds.x.min
	const height = bounds.y.max - bounds.y.min
	let minDist = Math.max(width * scaleX, height * scaleY)

	const midX = bounds.x.min + width / 2
	const midY = bounds.y.min + height / 2
	const hasZ = !!bounds.z

	minDist += hasZ ? bounds.z!.min + (bounds.z!.max - bounds.z!.min)! : 0

	const newState = new CameraState(
		new Vector3(-midX, -midY, -minDist),
		new Quaternion(),
	)
	return newState
}
