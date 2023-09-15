/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Shape } from '@graspologic/graph'
import {
	Axes,
	GraphView,
	Camera,
	HighlightHoveredNode,
	HandleNodeClicks,
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
import { action } from '@storybook/addon-actions'
import type { Meta, StoryFn } from '@storybook/react'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'

const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)

export default {
	title: 'Simple 2D Examples',
	component: GraphView,
} as Meta<typeof GraphView>

export const WithoutExtensions: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData} />
		</div>
	)
}

export const WithHeterogeneousNodeSizes: StoryFn<
	typeof GraphView
> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
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
				<Nodes minRadius={1.0} maxRadius={100.0} />
				<Edges minWidth={1.0} maxWidth={10.0} />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	)
}

export const WithAxesExtension: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Axes />
			</GraphView>
		</div>
	)
}

export const WithVertexOnClickHandler: StoryFn<
	typeof GraphView
> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<HandleNodeClicks onClick={action('clicked vertex')} />
			</GraphView>
		</div>
	)
}
WithVertexOnClickHandler.storyName = 'With Vertex onClick Handler'

export const WithPanZoomBehavior: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
			</GraphView>
		</div>
	)
}
WithPanZoomBehavior.storyName = 'With Pan/Zoom Behavior'

export const WithHoverHighlightBehavior: StoryFn<
	typeof GraphView
> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<HighlightHoveredNode />
			</GraphView>
		</div>
	)
}

export const WithStaticHighlight: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<NodeSetHighlight vertexIds={testData.nodes.map((n: any) => n.id)} />
			</GraphView>
		</div>
	)
}

export const WithStaticFilter: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Nodes filteredIds={['YBR112C', 'YGR058W', 'YOL020W', 'YOL063C']} />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	)
}

export const WithEmbeddedControls: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Nodes filteredIds={['YBR112C', 'YGR058W', 'YOL020W', 'YOL063C']} />
				<SettingsPane>
					<DisplaySettings />
					<NodeSettings />
					<EdgeSettings />
				</SettingsPane>
			</GraphView>
		</div>
	)
}

export const WithDifferentNodeShapes: StoryFn<typeof GraphView> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
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
				<Camera interactive />
				<HighlightHoveredNode />
			</GraphView>
		</div>
	)
}
