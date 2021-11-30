/**
 * @internal
 *
 * The default configuration object for the FA2 algorithm
 */
export const DEFAULT_CONFIGURATION = Object.freeze({
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
});
