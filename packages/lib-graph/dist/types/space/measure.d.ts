/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position } from './types';
/**
 * @internal
 *
 * Computes the square distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The square distance
 */
export declare function squareDistanceTo(pos1: Position, pos2: Position): number;
/**
 * @internal
 *
 * Computes the euclidean distance between the two points
 * @param pos1 The first position
 * @param pos2 The second position
 * @returns The distance
 */
export declare function distanceTo(pos1: Position, pos2: Position): number;
/**
 * @internal
 * Computes the the weighted center of the given positions, using the given weights
 * @param points The list of points
 * @param weights The list of weights
 * @returns The weighted centroid
 */
export declare function weightedCentroid(points: Position[], weights: number[]): Position;
