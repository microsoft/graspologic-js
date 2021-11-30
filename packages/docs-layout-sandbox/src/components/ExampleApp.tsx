/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ChartingProvider } from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'
import React, { memo, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import { LayoutPane } from './LayoutPane'
import {
	InputGraphContext,
	OpenOrdConfigurationContext,
	FA2ConfigurationContext,
} from './context'
import { FA2Configuration } from '@graspologic/layout-fa2'
import { OpenOrdConfiguration } from '@graspologic/layout-openord'
import { testGraph } from '@graspologic/testdata'

const svgRenderer = new Renderer()

const OPEN_ORD_CONFIG: Partial<OpenOrdConfiguration> = {
	iterativeForceModel: false,
	emitDensitySnapshots: true,
	densitySnapshotSamplingRate: 4,
	emitEnergy: true,
	emitObjectiveEnergy: true,
}

const FA2_CONFIG: Partial<FA2Configuration> = {
	barnesHutOptimize: false,
	targetIterations: 500,
}

export const ExampleApp: React.FC = memo(() => {
	/*
	 * Whether to use an iterative or concurrent force model
	 */
	const [iterative, setIterative] = useState(false)
	const [graphData] = useState(testGraph())
	const oordConfig = useMemo(
		() => ({
			...OPEN_ORD_CONFIG,
			iterativeForceModel: iterative,
		}),
		[iterative],
	)
	const fa2Config = useMemo(
		() => ({
			...FA2_CONFIG,
		}),
		[],
	)
	return (
		<Container>
			<Helmet>
				<meta charSet="utf-8" />
			</Helmet>
			<GlobalStyle />
			<ChartingProvider value={svgRenderer}>
				<OpenOrdConfigurationContext.Provider value={oordConfig}>
					<FA2ConfigurationContext.Provider value={fa2Config}>
						<InputGraphContext.Provider value={graphData}>
							<LayoutPane
								iterative={iterative}
								onIterativeChanged={setIterative}
							/>
						</InputGraphContext.Provider>
					</FA2ConfigurationContext.Provider>
				</OpenOrdConfigurationContext.Provider>
			</ChartingProvider>
		</Container>
	)
})
ExampleApp.displayName = 'ExampleApp'

const Container = styled.div`
	flex: 1;
	display: flex;
	overflow: hidden;
`

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  body {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
		margin: 0;
  }
  .root {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
`
