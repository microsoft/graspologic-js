/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphView, Camera, Nodes, Edges } from '@graspologic/react'
import {
	SettingsPane,
	DisplaySettings,
	NodeSettings,
	EdgeSettings,
} from '@graspologic/render-controls-react'
import { GraphRenderer } from '@graspologic/renderer'
import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { colorizer } from '../../colorizer'
import { InputGraphContext } from '../context'

export interface GraphPaneProps {
	graphViewRef: React.Ref<GraphRenderer>
}

export const GraphPane: React.FC<GraphPaneProps> = memo(({ graphViewRef }) => {
	const input = useContext(InputGraphContext)
	return (
		<div>
			<Container>
				<GraphViewStyled data={input} ref={graphViewRef} colorizer={colorizer}>
					<Nodes minRadius={0.25} maxRadius={5} />
					<Edges alpha={0.05} />
					<Camera />
					<SettingsPane>
						<DisplaySettings />
						<NodeSettings />
						<EdgeSettings />
					</SettingsPane>
				</GraphViewStyled>
			</Container>
		</div>
	)
})
GraphPane.displayName = 'GraphPane'

const Container = styled.div`
	width: 800px;
	height: 500px;
	border: 1px solid lightgrey;
	border-radius: 4px;
`

const GraphViewStyled = styled(GraphView)`
	width: 100%;
	height: 100%;
`
