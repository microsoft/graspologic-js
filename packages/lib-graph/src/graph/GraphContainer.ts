/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createNodeStore, createEdgeStore } from '../primitives'
import { EdgeStore } from '../primitives/edge'
import { NodeStore } from '../primitives/node'
import { weightedCentroid } from '../space/measure'
import { Position } from '../space/types'
import {
	internGraph,
	InternGraphOptions,
	DEFAULT_INTERN_GRAPH_OPTIONS,
} from './internGraph'
import { populateAdjacency } from './populateAdjacency'
import { NodeIndex, TransportGraph, AdjacencyMap, InputGraph } from './types'

/**
 * The datastructure which contains all the internal graph data required for the GraphRenderer
 */
export class GraphContainer {
	private _nodes: NodeStore
	private _edges: EdgeStore

	// #region adjacency maps
	private _originalAdjacency: AdjacencyMap | undefined
	private _adjacency: AdjacencyMap | undefined
	// #endregion

	/**
	 * @internal
	 * Constructs a new instance of the GraphContainer
	 * @param nodes The initial node data store
	 * @param edges The initial edge data store
	 */
	public constructor(nodes: NodeStore, edges: EdgeStore) {
		this._nodes = nodes
		this._edges = edges
	}

	/**
	 * @internal
	 * Gets the underlying node store
	 */
	public get nodes(): NodeStore {
		return this._nodes
	}
	/**
	 * @internal
	 * Gets the underlying edge store
	 */
	public get edges(): EdgeStore {
		return this._edges
	}

	/**
	 * Creates an instance of the GraphContainer using the given input graph
	 * @param inputGraph The pojo graph to intern
	 * @param options The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS}
	 * @returns The GraphContainer
	 */
	public static intern(
		inputGraph: InputGraph,
		options: InternGraphOptions = DEFAULT_INTERN_GRAPH_OPTIONS,
	): GraphContainer {
		return internGraph(inputGraph, options)
	}

	/**
	 * @internal
	 * Serializes the GraphContainer instance
	 * @returns The serialized version of the GraphContainer
	 */
	public serialize(): TransportGraph {
		return {
			nodes: this.nodes.store.buffer,
			edges: this.edges.store.buffer,
		}
	}

	/**
	 * @internal
	 * Deserializes the GraphContainer instance
	 * @param graph The serialized version of the GraphContainer
	 * @returns The deserialized GraphContainer
	 */
	public static deserialize(graph: TransportGraph): GraphContainer {
		const nodeStore = createNodeStore({
			buffer: graph.nodes,
			allocatedOnCreate: true,
		})
		const edgeStore = createEdgeStore({
			buffer: graph.edges,
			allocatedOnCreate: true,
		})
		return new GraphContainer(nodeStore, edgeStore)
	}

	/**
	 * @internal
	 * Retrieve neigbors of the given node. This may be reflect edge-cutting
	 * performed by the algorithm
	 * @param n The node index to retrieve neighbors for
	 * @returns A list of neighbor node indices
	 */
	public getNeighbors(n: NodeIndex): NodeIndex[] {
		const result = this.getAdjacencyMap(false).get(n)
		return result ? Object.keys(result).map(k => parseInt(k, 10)) : []
	}

	/**
	 * @internal
	 * Retrieve neigbors of the given node. This will not reflect any edge-cutting
	 * performed by the algorithm
	 * @param n The node index to retrieve neighbors for
	 * @returns A list of neighbor node indices
	 */
	public getNeighborsObjective(id: NodeIndex): NodeIndex[] {
		const result = this.getAdjacencyMap(true).get(id)
		if (!result) {
			throw new Error(`could not get adjacency for node ${id}`)
		}
		return Object.keys(result).map(k => parseInt(k, 10))
	}

	/**
	 * @internal
	 * Gets the edge weight between two nodes, which may reflect edge-cutting.
	 * @throws if source and target are not connected
	 * @param source The source node index
	 * @param target The target node index
	 * @returns The edge weight
	 */
	public getEdgeWeight(source: NodeIndex, target: NodeIndex): number {
		const result = this.getAdjacencyMap(false).get(source)
		if (!result) {
			throw new Error(`could not get adjacency for node ${source}`)
		}
		return result[target]
	}

	/**
	 * @internal
	 * Gets the edge weight between two nodes, ignoring reflect edge-cutting
	 * @throws if source and target are not connected
	 * @param source The source node index
	 * @param target The target node index
	 * @returns The edge weight
	 */
	public getEdgeWeightObjective(source: NodeIndex, target: NodeIndex): number {
		const result = this.getAdjacencyMap(true).get(source)
		if (!result) {
			throw new Error(`could not get objective adjacency for node ${source}`)
		}
		return result[target]
	}

	/**
	 * @internal
	 * Returns the computed cetroid of the neighborhood that the given node is a part of
	 * @param n The node to get the neighborhood centroid for
	 * @returns The centroid
	 */
	public getNeighborhoodCentroid(n: NodeIndex): Position {
		const neighbors = this.getNeighbors(n)
		const node = this.nodes.itemAt(n)
		if (!node) {
			throw new Error('could not get node ' + n)
		} else if (neighbors.length === 0) {
			return { x: node.x, y: node.y }
		} else {
			const neighborPositions: Position[] = [node]
			const neighborWeights: number[] = [1]
			neighbors.forEach(nid => {
				const neighbor = this.nodes.itemAt(nid)
				const edgeWeight = this.getEdgeWeight(n, nid)
				neighborPositions.push(neighbor)
				neighborWeights.push(edgeWeight)
			})
			const result = weightedCentroid(neighborPositions, neighborWeights)
			return result
		}
	}

	/**
	 * @internal
	 * Prunes an edge
	 * @param from The source node
	 * @param to The target node
	 */
	public pruneEdge(from: NodeIndex, to: NodeIndex): void {
		const fromList = this.getAdjacencyMap(false).get(from)
		const toList = this.getAdjacencyMap(false).get(to)
		if (!fromList || !toList) {
			throw new Error(`could not get edge for (${from}, ${to})`)
		}
		delete fromList[to]
		delete toList[from]
	}

	/**
	 * @internal
	 * Gets an adjacency map
	 * @param original If the original adjacency map is required
	 * @returns The adjacency map
	 */
	private getAdjacencyMap(original: boolean) {
		if (!this._originalAdjacency) {
			this._originalAdjacency = populateAdjacency(this.nodes, this.edges)
		}
		if (!this._adjacency && !original) {
			this._adjacency = populateAdjacency(this.nodes, this.edges)
		}
		return original ? this._originalAdjacency! : this._adjacency!
	}
}
