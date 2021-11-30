/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function jiggle(factor = 1e-6) {
  return (Math.random() - 0.5) * factor;
}
/**
 * @internal
 *
 * Generates a random number between the min and max values
 * @param min The minimum value of the number
 * @param max The maximum value of the number
 * @returns The random number
 */

export function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}