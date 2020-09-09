/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MemoryReader, AttributeName } from '@graspologic/memstore'

/**
 * A utility for animating various properties of items
 */
export interface AnimationUtil {
	/**
	 * Animates a point
	 * @param item The item to animate the point for
	 * @param attribute The point attribute to animate
	 * @param point The point to animate to
	 * @param duration __default = 0__ The duration of time to transition from the old point to this new point.  If the value is 0, no transition will occur
	 */
	animatePoint(
		item: MemoryReader,
		attribute: AttributeName,
		point: [number, number, number] | [number, number],
		duration?: number,
	): void

	/**
	 * Animates a color
	 * @param item The item to animate the color for
	 * @param attribute The color attribute to animate
	 * @param point The color to animate to
	 * @param duration __default = 0__ The duration of time to transition from the old color to this new color.  If the value is 0, no transition will occur
	 */
	animateColor(
		item: MemoryReader,
		attribute: AttributeName,
		color: number,
		duration?: number,
	): void
}
