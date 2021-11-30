/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import styled from 'styled-components'
import { EnergyHistoryItem, PhaseHistoryItem } from '../../types'
import { EnergyChart } from '../EnergyChart'
import { EnergyComponentsChart } from '../EnergyComponentsChart'
import { EnergyStats } from './EnergyStats'

export interface EnergyPaneProps {
	energy: EnergyHistoryItem[]
	phases: PhaseHistoryItem[]
	zero: boolean
	logScale: boolean
}
export const EnergyPane: React.FC<EnergyPaneProps> = ({
	energy,
	phases,
	children,
	zero,
	logScale,
}) => {
	return energy.length === 0 ? null : (
		<Container>
			<Row>
				<EnergyStats
					stats={[
						{
							title: 'Energy',
							color: 'red',
							value:
								energy?.length > 0
									? energy[energy.length - 1].energy
									: undefined,
						},
						{
							title: 'Objective Energy',
							color: 'blue',
							value:
								energy?.length > 0
									? energy[energy.length - 1].objectiveEnergy
									: undefined,
						},
					]}
				/>
				<EnergyChart
					energy={energy}
					logScale={logScale}
					phases={phases}
					zero={zero}
				/>
			</Row>
			<Row>
				<EnergyStats
					stats={[
						{
							title: 'Repulsive',
							color: 'red',
							value:
								energy?.length > 0
									? energy[energy.length - 1].repulsiveEnergy
									: undefined,
						},
						{
							title: 'Attractive',
							color: 'blue',
							value:
								energy?.length > 0
									? energy[energy.length - 1].attractiveEnergy
									: undefined,
						},
						{
							title: 'Overlap',
							color: 'green',
							value:
								energy?.length > 0
									? energy[energy.length - 1].overlapEnergy
									: undefined,
						},
					]}
				/>
				<EnergyComponentsChart
					energy={energy}
					logScale={logScale}
					phases={phases}
					zero={zero}
				/>
			</Row>
			{children}
		</Container>
	)
}
EnergyPane.displayName = 'EnergyPane'

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
`
