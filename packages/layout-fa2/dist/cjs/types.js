"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CONFIGURATION = void 0;

/**
 * @internal
 *
 * The default configuration object for the FA2 algorithm
 */
const DEFAULT_CONFIGURATION = Object.freeze({
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
  targetIterations: 100
});
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;