/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position, Node, NodeIndex } from '@graspologic/graph'

/**
 * @internal
 *
 * The configuration for the OpenOrd layout
 */
export interface OpenOrdConfiguration {
	/**
	 * The percentage of edges to exclude from the layout
	 * @defaultValue 0.8
	 */
	edgeCut: number

	/**
	 * If true, forces will be applied in series rather than concurrently
	 *
	 * @defaultValue false
	 */
	iterativeForceModel?: boolean

	/**
	 * The scheduling for the various phases of the layout
	 */
	schedule: Partial<Record<AnnealingPhase, PhaseSchedule>>

	// #region Density Grid Snapshotting
	/**
	 * If true, density snapshots will be emitted
	 */
	emitDensitySnapshots?: boolean

	/**
	 * If emitDensitySnapshots is true, this controls the sampling rate for the snapshots
	 */
	densitySnapshotSamplingRate: number

	/**
	 * If emitDensitySnapshots is true, this controls the emit rate for the snapshots
	 */
	densitySnapshotEmitRate?: number
	// #endregion

	// #region Metrics Reporting
	/**
	 * If true, the energy of the graph will be emitted in the metrics
	 */
	emitEnergy?: boolean

	/**
	 * If true, the objective energy of the graph will be emitted in the metrics
	 */
	emitObjectiveEnergy?: boolean
	// #endregion
}

/**
 * @internal
 *
 * The default set of configuration options for the layout
 */
export const DEFAULT_CONFIGURATION: OpenOrdConfiguration = Object.freeze({
	emitDensitySnapshots: false,
	densitySnapshotSamplingRate: 4,
	edgeCut: 0.8,
	schedule: {},
})

/**
 * @internal
 *
 * The phase of the layout
 */
export enum AnnealingPhase {
	Initial,
	Liquid,
	Expansion,
	Cooldown,
	Crunch,
	Simmer,
	Complete,
}

/**
 * @internal
 *
 * Gets a user friendly string of the given annealing phase
 * @param input The annealing phase
 */
export function getAnnealingPhaseString(input: AnnealingPhase): string {
	switch (input) {
		case AnnealingPhase.Initial:
			return 'initial'
		case AnnealingPhase.Liquid:
			return 'liquid'
		case AnnealingPhase.Expansion:
			return 'expansion'
		case AnnealingPhase.Cooldown:
			return 'cooldown'
		case AnnealingPhase.Crunch:
			return 'crunch'
		case AnnealingPhase.Simmer:
			return 'simmer'
		default:
			return 'unknown'
	}
}

/**
 * @internal
 *
 * The current progress of the layout process
 */
export interface OpenOrdTickProgress {
	/**
	 * The current density grid status
	 */
	densityGrid: {
		/**
		 * The sampled density grid bitmap. config.emitDensitySnapshots must be set
		 * to true to receive these
		 */
		bitmap?: number[][]
	}

	/**
	 * The current clock status
	 */
	clock: {
		/**
		 * The iteration the layout is on
		 */
		iteration: number

		/**
		 * The phase iteration the layout is on
		 */
		phaseIteration: number

		/**
		 * The target number of iterations
		 */
		targetIterations: number

		/**
		 * The target number of phase iterations
		 */
		targetPhaseIterations: number

		/**
		 * The current phase of the layout
		 */
		phase: AnnealingPhase
	}

	/**
	 * The set of metrics associated with the current layout
	 */
	metrics: {
		/**
		 * The energy contained in the graph, enabled by adding `emitEnergy: true` to the layout configuration
		 */
		energy?: number

		/**
		 * The energy contained in the graph, enabled by adding `emitObjectiveEnergy: true` to the layout configuration
		 */
		objectiveEnergy?: number

		// The individual components of the objective energy
		/**
		 * The attractive energy in the graph, enabled by adding `emitObjectiveEnergy: true` to the layout configuration
		 */
		attractiveEnergy?: number

		/**
		 * The repulsive energy in the graph, enabled by adding `emitObjectiveEnergy: true` to the layout configuration
		 */
		repulsiveEnergy?: number

		/**
		 * The overlap energy in the graph, enabled by adding `emitObjectiveEnergy: true` to the layout configuration
		 */
		overlapEnergy?: number
	}
}

/**
 * A schedule for a layout phase
 */
export interface PhaseSchedule {
	/**
	 * The number of iterations to run
	 */
	iterations: number
	temperature: number
	attraction: number
	damping: number
}

export interface NodeUpdate {
	node: Node
	position: Position
	energy: number
	kind: NodeUpdateKind
	prunedEdge?: NodeIndex
}

export enum NodeUpdateKind {
	CentroidJump,
	RandomJump,
}
