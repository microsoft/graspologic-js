/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Id, Maybe } from "@graspologic/common"

/**
 * Provides a component based color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of [r, g, b, a] components
 */
export type NodeComponentColorizer = (
	id: Maybe<Id>,
	group: Maybe<Id>,
) => [number, number, number, number]

/**
 * Provides a color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of 0xbbggrraa
 */
export type NodeBGRAColorizer = (id: Maybe<Id>, group: Maybe<Id>) => number

/**
 * Provides a color for the given node
 * @param id The id of the node
 * @param group The group of the node
 * @returns A color in the form of [r, g, b, a] components or an int color
 */
export type NodeColorizer = (
	id: Maybe<Id>,
	group: Maybe<Id>,
) => [number, number, number, number] | number
