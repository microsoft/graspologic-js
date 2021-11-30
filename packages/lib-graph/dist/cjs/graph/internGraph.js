"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_INTERN_GRAPH_OPTIONS = void 0;
exports.internGraph = internGraph;

var _helpers = require("../helpers");

var _primitives = require("../primitives");

var _GraphContainer = require("./GraphContainer");

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const DEFAULT_INTERN_GRAPH_OPTIONS = Object.freeze({
  defaultEdgeWeight: 1,
  shareable: true
});
/**
 * @internal
 *
 * Interns a raw graph into a GraphContainer, used by graspologic
 * @param input A raw input graph
 * @param options: internization options
 * @returns The GraphContainer
 */

exports.DEFAULT_INTERN_GRAPH_OPTIONS = DEFAULT_INTERN_GRAPH_OPTIONS;

function internGraph(input, {
  shareable = DEFAULT_INTERN_GRAPH_OPTIONS.shareable,
  randomize,
  defaultEdgeWeight = DEFAULT_INTERN_GRAPH_OPTIONS.defaultEdgeWeight
} = DEFAULT_INTERN_GRAPH_OPTIONS) {
  const graph = getEmptyGraphContainer(input.nodes.length, input.edges.length, shareable);
  let i = 0;
  const nodeIdToIndex = new Map();

  if (input.nodes.length > 0) {
    let node;
    let inputNode;
    i = 0;

    for (node of graph.nodes.scan()) {
      if (i >= input.nodes.length) {
        break;
      }

      inputNode = input.nodes[i];

      if (input.edges.length > 0) {
        nodeIdToIndex.set(inputNode.id, i);
      }

      node.connect(i, graph.nodes);
      node.load(inputNode);

      if (randomize && node.x === 0 && node.y === 0) {
        node.x = (0, _helpers.randBetween)(randomize[0], randomize[1]);
        node.y = (0, _helpers.randBetween)(randomize[2], randomize[3]);
      }

      ++i;
    }
  }

  if (input.edges.length > 0) {
    let edge;
    i = 0;

    for (edge of graph.edges.scan()) {
      if (i >= input.edges.length) {
        break;
      }

      edge.connect(i, graph.edges);
      edge.load(input.edges[i], nodeIdToIndex, defaultEdgeWeight);
      ++i;
    }
  }

  return graph;
}
/**
 * Creates an empty graph container
 * @param numNodes The number of nodes to preallocate
 * @param numEdges The number of edges to preallocate
 * @param shareable Whether to use shared-memory
 * @returns An empty graph container
 */


function getEmptyGraphContainer(numNodes, numEdges, shareable = true) {
  return new _GraphContainer.GraphContainer((0, _primitives.createNodeStore)({
    capacity: numNodes,
    shared: shareable,
    allocatedOnCreate: true
  }), (0, _primitives.createEdgeStore)({
    capacity: numEdges,
    shared: shareable,
    allocatedOnCreate: true
  }));
}