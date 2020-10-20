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
import { number, boolean, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useCallback, useRef, useState } from 'react'
import { FullyInteractiveGraph } from './components/FullyInteractiveGraph'
import colorizer from './data/categoricalColorizer'
import processGraphJson from './data/processGraphJson'
import { getRandomArbitrary } from './utils'
const testData = processGraphJson(
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@graspologic/testdata/data/testGraph.json'),
)

const COL_RANGE = { range: true, min: 0.0, max: 1.0, step: 0.01 }
const ZOOM_RANGE = { range: true, min: -1500.0, max: 10.0, step: 0.5 }
const SCALAR_RANGE = { range: true, min: 0.01, max: 1.0, step: 0.01 }
const EWIDTH_RANGE = { range: true, min: 0.1, max: 10.0, step: 0.1 }
const VWIDTH_RANGE = { range: true, min: 0.1, max: 10, step: 0.01 }
const HIGHLIGHT_IDS = ['3_344', '0_249', '5_534', '5_552']

storiesOf('Interactive 2D Examples', module)
	.addDecorator(withKnobs)
	.add('can change render properties', () => {
		const nodeCat = 'NODES'
		const edgeCat = 'EDGES'
		const axesCat = 'AXES'
		const backgroundCat = 'BACKGROUND'

		const [dR, dG, dB, dA] = DEFAULT_BG_COLOR
		const r = number('R', dR, COL_RANGE, backgroundCat)
		const g = number('G', dG, COL_RANGE, backgroundCat)
		const b = number('B', dB, COL_RANGE, backgroundCat)
		const a = number('A', dA, COL_RANGE, backgroundCat)
		const minRadius = number(
			'Min Radius',
			DEFAULT_NODE_MIN_RADIUS,
			VWIDTH_RANGE,
			nodeCat,
		)
		const maxRadius = number(
			'Max Radius',
			DEFAULT_NODE_MAX_RADIUS,
			VWIDTH_RANGE,
			nodeCat,
		)
		const outline = boolean('Outline', DEFAULT_NODE_OUTLINE, nodeCat)
		const hideNodesOnMove = boolean(
			'Hide Nodes on Move',
			DEFAULT_HIDE_NODES_ON_MOVE,
			nodeCat,
		)
		const drawNodes = boolean('Draw Nodes', DEFAULT_DRAW_NODES, nodeCat)
		const nodeMinSat = number(
			'Node Min Saturation',
			DEFAULT_NODE_FILTERED_OUT_SATURATION,
			SCALAR_RANGE,
			nodeCat,
		)
		const nodeMaxSat = number(
			'Node Max Saturation',
			DEFAULT_NODE_FILTERED_IN_SATURATION,
			SCALAR_RANGE,
			nodeCat,
		)
		const filterVertices = boolean('Filter Vertices', false, nodeCat)
		const hideEdgesOnMove = boolean(
			'Hide Edges on Move',
			DEFAULT_HIDE_EDGES_ON_MOVE,
			edgeCat,
		)
		const drawEdges = boolean('Draw Edges', DEFAULT_DRAW_EDGES, edgeCat)
		const constantWidth = boolean(
			'Constant Width',
			DEFAULT_EDGE_CONSTANT_WIDTH,
			edgeCat,
		)
		const depthWrite = boolean('Depth Write', DEFAULT_EDGE_DEPTH_WRITE, edgeCat)
		const antialias = boolean('Antialias', DEFAULT_EDGE_ANTIALIAS, edgeCat)
		const minWidth = number(
			'Min Width',
			DEFAULT_EDGE_MIN_WIDTH,
			EWIDTH_RANGE,
			edgeCat,
		)
		const maxWidth = number(
			'Max Width',
			DEFAULT_EDGE_MAX_WIDTH,
			EWIDTH_RANGE,
			edgeCat,
		)
		const alpha = number('Alpha', 0.15, SCALAR_RANGE, edgeCat)
		const edgeMinSat = number(
			'Edge Min Saturation',
			DEFAULT_EDGE_FILTERED_IN_SATURATION,
			SCALAR_RANGE,
			edgeCat,
		)
		const edgeMaxSat = number(
			'Edge Max Saturation',
			DEFAULT_EDGE_FILTERED_OUT_SATURATION,
			SCALAR_RANGE,
			edgeCat,
		)
		const drawAxes = boolean('Draw Axes', DEFAULT_DRAW_AXES, axesCat)
		const axesInCorner = boolean('Axes In Corner', DEFAULT_CORNER_AXES, axesCat)

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
						minRadius={minRadius}
						maxRadius={maxRadius}
						outline={outline}
						hideOnMove={hideNodesOnMove}
						shown={drawNodes}
						filteredIds={vertset}
						filteredOutSaturation={nodeMinSat}
						filteredInSaturation={nodeMaxSat}
					/>
					<Edges
						hideOnMove={hideEdgesOnMove}
						shown={drawEdges}
						constantWidth={constantWidth}
						depthWrite={depthWrite}
						antialias={antialias}
						minWidth={minWidth}
						maxWidth={maxWidth}
						alpha={alpha}
						filteredOutSaturation={edgeMinSat}
						filteredInSaturation={edgeMaxSat}
					/>
					<Axes shown={drawAxes} inCorner={axesInCorner} />
				</GraphView>
			</div>
		)
	})
	.add('fully interactive', () => <FullyInteractiveGraph data={testData} />)
	.add('can change hover highlight color', () => {
		const r = number('R', DEFAULT_HOVER_HIGHLIGHT_COLOR[0], COL_RANGE)
		const g = number('G', DEFAULT_HOVER_HIGHLIGHT_COLOR[1], COL_RANGE)
		const b = number('B', DEFAULT_HOVER_HIGHLIGHT_COLOR[2], COL_RANGE)
		const a = number('A', DEFAULT_HOVER_HIGHLIGHT_COLOR[3], COL_RANGE)
		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
					<Camera interactive />
					<HighlightHoveredNode color={[r, g, b, a]} />
					<HandleNodeClicks onClick={action('click')} />
				</GraphView>
			</div>
		)
	})
	.add('can change colorizer without reloading data', () => {
		const r = number('R', 1, COL_RANGE)
		const g = number('G', 0, COL_RANGE)
		const b = number('B', 0, COL_RANGE)
		const a = number('A', 1, COL_RANGE)
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
	})
	.add('can show hover node label', () => {
		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
					<Camera interactive />
					<LabelHoveredNode />
					<HandleNodeClicks onClick={action('click')} />
				</GraphView>
			</div>
		)
	})
	.add('can show node hover label and highlight', () => {
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
	})
	.add('can change highlight set color', () => {
		const r = number('R', DEFAULT_HOVER_HIGHLIGHT_COLOR[0], COL_RANGE)
		const g = number('G', DEFAULT_HOVER_HIGHLIGHT_COLOR[1], COL_RANGE)
		const b = number('B', DEFAULT_HOVER_HIGHLIGHT_COLOR[2], COL_RANGE)
		const a = number('A', DEFAULT_HOVER_HIGHLIGHT_COLOR[3], COL_RANGE)
		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
					<Camera interactive />
					<NodeSetHighlight color={[r, g, b, a]} vertexIds={HIGHLIGHT_IDS} />
					<HandleNodeClicks onClick={action('click')} />
				</GraphView>
			</div>
		)
	})
	.add('can show node set label', () => {
		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
					<Camera interactive />
					<NodeSetLabel vertexIds={HIGHLIGHT_IDS} />
					<HandleNodeClicks onClick={action('click')} />
				</GraphView>
			</div>
		)
	})
	.add('can show node set label and highlight', () => {
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
	})
	.add('can change zoom', () => {
		const zoom = number('Zoom', ZOOM_RANGE.min, ZOOM_RANGE)
		return (
			<div className="graph-pane-container">
				<GraphView className="graph-pane" colorizer={colorizer} data={testData}>
					<Camera interactive zoom={zoom} />
				</GraphView>
			</div>
		)
	})

	.add('can change node layout by using new data structure', () => {
		return <NodeLayoutExampleImmutable data={testData} />
	})
	.add('can change node layout by using the changePositions API', () => {
		return <NodeLayoutExampleMutable data={testData} />
	})
	.add('can resize', () => {
		const width = number('width', 1000, {
			min: 100,
			max: 3000,
			step: 100,
			range: true,
		})
		const height = number('height', 1000, {
			min: 100,
			max: 3000,
			step: 100,
			range: true,
		})
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
	})
	.add('can change camera bounds', () => {
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
		const minX = number('Bounds Min X', -1)
		const width = number('Bounds Width', 2)
		const minY = number('Bounds Min Y', -1)
		const height = number('Bounds Height', 2)
		const transitionDuration = number('Bounds Transition Duration', 500)
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
	})
	.add('with correct sized weights', () => {
		const width = number('Graph width', 300)
		const height = number('Graph height', 300)
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
						// className="graph-pane"
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
	})
	.add('event bindings', () => {
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

		const width = number('width', 500, {
			min: 100,
			max: 1000,
			step: 100,
			range: true,
		})
		const height = number('height', 500, {
			min: 100,
			max: 1000,
			step: 100,
			range: true,
		})

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
	})

interface NodeLayoutExampleProps {
	data: InputGraph
}
const NodeLayoutExampleMutable: React.FC<NodeLayoutExampleProps> = ({
	data,
}) => {
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

interface NodeLayoutExampleProps {
	data: InputGraph
}
const NodeLayoutExampleImmutable: React.FC<NodeLayoutExampleProps> = ({
	data,
}) => {
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
