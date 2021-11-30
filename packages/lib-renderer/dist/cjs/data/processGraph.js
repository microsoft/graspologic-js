"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processGraph = processGraph;

var _colorizeRenderer = require("../util/colorizeRenderer");

/**
 * @internal
 *
 * Processes the graph contained in __data__ by normalizing weights, and assigning colors using __colorizerFn__
 * @param data The graph data
 * @param colorizerFn The colorizer
 */
function processGraph(data, colorizerFn) {
  const colorizer = (0, _colorizeRenderer.createBGRAColorizer)(colorizerFn);

  if (data.nodes.count === 0) {
    return;
  }

  const [minWeight, maxWeight] = colorizeNodes(data, colorizer);
  normalizeNodeWeights(data, minWeight, maxWeight);
  normalizeEdgeWeights(data);
}
/**
 * Colorizes the nodes in __data__ using the __colorizer__ function
 * @param data The graph data
 * @param colorizer The colorizer function
 */


function colorizeNodes(data, colorizer) {
  let maxWeight = Number.MIN_SAFE_INTEGER;
  let minWeight = Number.MAX_SAFE_INTEGER;
  let node;

  for (node of data.nodes.scan()) {
    node.color = (0, _colorizeRenderer.correctColor)(node.color || colorizer(node.id, node.group));
    maxWeight = Math.max(maxWeight, node.weight);
    minWeight = Math.min(minWeight, node.weight);
  }

  return [minWeight, maxWeight];
}
/**
 * Normalizes the nodes weights using the __minWeight__ and __maxWeight__
 * @param data The graph data
 * @param minWeight The min weight for the nodes
 * @param maxWeight The max weight for the nodes
 */


function normalizeNodeWeights(data, minWeight, maxWeight) {
  const nodeWeightDiff = maxWeight - minWeight;
  let computeNodeWeight;

  if (nodeWeightDiff === 0 || isNaN(nodeWeightDiff)) {
    computeNodeWeight = () => 0.5;
  } else {
    const minNodeWeight = minWeight;

    computeNodeWeight = value => (value - minNodeWeight) / nodeWeightDiff;
  }

  let node;

  for (node of data.nodes.scan()) {
    node.weight = computeNodeWeight(node.weight || 0);
  }
}
/**
 * Normalizes the edge weights using the __minWeight__ and __maxWeight__
 * @param data The graph data
 * @param minWeight The min weight for the edges
 * @param maxWeight The max weight for the edges
 */


function normalizeEdgeWeights(data) {
  let edge;
  let maxWeight = Number.MIN_SAFE_INTEGER;
  let minWeight = Number.MAX_SAFE_INTEGER;

  for (edge of data.edges.scan()) {
    maxWeight = Math.max(maxWeight, edge.weight);
    minWeight = Math.min(minWeight, edge.weight);
  }

  const edgeWeightDiff = maxWeight - minWeight;
  let computeEdgeWeight;

  if (edgeWeightDiff === 0) {
    computeEdgeWeight = () => 0.5;
  } else {
    const minEdgeWeight = minWeight;

    computeEdgeWeight = value => (value - minEdgeWeight) / edgeWeightDiff;
  } // We're not too worried about this right yet


  const reusableNode = data.nodes.itemAt(0);

  for (edge of data.edges.scan()) {
    edge.trueWeight = edge.weight || 0;
    edge.weight = computeEdgeWeight(edge.weight === undefined ? 1 : edge.weight); // Update the node to the source idx

    reusableNode.connect(edge.sourceIndex, data.nodes);
    edge.color = (0, _colorizeRenderer.correctColor)(edge.color || reusableNode.color || 0);
    edge.sourcePosition = reusableNode.position; // Update the node to the target idx

    reusableNode.connect(edge.targetIndex, data.nodes);
    edge.color2 = (0, _colorizeRenderer.correctColor)(edge.color2 || edge.color || reusableNode.color || 0);
    edge.targetPosition = reusableNode.position;
  }
}