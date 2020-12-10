/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useCallback, useMemo, useRef } from 'react'
import DEFAULT_COLORIZER from '../data/categoricalColorizer'
import { getRandomArbitrary, getRandomInt } from '../utils'
import {
	InputGraph,
	NodePositioner,
	NodeComponentColorizer,
} from '@graspologic/graph'
import {
	GraphView,
	Camera,
	Nodes,
	HighlightHoveredNode,
} from '@graspologic/react'
import { GraphRenderer } from '@graspologic/renderer'
const FPSStats = require('react-fps-stats').default

interface StressTestVertices2DProps {
	colorizer?: NodeComponentColorizer
}

const BOUNDS = {
	x: {
		min: -1500,
		max: 1500,
	},
	y: {
		min: -1500,
		max: 1500,
	},
}

export const StressTestVertices2D: React.FC<StressTestVertices2DProps> = ({
	colorizer = DEFAULT_COLORIZER,
}) => {
	const [numNodes, setNumNodes] = useState(2_000_000)
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
				group: `${i % 20}`,
				shape: getRandomInt(0, 2),
				weight: 10,
			})
		}
		return result
	}, [numNodes])

	const graphRef = useRef<GraphRenderer>(null)
	const [positioner, setPositioner] = useState<NodePositioner | undefined>()
	const handleLayout = useCallback(() => {
		setPositioner({
			duration: 5000,
			x: () => getRandomArbitrary(-1500, 1500),
			y: () => getRandomArbitrary(-1500, 1500),
		})
	}, [setPositioner])

	const onLoadGraph = useCallback(() => {
		setNumNodes(parseInt(textInput.current!.value, 10) || 100)
	}, [textInput, setNumNodes])

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
						dataBounds={BOUNDS}
						className="graph-pane"
						data={graph}
					>
						<Camera />
						<Nodes
							position={positioner}
							color={colorizer}
							minRadius={0.1}
							maxRadius={1.0}
						/>
						<HighlightHoveredNode />
					</GraphView>
				</div>
			</div>
		</>
	)
}
