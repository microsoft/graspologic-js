/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { InputGraph } from '@graspologic/graph'
import {
	GraphView,
	Camera,
	Nodes,
	HighlightHoveredNode,
} from '@graspologic/react'
import { PositionMap, GraphRenderer } from '@graspologic/renderer'
import React, { useState, useCallback, useMemo, useRef } from 'react'
import colorizer from '../data/categoricalColorizer'
import { getRandomArbitrary, getRandomInt } from '../utils'
const FPSStats = require('react-fps-stats').default

export const StressTestVertices3D: React.FC = () => {
	const [numNodes, setNumNodes] = useState(500_000)
	const textInput = useRef<HTMLInputElement>(null)
	const graph = useMemo(() => {
		console.log(`generate graph with ${numNodes} nodes`)
		const result: InputGraph = {
			nodes: [],
			edges: [],
		}
		for (let i = 0; i < numNodes; ++i) {
			result.nodes.push({
				id: `node-${i}`,
				x: getRandomArbitrary(-1500, 1500),
				y: getRandomArbitrary(-1500, 1500),
				z: getRandomArbitrary(-1500, 1500),
				shape: getRandomInt(0, 2),
				group: `${i % 20}`,
				weight: 10,
			})
		}
		result.edges.push({
			source: 'node-1',
			target: 'node-2',
			weight: 0.5,
		})
		return result
	}, [numNodes])

	const onLoadGraph = useCallback(() => {
		setNumNodes(textInput.current!.valueAsNumber)
	}, [textInput, setNumNodes])

	const graphRef = useRef<GraphRenderer>(null)
	const handleLayout = useCallback(() => {
		const positionMap: PositionMap = {}
		graph.nodes.forEach(n => {
			positionMap[n.id] = {
				x: getRandomArbitrary(-1000, 1000),
				y: getRandomArbitrary(-1000, 1000),
				z: getRandomArbitrary(-1000, 1000),
			}
		})
		graphRef.current!.changePositions(positionMap, 5000)
	}, [graph])

	return (
		<>
			<FPSStats />
			<div style={{ marginTop: 50 }}>
				<div style={{ display: 'inline' }}>
					<span># vertices:</span>
					<input ref={textInput} type="number" defaultValue={`${numNodes}`} />
					<button onClick={onLoadGraph}>Load Graph</button>
					<button onClick={handleLayout}>Random Layout</button>
				</div>
				<div className="graph-pane-container">
					<GraphView
						ref={graphRef}
						className="graph-pane"
						data={graph}
						colorizer={colorizer}
						is3D={true}
						nodeCountHint={numNodes}
					>
						<Camera interactive />
						<Nodes minRadius={0.1} maxRadius={1.0} />
						<HighlightHoveredNode />
					</GraphView>
				</div>
			</div>
		</>
	)
}
