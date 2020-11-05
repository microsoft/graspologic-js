/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum VisualDimensions {
	TwoD = '2D',
	ThreeD = '3D',
}

/**
 * A WebGL RGBA color vector. Each slot contains a float value from 0-1.
 */
export type ColorVector = [number, number, number, number]

/**
 * A mapping between a key and a position object
 */
export interface PositionMap {
	[key: string]: { x: number; y: number; z?: number }
}

/**
 * Provides a component based color for the given node
 * @param group The group of the node
 * @param id The id of the node
 * @returns A color in the form of [r, g, b, a] components
 */
export type NodeComponentColorizer = (
	group: string | number | undefined,
	id: string | number | undefined,
) => [number, number, number, number]

/**
 * Provides a color for the given node
 * @param group The group of the node
 * @param id The id of the node
 * @returns A color in the form of 0xbbggrraa
 */
export type NodeBGRAColorizer = (
	group: string | number | undefined,
	id: string | number | undefined,
) => number

/**
 * Provides a color for the given node
 * @param group The group of the node
 * @param id The id of the node
 * @returns A color in the form of [r, g, b, a] components or an int color
 */
export type NodeColorizer = (
	group: string | number | undefined,
	id: string | number | undefined,
) => [number, number, number, number] | number