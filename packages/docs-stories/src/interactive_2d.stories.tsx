/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { InputGraph, InputNode, Node } from '@graspologic/graph'
import {
	Axes,
	GraphView,
	LabelHoveredNode,
	HighlightHoveredNode,
	HandleNodeClicks,
	NodeSetHighlight,
	NodeSetLabel,
	Nodes,
	Edges,
	Camera,
} from '@graspologic/react'
import {
	PositionMap,
	DEFAULT_NODE_FILTERED_OUT_SATURATION,
	DEFAULT_NODE_FILTERED_IN_SATURATION,
	DEFAULT_NODE_MIN_RADIUS,
	DEFAULT_NODE_MAX_RADIUS,
	DEFAULT_NODE_OUTLINE,
	DEFAULT_HIDE_EDGES_ON_MOVE,
	DEFAULT_EDGE_CONSTANT_WIDTH,
	DEFAULT_DRAW_EDGES,
	DEFAULT_EDGE_DEPTH_WRITE,
	DEFAULT_EDGE_ANTIALIAS,
	DEFAULT_EDGE_MIN_WIDTH,
	DEFAULT_EDGE_MAX_WIDTH,
	DEFAULT_EDGE_FILTERED_OUT_SATURATION,
	DEFAULT_EDGE_FILTERED_IN_SATURATION,
	DEFAULT_DRAW_AXES,
	DEFAULT_CORNER_AXES,
	DEFAULT_HOVER_HIGHLIGHT_COLOR,
	DEFAULT_HIDE_NODES_ON_MOVE,
	DEFAULT_DRAW_NODES,
	DEFAULT_BG_COLOR,
	GraphRenderer,
	ColorVector,
} from '@graspologic/renderer'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useCallback, useRef, useState } from 'react'
import { FullyInteractiveGraph } from './components/FullyInteractiveGraph'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'
import { getRandomArbitrary } from './utils'

const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)

const HIGHLIGHT_IDS = ['3_344', '0_249', '5_534', '5_552']

export default {
	title: 'Interactive 2D Stories',
} as ComponentMeta<null>

export const CanChangeRenderProperties: ComponentStory<null> = ({
	r,
	g,
	b,
	a,
	nodeMinRadius,
	nodeMaxRadius,
	nodeOutline,
	hideNodesOnMove,
	drawNodes,
	nodeMinSaturation,
	nodeMaxSaturation,
	filterVertices,
	hideEdgesOnMove,
	drawEdges,
	edgeConstantWidth,
	depthWrite,
	edgeAntialias,
	edgeMinWidth,
	edgeMaxWidth,
	edgeAlpha,
	edgeMinSaturation,
	edgeMaxSaturation,
	drawAxes,
	axesInCorner,
}) => {
	const vertset: string[] | undefined = filterVertices
		? HIGHLIGHT_IDS
		: undefined

	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				data={testData}
				backgroundColor={[r, g, b, a]}
			>
				<Camera interactive />
				<HighlightHoveredNode />
				<HandleNodeClicks onClick={action('click')} />
				<Nodes
					minRadius={nodeMinRadius}
					maxRadius={nodeMaxRadius}
					outline={nodeOutline}
					hideOnMove={hideNodesOnMove}
					shown={drawNodes}
					filteredIds={vertset}
					filteredOutSaturation={nodeMinSaturation}
					filteredInSaturation={nodeMaxSaturation}
				/>
				<Edges
					hideOnMove={hideEdgesOnMove}
					shown={drawEdges}
					constantWidth={edgeConstantWidth}
					depthWrite={depthWrite}
					antialias={edgeAntialias}
					minWidth={edgeMinWidth}
					maxWidth={edgeMaxWidth}
					alpha={edgeAlpha}
					filteredOutSaturation={edgeMinSaturation}
					filteredInSaturation={edgeMaxSaturation}
				/>
				<Axes shown={drawAxes} inCorner={axesInCorner} />
			</GraphView>
		</div>
	)
}
CanChangeRenderProperties.args = {
	r: DEFAULT_BG_COLOR[0],
	g: DEFAULT_BG_COLOR[1],
	b: DEFAULT_BG_COLOR[2],
	a: DEFAULT_BG_COLOR[3],
	nodeMinRadius: DEFAULT_NODE_MIN_RADIUS,
	nodeMaxRadius: DEFAULT_NODE_MAX_RADIUS,
	hideNodesOnMove: DEFAULT_HIDE_NODES_ON_MOVE,
	drawNodes: DEFAULT_DRAW_NODES,
	nodeMinSaturation: DEFAULT_NODE_FILTERED_OUT_SATURATION,
	nodeMaxSaturation: DEFAULT_NODE_FILTERED_IN_SATURATION,
	filterVertices: false,
	hideEdgesOnMove: DEFAULT_HIDE_EDGES_ON_MOVE,
	drawEdges: DEFAULT_DRAW_EDGES,
	edgeConstantWidth: DEFAULT_EDGE_CONSTANT_WIDTH,
	depthWrite: DEFAULT_EDGE_DEPTH_WRITE,
	edgeAlpha: 0.15,
	edgeAntialias: DEFAULT_EDGE_ANTIALIAS,
	edgeMinWidth: DEFAULT_EDGE_MIN_WIDTH,
	edgeMaxWidth: DEFAULT_EDGE_MAX_WIDTH,
	edgeMinSaturation: DEFAULT_EDGE_FILTERED_IN_SATURATION,
	edgeMaxSaturation: DEFAULT_EDGE_FILTERED_OUT_SATURATION,
	drawAxes: DEFAULT_DRAW_AXES,
	axesInCorner: DEFAULT_CORNER_AXES,
	nodeOutline: DEFAULT_NODE_OUTLINE,
}
CanChangeRenderProperties.argTypes = {
	r: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	g: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	b: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	a: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	nodeMinRadius: { control: { type: 'range', min: 0.1, max: 10, step: 0.1 } },
	nodeMaxRadius: { control: { type: 'range', min: 0.1, max: 10, step: 0.1 } },
	nodeMinSaturation: {
		control: { type: 'range', min: 0, max: 1.0, step: 0.1 },
	},
	nodeMaxSaturation: {
		control: { type: 'range', min: 0, max: 1.0, step: 0.1 },
	},
	edgeMinWidth: { control: { type: 'range', min: 1.0, max: 10 } },
	edgeMaxWidth: { control: { type: 'range', min: 1.0, max: 10 } },
	edgeAlpha: { control: { type: 'range', min: 0, max: 1.0, step: 0.1 } },
	edgeMinSaturation: {
		control: { type: 'range', min: 0, max: 1.0, step: 0.1 },
	},
	edgeMaxSaturation: {
		control: { type: 'range', min: 0, max: 1.0, step: 0.1 },
	},
}

export const FullyInteractive: ComponentStory<null> = () => (
	<FullyInteractiveGraph data={testData} />
)

export const CanChangeHoverHighlightColor: ComponentStory<null> = ({
	r,
	g,
	b,
	a,
}) => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<HighlightHoveredNode color={[r, g, b, a]} />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}
CanChangeHoverHighlightColor.args = {
	r: DEFAULT_HOVER_HIGHLIGHT_COLOR[0],
	g: DEFAULT_HOVER_HIGHLIGHT_COLOR[1],
	b: DEFAULT_HOVER_HIGHLIGHT_COLOR[2],
	a: DEFAULT_HOVER_HIGHLIGHT_COLOR[3],
}
CanChangeHoverHighlightColor.argTypes = {
	r: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	g: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	b: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	a: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
}

export const CanChangeColorizerWithoutReloadingData: ComponentStory<null> = ({
	r,
	g,
	b,
	a,
}) => {
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={(): ColorVector => [r, g, b, a]}
				data={testData}
			>
				<Camera interactive />
				<HighlightHoveredNode color={[r, g, b, a]} />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}
CanChangeHoverHighlightColor.args = {
	r: 1,
	g: 0,
	b: 0,
	a: 1,
}
CanChangeHoverHighlightColor.argTypes = {
	r: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	g: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	b: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	a: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
}

export const CanShowHoverNodeLabel: ComponentStory<null> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<LabelHoveredNode />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}

export const CanShowNodeHoverLabelAndHighlight: ComponentStory<null> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<HighlightHoveredNode />
				<LabelHoveredNode />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}

export const CanChangeHighlightSetColor: ComponentStory<null> = ({
	r,
	g,
	b,
	a,
}) => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<NodeSetHighlight color={[r, g, b, a]} vertexIds={HIGHLIGHT_IDS} />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}
CanChangeHoverHighlightColor.args = {
	r: DEFAULT_HOVER_HIGHLIGHT_COLOR[0],
	g: DEFAULT_HOVER_HIGHLIGHT_COLOR[1],
	b: DEFAULT_HOVER_HIGHLIGHT_COLOR[2],
	a: DEFAULT_HOVER_HIGHLIGHT_COLOR[3],
}
CanChangeHoverHighlightColor.argTypes = {
	r: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	g: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	b: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
	a: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
}

export const CanShowNodeSetLabel: ComponentStory<null> = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<NodeSetLabel vertexIds={HIGHLIGHT_IDS} />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}

export const CanShowNodeSetLabelAndHighlight = () => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive />
				<NodeSetLabel vertexIds={HIGHLIGHT_IDS} />
				<NodeSetHighlight vertexIds={HIGHLIGHT_IDS} />
				<HandleNodeClicks onClick={action('click')} />
			</GraphView>
		</div>
	)
}

export const CanChangeZoom: ComponentStory<null> = ({ zoom }) => {
	return (
		<div className="graph-pane-container">
			<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
				<Camera interactive zoom={zoom} />
			</GraphView>
		</div>
	)
}
CanChangeZoom.args = {
	zoom: -1500,
}
CanChangeZoom.argTypes = {
	zoom: { control: { type: 'range', min: -1500, max: 10 } },
}

export const CanChangeNodeLayoutByUsingNewDataStructure: ComponentStory<
	null
> = () => {
	return <NodeLayoutExampleImmutable data={testData} />
}

export const CanChangeNodeLayoutByUsingTheChangePositionsAPI: ComponentStory<
	null
> = () => {
	return <NodeLayoutExampleMutable data={testData} />
}

export const CanResize: ComponentStory<null> = ({ width, height }) => {
	return (
		<div className="graph-pane-container">
			<GraphView
				className="graph-pane"
				colorizer={colorizer}
				data={testData}
				style={{ width, height }}
			>
				<Camera interactive />
			</GraphView>
		</div>
	)
}
CanResize.args = {
	min: 1000,
	max: 1000,
}
CanResize.argTypes = {
	min: { control: { type: 'range', min: 100, max: 3000 } },
	max: { control: { type: 'range', min: 100, max: 3000 } },
}

export const CanChangeCameraBounds: ComponentStory<null> = ({
	minX,
	width,
	minY,
	height,
	transitionDuration,
}) => {
	const nodes = [
		{
			id: '1',
			x: -10,
			y: -10,
			radius: 2,
			label: 'Pos: (-10, -10), Width: 2',
		},
		{
			id: '2',
			x: 10,
			y: 10,
			radius: 2,
			label: 'Pos: (10, 10), Width: 2',
		},
		{
			id: '3',
			x: 0,
			y: 0,
			radius: 1,
			label: 'Pos: (0, 0), Width: 1',
		},
	]
	/* This bounds should exactly match the inner circle (circle 3) */
	return (
		<div className="graph-pane-container">
			<GraphView
				data={{
					nodes,
					edges: [],
				}}
				className="graph-pane"
			>
				<Camera interactive />
				<NodeSetLabel vertexIds={nodes.map(n => n.id)} />
				<Camera
					bounds={{
						x: { min: minX, max: minX + width },
						y: { min: minY, max: minY + height },
					}}
					transitionDuration={transitionDuration}
				/>
			</GraphView>
		</div>
	)
}
CanChangeCameraBounds.args = {
	minX: -1,
	width: 2,
	minY: -1,
	height: 2,
	transitionDuration: 500,
}

export const WithCorrectSizedWeights: ComponentStory<null> = ({
	width,
	height,
}) => {
	return (
		<div>
			<div style={{ fontWeight: 600 }}>
				Resize the graph using the knobs, the two circles should always be
				within the two outlines
			</div>
			<div
				className="graph-pane-container"
				style={{ width, height, position: 'relative' }}
			>
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: height / 2 - 2.5,
						width: 5,
						height: 5,
						border: `1px solid rgba(0, 0, 0, .1)`,
						zIndex: 10,
					}}
				></div>
				<div
					style={{
						position: 'absolute',
						right: 0,
						top: height / 2 - 5,
						width: 10,
						height: 10,
						border: `1px solid rgba(0, 0, 0, .1)`,
						zIndex: 10,
					}}
				></div>
				<GraphView
					style={{ width, height }}
					className="graph-pane"
					colorizer={colorizer}
					data={{
						nodes: [
							{
								group: '1',
								id: '5',
								label: 'Should be 5px',
								x: -20000,
								y: 0,
								weight: 10,
							},
							{
								group: '2',
								id: '10',
								label: 'Should be 10px',
								x: 20000,
								y: 0,
								weight: 20,
							},
						],
						edges: [],
					}}
				>
					<Nodes minRadius={5} maxRadius={10} />
					<Camera interactive />
					<HighlightHoveredNode />
				</GraphView>
			</div>
		</div>
	)
}
WithCorrectSizedWeights.args = {
	width: 300,
	height: 300,
}

export const EventBindings: ComponentStory<null> = ({ width, height }) => {
	const handleInitialize = useCallback((context: GraphRenderer) => {
		console.log('Initialized', context)
	}, [])

	const handleDataLoaded = useCallback(() => {
		console.log('Data loaded')
	}, [])

	const handleResize = useCallback(() => {
		console.log('Graph resized')
	}, [])

	const handleNodeClick = useCallback((node?: Node) => {
		console.log(`Node clicked: ${node?.id}`)
	}, [])

	const handleNodeHover = useCallback((node?: Node) => {
		console.log(`Node hovered: ${node?.id}`)
	}, [])

	return (
		<>
			<div>
				{`Open the console to view events as they occur. (This doesn't use
		 					actions because the serialization is too slow.)`}
			</div>
			<div className="graph-pane-container">
				<GraphView
					style={{ width, height }}
					className="graph-pane"
					data={testData}
					onInitialize={handleInitialize}
					onDataLoad={handleDataLoaded}
					onResize={handleResize}
					onNodeClick={handleNodeClick}
					onNodeHover={handleNodeHover}
				/>
			</div>
		</>
	)
}
EventBindings.args = {
	width: 500,
	height: 500,
}
EventBindings.argTypes = {
	width: { control: { type: 'range', min: 100, max: 1000 } },
	height: { control: { type: 'range', min: 100, max: 1000 } },
}

interface NodeLayoutExampleProps {
	data: InputGraph
}
const NodeLayoutExampleMutable = ({ data }: NodeLayoutExampleProps) => {
	const graphRef = useRef<GraphRenderer>(null)
	const handleLayout = useCallback(() => {
		const positionMap: PositionMap = {}
		let node: InputNode
		for (node of data.nodes) {
			positionMap[node.id || '0'] = {
				x: getRandomArbitrary(-1000, 1000),
				y: getRandomArbitrary(-1000, 1000),
			}
		}
		graphRef.current!.changePositions(positionMap, 1000)
	}, [data])
	return (
		<>
			<button onClick={handleLayout}>Random Layout</button>
			<GraphView
				ref={graphRef}
				className="graph-pane"
				colorizer={colorizer}
				data={testData}
			>
				<Camera interactive />
				<HighlightHoveredNode />
			</GraphView>
		</>
	)
}

const NodeLayoutExampleImmutable = ({ data }: NodeLayoutExampleProps) => {
	const [finalData, setFinalData] = useState(data)
	const handleLayout = useCallback(() => {
		const newData: InputGraph = {
			nodes: [],
			edges: data.edges,
		}
		let node: InputNode
		for (node of data.nodes) {
			newData.nodes.push({
				...node,
				x: getRandomArbitrary(-1000, 1000),
				y: getRandomArbitrary(-1000, 1000),
			})
		}
		setFinalData(newData)
	}, [data])
	return (
		<>
			<button onClick={handleLayout}>Random Layout</button>
			<GraphView className="graph-pane" colorizer={colorizer} data={finalData}>
				<Camera interactive />
				<HighlightHoveredNode />
			</GraphView>
		</>
	)
}
