/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	PrimaryButton,
	Button,
	ProgressIndicator,
	Toggle,
	ComboBox,
} from 'office-ui-fabric-react'
import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { LayoutAlgorithm } from '../../types'

export interface LayoutControlsProps {
	className?: string
	style?: React.CSSProperties
	onStart: () => void
	onStop: () => void
	onResume: () => void
	algorithm: LayoutAlgorithm
	onChangeAlgorithm: (input: LayoutAlgorithm) => void
	status: string
	phaseStatus: string
	percentComplete: number
	phasePercentComplete: number
	logScale: boolean
	zero: boolean
	iterative: boolean
	onLogScaleChanged: (value: boolean) => void
	onZeroChanged: (value: boolean) => void
	onIterativeChanged: (value: boolean) => void
	onSave: () => void
}

const LAYOUT_OPTIONS = [
	{ key: 'openord', text: 'OpenOrd' },
	{ key: 'fa2', text: 'ForceAtlas2' },
]

export const LayoutControls: React.FC<LayoutControlsProps> = memo(
	({
		className,
		style,
		onStart,
		onStop,
		onResume,
		algorithm,
		onChangeAlgorithm,
		status,
		phaseStatus,
		percentComplete,
		phasePercentComplete,
		logScale,
		zero,
		iterative,
		onLogScaleChanged,
		onZeroChanged,
		onIterativeChanged,
		onSave,
	}) => (
		<Container style={style} className={className}>
			<LeftHalf>
				<ComboBox
					autoComplete="on"
					options={LAYOUT_OPTIONS}
					selectedKey={algorithm}
					onChange={useCallback(
						(_e, value) => onChangeAlgorithm(value.key as LayoutAlgorithm),
						[onChangeAlgorithm],
					)}
				/>
				<ButtonArea>
					<PrimaryButton onClick={onStart}>Start</PrimaryButton>
					<Button onClick={onStop}>Stop</Button>
					<Button onClick={onResume}>Resume</Button>
					<Button onClick={onSave}>Save</Button>
				</ButtonArea>
			</LeftHalf>
			<ProgressArea>
				{percentComplete > 0 ? (
					<>
						<ProgressIndicator
							label={status}
							percentComplete={percentComplete}
						/>
						<ProgressIndicator
							label={phaseStatus}
							percentComplete={phasePercentComplete}
						/>
					</>
				) : null}
			</ProgressArea>
			<ToggleSet>
				<StyledToggle
					label="Iter. Forces"
					checked={iterative}
					onChanged={onIterativeChanged}
				/>
				<StyledToggle
					label="LogScale"
					checked={logScale}
					onChanged={onLogScaleChanged}
				/>
				<StyledToggle label="Zero" checked={zero} onChanged={onZeroChanged} />
			</ToggleSet>
		</Container>
	),
)
LayoutControls.displayName = 'LayoutControls'

const StyledToggle = styled(Toggle)`
	margin-right: 30px;
	min-width: 30px;
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 85px;
	background-color: #eee;
	padding: 10px;
`

const ToggleSet = styled.div`
	display: flex;
	flex-direction: row;
`

const LeftHalf = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 15px;
`

const ButtonArea = styled.div`
	display: flex;
	align-items: center;
`

const ProgressArea = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`
