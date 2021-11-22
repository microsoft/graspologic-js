/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { ForceAtlas2Graph } from './components/ForceAtlas2Graph'
import { OpenOrdGraph } from './components/OpenOrdGraph'
import processGraphJson from './data/processGraphJson'
const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)
const noPosTestData = {
	edges: testData.edges,
	nodes: testData.nodes.map((n: any) => ({
		...n,
		x: undefined,
		y: undefined,
	})),
}
storiesOf('Layout Execution', module)
	.add('ForceAtlas2', () => <ForceAtlas2Graph data={testData} scale={0.01} />)
	.add('OpenOrd', () => <OpenOrdGraph data={testData} />)
	.add('FA2 Random', () => (
		<ForceAtlas2Graph data={noPosTestData} scale={0.03} />
	))
	.add('OpenOrd Random', () => <OpenOrdGraph data={noPosTestData} />)
