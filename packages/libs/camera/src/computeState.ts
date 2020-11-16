/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Matrix4, Vector3 } from 'math.gl'
import { Bounds } from '@graspologic/common'

/**
 * Computes the position in world space where the camera should be placed to fit the given bounds into view
 * @param bounds The bounds in world space to view
 * @param fov The field of view of the camera
 * @param aspect The aspect ratio of the view
 */
export function fitBoundsIntoView(
	bounds: Bounds,
	fov: number,
	aspect: number,
): Vector3 {
	const transformed = new Matrix4()
		.perspective({
			fov,
			aspect,
		})
		.invert()
		.transform([1, 1], undefined as any)
	const scaleX = 1 / (2 * transformed[0])
	const scaleY = 1 / (2 * transformed[1])
	const width = bounds.x.max - bounds.x.min
	const height = bounds.y.max - bounds.y.min
	let minDist = Math.max(width * scaleX, height * scaleY)

	const midX = bounds.x.min + width / 2
	const midY = bounds.y.min + height / 2
	const hasZ = !!bounds.z

	minDist += hasZ ? bounds.z!.min + (bounds.z!.max - bounds.z!.min)! : 0
	return new Vector3(-midX, -midY, -minDist)
}
