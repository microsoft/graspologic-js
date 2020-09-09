/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type OnTickHandler<T> = (arg: T) => void

/**
 * @internal
 *
 * Shape of a clock that can be ticked
 */
export interface TickingClock {
	/**
	 * Ticks the clock
	 * @returns True if the clock was ticked
	 */
	tick(): boolean
}
