/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface EnergyHistoryItem {
	energy: number
	objectiveEnergy: number
	attractiveEnergy: number
	repulsiveEnergy: number
	overlapEnergy: number
}

export interface PhaseHistoryItem {
	name: string
	start: number
}

export enum LayoutAlgorithm {
	OpenOrd = 'openord',
	ForceAtlas2 = 'fa2',
}
