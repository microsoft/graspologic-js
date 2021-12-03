/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface FA2TickProgress {
	/**
	 * The current clock info
	 */
	clock: {
		/**
		 * The iteration fa2 is on
		 */
		iteration: number

		/**
		 * The target number of iterations
		 */
		targetIterations: number
	}

	/**
	 * A generic bag of metrics for the current layout
	 */
	metrics: Record<string, any>
}

/**
 * @internal
 *
 * The configuration options for ForceAtlas2
 */
export interface FA2Configuration {
	/**
	 * If true, the size of the nodes will factor in to the node repulsion computation
	 *
	 * @defaultValue false
	 */
	adjustSize: boolean

	/**
	 * If true, linear-log computation will be used to calculate attraction, rather than linear
	 *
	 * @defaultValue false
	 */
	linLogMode: boolean

	/**
	 * If true, the source node's mass will scale the attraction calculation
	 *
	 * @defaultValue false
	 */
	outboundAttractionDistribution: boolean

	/**
	 * If true, the size of the nodes will factor in to the node attraction computation
	 * TODO: This really needs a different name, we don't need two properties: adjustSize, adjustSizes
	 * @defaultValue false
	 */
	adjustSizes: boolean

	/**
	 * The exponential scaling factor for edges weight when computing attraction
	 *
	 * @defaultValue 0
	 */
	edgeWeightInfluence: number

	/**
	 * The scaling applied to masses during calculations
	 *
	 * @defaultValue 1
	 */
	scalingRatio: number

	/**
	 * If true, distance from origin is not taken into account when computing gravity
	 *
	 * @defaultValue false
	 */
	strongGravityMode: boolean

	/**
	 * The gravity constant to use when applying gravity to the graph
	 *
	 * @defaultValue 1
	 */
	gravity: number

	/**
	 * The scaling factor when applying node movement
	 *
	 * @defaultValue 1
	 */
	slowDown: number

	/**
	 * If true, the Barnes Hut optimization should be applied
	 *
	 * @defaultValue true
	 */
	barnesHutOptimize: boolean

	/**
	 * The theta parameter used in the barnes hut algorithm
	 *
	 * @defaultValue 1.2
	 */
	barnesHutTheta: number

	/**
	 * The start iteration number
	 *
	 * @defaultValue 1
	 */
	startingIterations: number

	/**
	 * The target number of iterations to run
	 *
	 * @defaultValue 100
	 */
	targetIterations: number

	/**
	 * The max force used when calculating the nodes position
	 *
	 * @defaultValue 10
	 */
	maxForce: number
}

/**
 * @internal
 *
 * The default configuration object for the FA2 algorithm
 */
export const DEFAULT_CONFIGURATION: FA2Configuration = Object.freeze({
	adjustSize: false,
	linLogMode: false,
	outboundAttractionDistribution: false,
	adjustSizes: false,
	edgeWeightInfluence: 0,
	scalingRatio: 1,
	strongGravityMode: false,
	gravity: 1,
	slowDown: 1,
	barnesHutOptimize: true,
	barnesHutTheta: 1.2,
	startingIterations: 1,
	maxForce: 10,
	targetIterations: 100,
})

/**
 * @internal
 *
 * The force metrics
 */
export type ForceMetrics = [
	/**
	 * total tension
	 */
	number,

	/**
	 * total swing
	 */
	number,

	/**
	 * total traction
	 */
	number,

	/**
	 * repulsion
	 */
	number,

	/**
	 * gravity
	 */
	number,

	/**
	 * attraction
	 */
	number,
]
