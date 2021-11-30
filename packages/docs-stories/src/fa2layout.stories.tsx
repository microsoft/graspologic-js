/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import * as React from 'react'
import { ForceAtlas2Graph } from './components/ForceAtlas2Graph'
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

export default {
	title: 'FA2 Layout',
	component: null,
} as ComponentMeta<typeof ForceAtlas2Graph>

export const FA2: ComponentStory<typeof ForceAtlas2Graph> = () => (
	<ForceAtlas2Graph data={testData} scale={0.01} />
)

export const FA2Random: ComponentStory<typeof ForceAtlas2Graph> = () => (
	<ForceAtlas2Graph data={noPosTestData} scale={0.03} />
)
