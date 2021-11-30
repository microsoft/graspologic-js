"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateAdjacency = populateAdjacency;

/**
 * @internal
 * Populates an adjacency map
 * @param nodes the nodes data
 * @param edges the edges data
 * @returns An adjacency map
 */
function populateAdjacency(nodes, edges) {
  const adj = new Map();
  let node;

  for (node of nodes) {
    adj.set(node.storeId, {});
  } // Load the adjacency matrix


  let maxWeight = 0.000001;
  let sourceList;
  let targetList;
  let edge;

  for (edge of edges) {
    const {
      sourceIndex,
      targetIndex,
      weight
    } = edge;
    sourceList = adj.get(sourceIndex);
    targetList = adj.get(targetIndex);

    if (weight > maxWeight) {
      maxWeight = weight;
    }

    sourceList[targetIndex] = weight;
    targetList[sourceIndex] = weight;
  } // Nomalize the edge weights


  let value;
  let key;

  for (value of adj.values()) {
    for (key of Object.keys(value)) {
      value[parseInt(key, 10)] /= maxWeight;
    }
  }

  return adj;
}