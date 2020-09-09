/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function getRandomArbitrary(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

export function getRandomInt(min: number, max: number): number {
	return Math.round(getRandomArbitrary(min, max))
}
