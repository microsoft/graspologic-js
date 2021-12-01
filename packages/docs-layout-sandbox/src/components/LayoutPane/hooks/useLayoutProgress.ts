/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { LayoutWorkerManager } from '@graspologic/layout-core'
import {
	AnnealingPhase,
	getAnnealingPhaseString,
} from '@graspologic/layout-openord'
import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { EnergyHistoryItem, PhaseHistoryItem } from '../../../types'

export function useLayoutProgress(
	manager: LayoutWorkerManager<any, any>,
	run: number,
): [
	// % complete
	number,
	// phase % complete
	number,
	// progress
	string,
	// phase progress
	string,
	// energy histogram
	EnergyHistoryItem[],
	// phase history
	PhaseHistoryItem[],
] {
	const [percentComplete, setPercentComplete] = useState(0)
	const [phasePercentComplete, setPhasePercentComplete] = useState(0)
	const [progressLabel, setProgressLabel] = useState('')
	const [phaseProgressLabel, setPhaseProgressLabel] = useState('')
	const [energyHistory, setEnergyHistory] = useState<EnergyHistoryItem[]>([])
	const [currentPhase, setCurrentPhase] = useState<AnnealingPhase>(
		AnnealingPhase.Initial,
	)
	const [phaseHistory, setPhaseHistory] = useState<PhaseHistoryItem[]>([])

	// clear data history on new layout runs
	useEffect(() => {
		console.log('clear history')
		setEnergyHistory([])
		setPhaseHistory([])
	}, [run])

	/**
	 * Progress Handler
	 */
	useEffect(() => {
		const subscription = manager.on('progress', data => {
			const {
				clock: {
					phase = 'N/A',
					iteration = 0,
					targetIterations = 1,
					phaseIteration = 0,
					targetPhaseIterations = 1,
				},
				metrics: {
					energy,
					objectiveEnergy,
					attractiveEnergy,
					repulsiveEnergy,
					overlapEnergy,
				},
			} = data
			if (phase != null && currentPhase !== phase) {
				setCurrentPhase(phase)
				phaseHistory.push({
					name: getAnnealingPhaseString(phase),
					start: iteration,
				})
			}

			const pct = iteration / targetIterations
			const phasePct = phaseIteration / targetPhaseIterations
			setPhaseProgressLabel(
				`${capitalize(
					getAnnealingPhaseString(phase),
				)} Phase (${phaseIteration}/${targetPhaseIterations})`,
			)
			setProgressLabel(`Executing (${iteration}/${targetIterations})`)
			setPercentComplete(pct)
			setPhasePercentComplete(phasePct)
			energyHistory.push({
				energy: energy || 0,
				objectiveEnergy: objectiveEnergy || 0,
				attractiveEnergy: attractiveEnergy || 0,
				repulsiveEnergy: repulsiveEnergy || 0,
				overlapEnergy: overlapEnergy || 0,
			})
		})
		return () => subscription()
	}, [manager, energyHistory, currentPhase, phaseHistory])

	return [
		percentComplete,
		phasePercentComplete,
		progressLabel,
		phaseProgressLabel,
		energyHistory,
		phaseHistory,
	]
}
