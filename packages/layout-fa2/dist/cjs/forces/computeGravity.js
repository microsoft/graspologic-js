"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeGravity = computeGravity;

/**
 * @internal
 *
 * Computes the gravity component of the FA2 algorithm
 * @param nodes The set of node data
 * @param config The layout configuration
 * @returns The total gravity in the system
 */
function computeGravity(nodes, config) {
  const g = config.gravity / config.scalingRatio;
  const coefficient = config.scalingRatio;
  let node;
  let distance;
  let factor;
  let totalGravity = 0;

  for (node of nodes) {
    distance = Math.sqrt(node.x ** 2 + node.y ** 2);
    factor = 0;

    if (config.strongGravityMode) {
      // strong gravity
      if (distance > 0) {
        factor = coefficient * node.mass * g;
      }
    } else {
      // linear anti-collision repulsion
      if (distance > 0) {
        factor = coefficient * node.mass * g / distance;
      }
    }

    totalGravity += distance * factor; // Updating node's dx and dy

    node.dx -= node.x * factor;
    node.dy -= node.y * factor;
  }

  return totalGravity;
}