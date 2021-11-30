/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import * as React from 'react'
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

export default {
	title: 'OpenORD Layout',
	component: null,
} as ComponentMeta<typeof OpenOrdGraph>

export const OpenOrd: ComponentStory<typeof OpenOrdGraph> = () => (
	<OpenOrdGraph data={testData} />
)

export const OpenOrdRandom: ComponentStory<typeof OpenOrdGraph> = () => (
	<OpenOrdGraph data={noPosTestData} />
)
