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
	CameraState,
} from '@graspologic/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Vector3, Quaternion } from 'math.gl'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'

const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)
testData.nodes.forEach((n: any) => (n.z = Math.random() * 100 - 50))

export default {
	title: 'Simple 3D Examples',
	component: null,
} as ComponentMeta<null>

export const Simple3DView: ComponentStory<null> = () => {
	return (
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
	)
}
Simple3DView.storyName = 'Simple 3D View'

export const Toggle2DAnd3D: ComponentStory<null> = ({ is3D }) => {
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
}
Toggle2DAnd3D.storyName = 'Toggle 2D and 3D'
Toggle2DAnd3D.args = {
	is3D: true,
}

export const WithHeterogeneousNodeSizes: ComponentStory<null> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				is3D={true}
				data={{
					nodes: [
						{
							group: '1',
							id: 'A',
							label: 'A',
							weight: 10.0,
							x: -71.6570947858611,
							y: 100.9663430468361,
							z: 50,
						},
						{
							group: '2',
							id: 'B',
							label: 'B',
							weight: 50.0,
							x: 59.56856268696598,
							y: -96.58517255185609,
							z: -25,
						},
						{
							group: '3',
							id: 'C',
							label: 'C',
							weight: 100.0,
							x: -73.72442078702332,
							y: -120.15483189996596,
							z: 30,
						},
						{
							group: '4',
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
	)
}

/* eslint-disable @typescript-eslint/no-loss-of-precision */
export const WithControlledCameraState: ComponentStory<null> = () => {
	function handleStateChange(state: CameraState) {
		console.log('state change', state)
	}
	// this camera state was captured during an interactive session
	const cameraState = new CameraState(
		new Vector3(20.782791137695312, -13.470687866210938, -761.5890435522898),
		new Quaternion(
			-0.3178074916936009,
			-0.6497423406634564,
			0.030100329580571322,
			0.6898748141016212,
		),
	)
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				data={testData}
				is3D={true}
				interpolationTime={0}
			>
				<Camera
					interactive
					onStateChange={handleStateChange}
					state={cameraState}
				/>
			</GraphView>
		</div>
	)
}
/* eslint-enable @typescript-eslint/no-loss-of-precision */
