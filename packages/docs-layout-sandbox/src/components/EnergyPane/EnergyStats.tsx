/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import styled from 'styled-components'

export interface EnergyStatsProps {
	stats: EnergyStatItem[]
}
export interface EnergyStatItem {
	title: string
	color: string
	value: number | undefined
}

const arg = { minimumFractionDigits: 2 }

export const EnergyStats: React.FC<EnergyStatsProps> = memo(({ stats }) => {
	return (
		<Container>
			{stats.map((stat, index) => (
				<Section key={index}>
					<Title color={stat.color}>{stat.title}</Title>
					<Value>
						{stat.value ? stat.value.toLocaleString(undefined, arg) : null}
					</Value>
				</Section>
			))}
		</Container>
	)
})
EnergyStats.displayName = 'EnergyStats'

const Title = styled.div`
	border-bottom: 1px solid ${props => props.color};
	font-size: 10pt;
	font-family: sans-serif;
	font-weight: 400;
`

const Value = styled.div`
	font-size: 10pt;
	font-family: sans-serif;
	font-weight: 100;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const Section = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px;
`
