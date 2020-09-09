/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer } from '@graspologic/renderer'
import React, { memo, useRef, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { LayoutAlgorithm } from '../../types'
import { EnergyPane } from '../EnergyPane'
import { GraphPane } from '../GraphPane'
import { LayoutControls } from '../LayoutControls'
import { ScalarFieldPane } from '../ScalarFieldPane'
import { useDensityGridSnapshot } from './hooks/useDensityGridSnapshot'
import { useLayoutManager } from './hooks/useLayoutManager'
import { useLayoutPositionChanges } from './hooks/useLayoutPositionChanges'
import { useLayoutProgress } from './hooks/useLayoutProgress'

export interface LayoutPaneProps {
	iterative: boolean
	onIterativeChanged: (input: boolean) => void
}

export const LayoutPane: React.FC<LayoutPaneProps> = memo(
	({ iterative, onIterativeChanged }) => {
		const graphViewRef = useRef<GraphRenderer>(null)
		const [algorithm, setAlgorithm] = useState<LayoutAlgorithm>(
			LayoutAlgorithm.OpenOrd,
		)
		const manager = useLayoutManager(algorithm)
		const [run, setRun] = useState(1)
		const [
			percentComplete,
			phasePercentComplete,
			progressLabel,
			phaseProgressLabel,
			energyHistory,
			phaseHistory,
		] = useLayoutProgress(manager, run)
		const [
			handleOnStart,
			handleOnStop,
			handleOnResume,
			isRunning,
		] = useLayoutPositionChanges(graphViewRef, manager)
		const densityGridSnapshot = useDensityGridSnapshot(manager)
		const [zero, setZero] = useState(false)
		const [logScale, setLogScale] = useState(true)
		const onSave = useCallback(() => console.log('save off ', energyHistory), [
			energyHistory,
		])
		const onStart = useCallback(() => {
			setRun(run + 1)
			handleOnStart()
		}, [run, handleOnStart, setRun])

		return (
			<Container>
				<LayoutControls
					algorithm={algorithm}
					onChangeAlgorithm={setAlgorithm}
					onStart={onStart}
					onStop={handleOnStop}
					onResume={handleOnResume}
					percentComplete={percentComplete}
					phasePercentComplete={phasePercentComplete}
					status={useMemo(() => (isRunning ? progressLabel : 'Idle'), [
						isRunning,
						progressLabel,
					])}
					phaseStatus={useMemo(() => (isRunning ? phaseProgressLabel : ''), [
						isRunning,
						phaseProgressLabel,
					])}
					zero={zero}
					onZeroChanged={setZero}
					logScale={logScale}
					onLogScaleChanged={setLogScale}
					iterative={iterative}
					onIterativeChanged={onIterativeChanged}
					onSave={onSave}
				/>
				<Content>
					<ViewArea>
						<GraphPane graphViewRef={graphViewRef} />
						<ScalarFieldSet>
							<ScalarFieldPaneStyled data={densityGridSnapshot || []} />
						</ScalarFieldSet>
					</ViewArea>
					<EnergyPane
						energy={energyHistory}
						phases={phaseHistory}
						zero={zero}
						logScale={logScale}
					></EnergyPane>
				</Content>
			</Container>
		)
	},
)
LayoutPane.displayName = 'LayoutPane'

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
`
const ViewArea = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const ScalarFieldSet = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
`

const ScalarFieldPaneStyled = styled(ScalarFieldPane)`
	margin-left: 10px;
`
