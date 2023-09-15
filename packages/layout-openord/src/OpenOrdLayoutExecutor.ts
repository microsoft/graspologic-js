/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	GraphContainer,
	Position,
	squareDistanceTo,
	NodeIndex,
	randBetween,
	Node,
} from '@graspologic/graph'
import { BaseExecutor } from '@graspologic/layout-core'
import { AnnealingClock } from './AnnealingClock.js'
import { DensityGrid } from './DensityGrid.js'
import { jumpTowards, jumpRandom } from './jumps.js'
import { sampleBitmap } from './sampleBitmap.js'
import {
	NodeUpdate,
	NodeUpdateKind,
	OpenOrdTickProgress,
	OpenOrdConfiguration,
	AnnealingPhase,
	DEFAULT_CONFIGURATION,
} from './types.js'

/**
 * @internal
 *
 * A layout executor which will run the OpenOrd layout on a graph
 */
export class OpenOrdLayoutExecutor extends BaseExecutor<
	OpenOrdConfiguration,
	AnnealingClock,
	OpenOrdTickProgress
> {
	private _densityGrid: DensityGrid

	/**
	 * Constructor for the OpenOrdLayoutExecutor
	 * @param graph The graph to layout
	 * @param configuration The configuration for the algorithm
	 * @param clock The annealing clock which controls how long phases are run
	 * @param globalObject The global object
	 * @param densityGrid The node density grid
	 */
	public constructor(
		graph: GraphContainer,
		configuration: OpenOrdConfiguration,
		clock: AnnealingClock,
		globalObject: any,
		densityGrid: DensityGrid,
	) {
		super(graph, configuration, clock, globalObject)
		this._densityGrid = densityGrid
		// Randomize the graph layout if it's zeroed out
		let isZeroed = true
		let node: Node
		// Randomize the graph layout if it's zeroed out
		for (node of this.graph.nodes) {
			if (node.x !== 0 || node.y !== 0) {
				isZeroed = false
				break
			}
		}

		if (isZeroed) {
			this.globalObject.console.log('randomizing layouts')
			for (node of this.graph.nodes) {
				node.x = randBetween(0, 1024)
				node.y = randBetween(0, 1024)
			}
		}
		this.initializeDensityGrid()
	}

	/**
	 * Gets the name of the layout algorithm
	 */
	public getName() {
		return 'OpenOrd'
	}

	/**
	 * Gets the density grid
	 */
	public get densityGrid() {
		return this._densityGrid
	}

	/**
	 * Gets the default configuration
	 */
	protected get defaultConfiguration(): OpenOrdConfiguration {
		return DEFAULT_CONFIGURATION
	}

	/**
	 * Constructs the tick progress object
	 */
	protected getProgress(): OpenOrdTickProgress {
		const {
			phase,
			iteration,
			phaseIteration,
			targetPhaseIterations,
			targetIterations,
		} = this.clock
		const {
			emitDensitySnapshots,
			densitySnapshotSamplingRate,
			densitySnapshotEmitRate,
			emitEnergy,
			emitObjectiveEnergy,
		} = this.configuration

		const result: OpenOrdTickProgress = {
			clock: {
				phase,
				iteration,
				phaseIteration,
				targetIterations,
				targetPhaseIterations,
			},
			densityGrid: {},
			metrics: {},
		}

		if (emitDensitySnapshots) {
			if (
				densitySnapshotEmitRate == null ||
				this.clock.iteration % densitySnapshotEmitRate === 0
			) {
				result.densityGrid.bitmap = sampleBitmap(
					this.densityGrid,
					densitySnapshotSamplingRate,
				)
			}
		}

		if (emitEnergy) {
			const energy = this.energy
			result.metrics.energy = energy
		}

		if (emitObjectiveEnergy) {
			const [
				objectiveEnergy,
				attractiveEnergy,
				repulsiveEnergy,
				overlapEnergy,
			] = this.objectiveEnergy
			result.metrics.objectiveEnergy = objectiveEnergy
			result.metrics.attractiveEnergy = attractiveEnergy
			result.metrics.repulsiveEnergy = repulsiveEnergy
			result.metrics.overlapEnergy = overlapEnergy
		}

		return result
	}

	/**
	 * Performs a single unit of work
	 */
	protected performUnitOfWork() {
		if (this.configuration.iterativeForceModel) {
			this.performIterativeUnitOfWork()
		} else {
			this.performConcurrentUnitOfWork()
		}
	}

	/**
	 * Initializes the internal density grid
	 */
	private initializeDensityGrid(): void {
		let node: Node
		for (node of this.graph.nodes) {
			this.densityGrid.add(node)
		}
	}

	/**
	 * perform the unit of work (layout step) with a concurrent force model - updates are applied after they have all been computed
	 */
	private performConcurrentUnitOfWork() {
		let node: Node
		for (node of this.graph.nodes) {
			const update = this.computeNodeUpdate(node)
			this.applyUpdate(update)
		}
	}

	/**
	 * perform the unit of work (layout step) with a iterative force model - updates are applied in series
	 */
	private performIterativeUnitOfWork() {
		let update: NodeUpdate
		for (update of this.computeIterativeUpdates()) {
			this.applyUpdate(update)
		}
	}
	/**
	 * This is a generator so that we can either resolve the updates iteratively using
	 * a stochastic gradient descent method, or all at the same time using a force modeling
	 * approach
	 * @returns The updates for each of the nodes
	 */
	private *computeIterativeUpdates(): IterableIterator<NodeUpdate> {
		let node: Node
		for (node of this.graph.nodes) {
			yield this.computeNodeUpdate(node)
		}
	}

	private computeNodeUpdate(node: Node): NodeUpdate {
		const [centroidJump, centroidEdgeCut] = this.computeCentroidJump(node)
		const centroidJumpEnergy = this.computeNodePosEnergy(node, centroidJump)
		const jumpScale = 0.01 * this.clock.temperature
		const randJumpPosition = jumpRandom(centroidJump, jumpScale)
		const randJumpEnergy = this.computeNodePosEnergy(node, randJumpPosition)

		if (randJumpEnergy < centroidJumpEnergy) {
			return {
				node,
				kind: NodeUpdateKind.RandomJump,
				position: randJumpPosition,
				energy: randJumpEnergy,
			}
		} else {
			return {
				node,
				kind: NodeUpdateKind.CentroidJump,
				position: centroidJump,
				energy: centroidJumpEnergy,
				prunedEdge: centroidEdgeCut,
			}
		}
	}

	private computeNodePosEnergy(node: Node, position: Position): number {
		const attractive = this.nodeAttractiveForce(node, position)
		const repulsive = this.nodeRepulsiveForce(node, position)
		return attractive + repulsive
	}

	private nodeAttractiveForce(node: Node, position: Position): number {
		//const attractionFactor = this.clock.attraction ** 4 * 2e-2
		const energyDistancePower = this.clock.energyDistancePower
		let sum = 0.0
		let neighborId: number
		let neighbor: Node
		let weight: number

		for (neighborId of this.graph.getNeighbors(node.storeId)) {
			neighbor = this.graph.nodes.itemAt(neighborId)
			weight = this.graph.getEdgeWeight(node.storeId, neighborId)
			if (weight != null) {
				const energyDistance =
					squareDistanceTo(position, neighbor) ** energyDistancePower

				const neighborEnergy = weight * energyDistance // * attractionFactor
				sum += neighborEnergy
			}
		}

		return sum
	}

	private nodeRepulsiveForce(node: Node, position: Position): number {
		return this.densityGrid.getDensity(
			node,
			position,
			this.clock.useFineDensity,
		)
	}

	private computeCentroidJump(node: Node): [Position, NodeIndex | undefined] {
		const isNeighborCutRequired = () => {
			// TODO: This turns on when users set the edge cut manually. It doesn't fire with the default
			// value of 0.8. Is this even useful?
			const cutEndActive = this.clock.cutEnd < 39500.9
			const numNeighborsExceedsMin = () => {
				const numNeighbors = this.graph.getNeighbors(node.storeId).length
				return numNeighbors > this.clock.minEdges
			}
			return (
				this.clock.neighborCutsEnabled &&
				cutEndActive &&
				numNeighborsExceedsMin()
			)
		}

		const centroidPos = this.graph.getNeighborhoodCentroid(node.storeId)
		const jumpPos = jumpTowards(node, centroidPos, this.clock.damping)
		const jumpDist = squareDistanceTo(centroidPos, jumpPos)
		const prunedEdge =
			jumpDist > 0 && isNeighborCutRequired()
				? this.getEdgeToCut(node, centroidPos)
				: undefined
		return [jumpPos, prunedEdge]
	}

	private getEdgeToCut(
		node: Node,
		centroidPos: Position,
	): NodeIndex | undefined {
		const neighbors = this.graph.getNeighbors(node.storeId)
		const squareConnections = Math.sqrt(neighbors.length)
		let maxDistance = 0.0
		let maxNeighbor: NodeIndex | undefined

		neighbors.forEach(neighborId => {
			const neighbor = this.graph.nodes.itemAt(neighborId)
			const distance =
				squareDistanceTo(centroidPos, neighbor) * squareConnections
			if (distance > maxDistance && distance > this.clock.cutOffLength) {
				maxDistance = distance
				maxNeighbor = neighborId
			}
		})

		return maxNeighbor
	}

	private applyUpdate({ node, position, prunedEdge }: NodeUpdate) {
		if (this.densityGrid.contains(node)) {
			this.densityGrid.subtract(node)
		}

		// Move node position
		node.x = position.x
		node.y = position.y

		if (prunedEdge) {
			this.graph.pruneEdge(node.storeId, prunedEdge)
		}
		this.densityGrid.add(node)
	}

	/**
	 * Gets the working energy. This differs from the objective energy in that we cull low-weight edges as the
	 * algorithm progresses. The objective energy keep these in tact.
	 */
	public get energy(): number {
		let result = 0
		let node: Node
		for (node of this.graph.nodes) {
			result += this.computeNodePosEnergy(node, node)
		}
		return result
	}

	/**
	 * Gets the objective energy according to Equation 1 of the OpenOrd Paper
	 *
	 * https://www.researchgate.net/publication/253087985_OpenOrd_An_Open-Source_Toolbox_for_Large_Graph_Layout
	 */
	public get objectiveEnergy(): [number, number, number, number] {
		let attractiveEnergy = 0
		let repulsiveEnergy = 0
		let overlapEnergy = 0.001

		let node: Node
		let neighbor: Node
		for (node of this.graph.nodes) {
			repulsiveEnergy += this.densityGrid.getDensity(node, node, false)
			if (this.clock.phase && this.clock.phase > AnnealingPhase.Liquid) {
				overlapEnergy += this.densityGrid.getOverlap(node, node)
			}

			for (neighbor of this.graph
				.getNeighborsObjective(node.storeId)
				.map(nid => this.graph.nodes.itemAt(nid))) {
				const distance = squareDistanceTo(node, neighbor)
				const weight = this.graph.getEdgeWeightObjective(
					node.storeId,
					neighbor.storeId,
				)
				attractiveEnergy += distance * weight
			}
		}

		const objectiveEnergy = attractiveEnergy + repulsiveEnergy
		return [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy]
	}
}
