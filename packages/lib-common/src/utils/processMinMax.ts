/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Bounds3D } from '../types.js'

/**
 * Updates the given bounds based on the new x, y, z values
 * @param bounds The current bounds
 * @param x The new x to be added
 * @param y The new y to be added
 * @param z The new z to be added
 */
export function processMinMax(
	bounds: Bounds3D,
	x: number,
	y: number,
	z: number,
) {
	bounds.x.min = Math.min(bounds.x.min, x)
	bounds.x.max = Math.max(bounds.x.max, x)

	bounds.y.min = Math.min(bounds.y.min, y)
	bounds.y.max = Math.max(bounds.y.max, y)

	bounds.z.min = Math.min(bounds.z.min, z)
	bounds.z.max = Math.max(bounds.z.max, z)
}

/**
 * Updates the given bounds based on the new bounds
 * @param target The current bounds
 * @param newBounds The new bounds
 */
export function processMinMaxBounds(target: Bounds3D, newBounds: Bounds3D) {
	// X
	target!.x.max = Math.max(newBounds.x.min, newBounds.x.max, target!.x.max)
	target!.x.min = Math.min(newBounds.x.min, newBounds.x.max, target!.x.min)
	// X
	target!.y.max = Math.max(newBounds.y.min, newBounds.y.max, target!.y.max)
	target!.y.min = Math.min(newBounds.y.min, newBounds.y.max, target!.y.min)
	// Z
	target!.z.max = Math.max(newBounds.z.min, newBounds.z.max, target!.z.max)
	target!.z.min = Math.min(newBounds.z.min, newBounds.z.max, target!.z.min)
}
