/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface NumberRange {
	/**
	 * The minimum value of the range
	 */
	min: number

	/**
	 * The maximum value of the range
	 */
	max: number
}

export interface Bounds2D {
	/**
	 * Represents the bounds in the x direction
	 */
	x: NumberRange

	/**
	 * Represents the bounds in the y direction
	 */
	y: NumberRange
}

export interface Bounds3D extends Bounds2D {
	/**
	 * Represents the bounds in the z direction
	 */
	z: NumberRange
}

/**
 * A generic set of bounds
 */
export type Bounds = Bounds2D & Partial<Bounds3D>