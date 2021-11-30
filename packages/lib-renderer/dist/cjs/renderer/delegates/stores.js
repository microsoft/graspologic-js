"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDataStore = createDataStore;
exports.createDataStoreFromContainer = createDataStoreFromContainer;

var _TypeStore = require("./TypeStore");

var _graph = require("@graspologic/graph");

/**
 * Constructs a generic data store with node and edge stores
 * @param nodeCountHint The number of nodes
 * @param edgeCountHint The number of edges
 * @param animation If the stores should emit update animation
 * @returns A datastore containing node and edge stores
 */
function createDataStore(nodeCountHint, edgeCountHint, animation = true) {
  const result = new _TypeStore.GenericTypeStore();
  const nodeStore = (0, _graph.createNodeStore)({
    capacity: nodeCountHint,
    animation
  });
  const edgeStore = (0, _graph.createEdgeStore)({
    capacity: edgeCountHint,
    animation
  });
  result.register(_graph.nodeType, nodeStore);
  result.register(_graph.edgeType, edgeStore);
  return result;
}
/**
 * Constructs a generic data store with node and edge stores
 * @param container The graph container to use
 * @returns A datastore containing node and edge stores
 */


function createDataStoreFromContainer(container) {
  const result = new _TypeStore.GenericTypeStore();
  result.register(_graph.nodeType, container.nodes);
  result.register(_graph.edgeType, container.edges);
  return result;
}