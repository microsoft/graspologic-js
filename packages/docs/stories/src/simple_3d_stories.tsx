/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	GraphView,
	Camera,
	HighlightHoveredNode,
	Nodes,
	Edges,
} from '@graspologic/react'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'

const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)
testData.nodes.forEach((n: any) => (n.z = Math.random() * 100 - 50))

storiesOf('Simple 3D Examples', module)
	.add('simple 3d view', () => (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				data={testData}
				is3D={true}
			>
				<Camera interactive />
			</GraphView>
		</div>
	))
	.add('2D/3D Toggle', () => {
		const is3D = boolean('Is 3D', true)
		return (
			<div className="graph-pane-container">
				<GraphView
					className="graph-pane"
					colorizer={colorizer}
					data={testData}
					is3D={is3D}
				>
					<Camera interactive />
				</GraphView>
			</div>
		)
	})
	.add('with heterogenous node sizes', () => (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				is3D={true}
				data={{
					nodes: [
						{
							category: 1,
							id: 'A',
							label: 'A',
							weight: 10.0,
							x: -71.6570947858611,
							y: 100.9663430468361,
							z: 50,
						},
						{
							category: 2,
							id: 'B',
							label: 'B',
							weight: 50.0,
							x: 59.56856268696598,
							y: -96.58517255185609,
							z: -25,
						},
						{
							category: 3,
							id: 'C',
							label: 'C',
							weight: 100.0,
							x: -73.72442078702332,
							y: -120.15483189996596,
							z: 30,
						},
						{
							category: 4,
							id: 'D',
							label: 'D',
							weight: 1.0,
							x: -50.72442078702332,
							y: -30.15483189996596,
							z: 10,
						},
					],
					edges: [
						{
							source: 'B',
							target: 'A',
							weight: 0.5,
						},
						{
							source: 'B',
							target: 'C',
							weight: 0.25,
						},
						{
							source: 'B',
							target: 'D',
							weight: 1.0,
						},
					],
				}}
			>
				<Nodes minRadius={1.0} maxRadius={100.0} />
				<Edges minWidth={1.0} maxWidth={10.0} />
				<HighlightHoveredNode />
				<Camera interactive />
			</GraphView>
		</div>
	))
