"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeRepulsion = computeRepulsion;

var _computeRepulsionBarnesHut = require("./computeRepulsionBarnesHut");

var _computeRepulsionUnoptimized = require("./computeRepulsionUnoptimized");

/**
 * @internal
 *
 * Computes graph repulsion
 * @param nodes The set of nodes
 * @param config The force atlas 2 configuration
 * @returns The amount of repulsion in the graph
 */
function computeRepulsion(nodes, config) {
  return config.barnesHutOptimize ? (0, _computeRepulsionBarnesHut.computeRepulsionBarnesHut)(nodes, config) : (0, _computeRepulsionUnoptimized.computeRepulsionUnoptimized)(nodes, config);
}