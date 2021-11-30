import { computeNodeRepulsion } from './computeNodeRepulsion';
/**
 * @internal
 *
 * O(n^2) repulsion - check force against all nodes
 * @params The node data
 * @params The layout configuration
 * @returns The computed repulsion
 */

export function computeRepulsionUnoptimized(nodes, config) {
  // O(n^2) iteration
  let nid1;
  let nid2;

  for (nid1 = 0; nid1 < nodes.count; ++nid1) {
    for (nid2 = 0; nid2 < nid1; ++nid2) {
      computeNodeRepulsion(nodes.itemAt(nid1), nodes.itemAt(nid2), config);
    }
  }

  return 0;
}