/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Line } from '@chart-parts/react'
import React, { useMemo } from 'react'
import { EnergyHistoryItem, PhaseHistoryItem } from '../../types'
import { LayoutChart, ScaleSet, PhaseMarkers } from '../ChartCommon'

export interface EnergyComponentsChartProps {
	energy: EnergyHistoryItem[]
	phases: PhaseHistoryItem[]
	logScale?: boolean
	zero?: boolean
}

export const EnergyComponentsChart: React.FC<EnergyComponentsChartProps> = ({
	energy,
	phases,
	logScale,
	zero,
}) => {
	const max = useMemo(
		() =>
			Math.max(
				...energy.map(e => e.attractiveEnergy),
				...energy.map(e => e.repulsiveEnergy),
				...energy.map(e => e.overlapEnergy),
			),
		[energy],
	)
	const min = useMemo(
		() =>
			Math.min(
				...energy.map(e => e.attractiveEnergy),
				...energy.map(e => e.repulsiveEnergy),
				...energy.map(e => e.overlapEnergy),
			),
		[energy],
	)
	return energy.length > 0 ? (
		<LayoutChart data={{ energy, phases }}>
			<ScaleSet
				logScale={logScale}
				zero={zero}
				min={min}
				max={max}
				length={energy.length}
			/>
			<PhaseMarkers />
			<Line
				table="energy"
				x={({ index, x }) => x(index)}
				y={({ d, y }) => y(d.attractiveEnergy)}
				stroke="blue"
				strokeWidth={1}
			/>
			<Line
				table="energy"
				x={({ index, x }) => x(index)}
				y={({ d, y }) => y(d.repulsiveEnergy)}
				stroke="red"
				strokeWidth={1}
			/>
			<Line
				table="energy"
				x={({ index, x }) => x(index)}
				y={({ d, y }) => y(d.overlapEnergy)}
				stroke="green"
				strokeWidth={1}
			/>
		</LayoutChart>
	) : null
}

EnergyComponentsChart.displayName = 'EnergyComponentsChart'
