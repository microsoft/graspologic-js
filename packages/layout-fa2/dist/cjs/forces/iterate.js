"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

var _applyForces = require("./applyForces");

var _computeAttraction = require("./computeAttraction");

var _computeGravity = require("./computeGravity");

var _computeRepulsion = require("./computeRepulsion");

/**
 * @internal
 *
 * Runs a single iteration of the FA2 algorithm
 * @param nodes The node data
 * @param edges The edge data
 * @param config The layout configuration
 *
 * @returns The applied forces
 */
function iterate(nodes, edges, config) {
  resetDeltas(nodes); // Compute Forces

  const repulseStart = performance.now();
  const repulsion = (0, _computeRepulsion.computeRepulsion)(nodes, config);
  const repulseEnd = performance.now();
  const gravity = (0, _computeGravity.computeGravity)(nodes, config);
  const gravityEnd = performance.now();
  const attraction = (0, _computeAttraction.computeAttraction)(nodes, edges, config);
  const attractionEnd = performance.now();
  console.log('perf - repulsion=%s, gravity=%s, attraction=%s', repulseEnd - repulseStart, gravityEnd - repulseEnd, attractionEnd - gravityEnd);
  return (0, _applyForces.applyForces)(nodes, config, repulsion, gravity, attraction);
}
/**
 * Resets the delta properties on all the nodes
 * @param nodes The node data to reset the deltas on
 */


function resetDeltas(nodes) {
  let node;

  for (node of nodes) {
    node.dx = 0;
    node.dy = 0;
  }
}