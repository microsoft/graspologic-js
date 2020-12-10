/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'
import { Shape } from '@graspologic/graph'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	NodeSetHighlight,
	Nodes,
	Edges,
} from '@graspologic/react'
import {
	SettingsPane,
	DisplaySettings,
	NodeSettings,
	EdgeSettings,
} from '@graspologic/render-controls-react'

const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)

storiesOf('Simple 2D Examples', module)
	.add('without extensions', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} />
				<Edges />
			</GraphView>
		</div>
	))
	.add('with heterogenous node sizes', () => (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				data={{
					nodes: [
						{
							group: '1',
							id: 'A',
							label: 'A',
							weight: 10.0,
							x: -71.6570947858611,
							y: 100.9663430468361,
						},
						{
							group: '2',
							id: 'B',
							label: 'B',
							weight: 50.0,
							x: 59.56856268696598,
							y: -96.58517255185609,
						},
						{
							group: '3',
							id: 'C',
							label: 'C',
							weight: 100.0,
							x: -73.72442078702332,
							y: -120.15483189996596,
						},
						{
							group: '4',
							id: 'D',
							label: 'D',
							weight: 1.0,
							x: -50.72442078702332,
							y: -30.15483189996596,
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
				<Nodes color={colorizer} minRadius={1.0} maxRadius={100.0} />
				<Edges minWidth={1.0} maxWidth={10.0} />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	))
	.add('with Axes extension', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} />
				<Edges />
				<Axes />
			</GraphView>
		</div>
	))
	.add('with vertex onClick handler', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes onNodeClick={action('clicked vertex')} color={colorizer} />
				<Edges />
			</GraphView>
		</div>
	))
	.add('with pan/zoom behavior', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} />
				<Edges />
				<Camera />
			</GraphView>
		</div>
	))
	.add('with hover-highlight behavior', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} />
				<Edges />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	))
	.add('with static highlight', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} />
				<Edges />
				<NodeSetHighlight vertexIds={testData.nodes.map((n: any) => n.id)} />
			</GraphView>
		</div>
	))
	.add('with static filter', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} filteredIds={['0_384', '0_428', '0_454']} />
				<Edges />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	))
	.add('with embedded controls', () => (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" data={testData}>
				<Nodes color={colorizer} filteredIds={['0_384', '0_428', '0_454']} />
				<SettingsPane>
					<DisplaySettings />
					<NodeSettings />
					<EdgeSettings />
				</SettingsPane>
			</GraphView>
		</div>
	))
	.add('with different node shapes', () => (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				data={{
					nodes: [
						{
							group: '1',
							id: 'CIRCLE',
							label: 'CIRCLE',
							shape: Shape.Circle,
							x: -100,
							y: 0,
						},
						{
							group: '2',
							id: 'SQUARE',
							label: 'SQUARE',
							shape: Shape.Square,
							x: -50,
							y: 0,
						},
						{
							group: '3',
							id: 'DIAMOND',
							label: 'DIAMOND',
							shape: Shape.Diamond,
							x: 0,
							y: 0,
						},
					],
					edges: [],
				}}
			>
				<Nodes color={colorizer} />
				<Edges />
				<Camera />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	))
