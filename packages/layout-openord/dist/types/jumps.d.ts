/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position } from '@graspologic/graph';
/**
 * @internal
 *
 * Moves __pos1__ closer to __pos2__ by a __damping__ factor
 * @param pos1 The start position
 * @param pos2 The end position
 * @param damping The damping factor
 */
export declare function jumpTowards(pos1: Position, pos2: Position, damping: number): Position;
/**
 * @internal
 *
 * Moves __source__ a random __distance__ away from it's current position
 * @param source The source position
 * @param distance The distance of the jump
 */
export declare function jumpRandom(source: Position, distance: number): Position;
