/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation, StrokeCap } from '@chart-parts/interfaces'
import {
	Chart,
	ChartPadding,
	LogScale,
	LinearScale,
	Dimension,
	Axis,
	Rule,
} from '@chart-parts/react'
import React from 'react'

const LAYOUT_CHART_WIDTH = 600
const LAYOUT_CHART_HEIGHT = 300
const LAYOUT_CHART_PADDING: ChartPadding = {
	left: 80,
}

export interface LayoutChartProps {
	data: Record<string, any[]>
}

export const LayoutChart: React.FC<LayoutChartProps> = ({ children, data }) => (
	<Chart
		width={LAYOUT_CHART_WIDTH}
		height={LAYOUT_CHART_HEIGHT}
		padding={LAYOUT_CHART_PADDING}
		data={data}
	>
		{children}
	</Chart>
)

export interface ScaleSetProps {
	logScale?: boolean
	zero?: boolean
	min: number
	max: number
	length: number
}
export const ScaleSet: React.FC<ScaleSetProps> = ({
	logScale,
	zero,
	min,
	max,
	length,
}) => (
	<>
		<LinearScale name="x" domain={[0, length]} range={Dimension.Width} />
		{logScale ? (
			<LogScale
				name="y"
				domain={[zero ? 1 : min, max]}
				range={Dimension.Height}
			/>
		) : (
			<LinearScale
				name="y"
				domain="energy.objectiveEnergy"
				range={Dimension.Height}
				zero={zero ? true : undefined}
			/>
		)}
		<Axis orient={AxisOrientation.Bottom} scale="x" />
		<Axis orient={AxisOrientation.Left} scale="y" tickCount={5} />
	</>
)

export const PhaseMarkers: React.FC = () => (
	<Rule
		table="phases"
		x={({ d, x }) => x(d.start)}
		y={({ view }) => view.height}
		y2={0.01}
		stroke="grey"
		strokeWidth={1}
		strokeCap={StrokeCap.Butt}
		strokeDash={[2, 1]}
	/>
)
