import { computeRepulsionBarnesHut } from './computeRepulsionBarnesHut';
import { computeRepulsionUnoptimized } from './computeRepulsionUnoptimized';
/**
 * @internal
 *
 * Computes graph repulsion
 * @param nodes The set of nodes
 * @param config The force atlas 2 configuration
 * @returns The amount of repulsion in the graph
 */

export function computeRepulsion(nodes, config) {
  return config.barnesHutOptimize ? computeRepulsionBarnesHut(nodes, config) : computeRepulsionUnoptimized(nodes, config);
}