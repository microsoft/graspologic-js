"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphContainer = void 0;

var _primitives = require("../primitives");

var _measure = require("../space/measure");

var _internGraph = require("./internGraph");

var _populateAdjacency = require("./populateAdjacency");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The datastructure which contains all the internal graph data required for the GraphRenderer
 */
class GraphContainer {
  // #region adjacency maps
  // #endregion

  /**
   * @internal
   * Constructs a new instance of the GraphContainer
   * @param nodes The initial node data store
   * @param edges The initial edge data store
   */
  constructor(nodes, edges) {
    _defineProperty(this, "_nodes", void 0);

    _defineProperty(this, "_edges", void 0);

    _defineProperty(this, "_originalAdjacency", void 0);

    _defineProperty(this, "_adjacency", void 0);

    this._nodes = nodes;
    this._edges = edges;
  }
  /**
   * @internal
   * Gets the underlying node store
   */


  get nodes() {
    return this._nodes;
  }
  /**
   * @internal
   * Gets the underlying edge store
   */


  get edges() {
    return this._edges;
  }
  /**
   * Creates an instance of the GraphContainer using the given input graph
   * @param inputGraph The pojo graph to intern
   * @param options The set of options controlling how the graph is interned, defaults to @see {@link DEFAULT_INTERN_GRAPH_OPTIONS}
   * @returns The GraphContainer
   */


  static intern(inputGraph, options = _internGraph.DEFAULT_INTERN_GRAPH_OPTIONS) {
    return (0, _internGraph.internGraph)(inputGraph, options);
  }
  /**
   * @internal
   * Serializes the GraphContainer instance
   * @returns The serialized version of the GraphContainer
   */


  serialize() {
    return {
      nodes: this.nodes.store.buffer,
      edges: this.edges.store.buffer
    };
  }
  /**
   * @internal
   * Deserializes the GraphContainer instance
   * @param graph The serialized version of the GraphContainer
   * @returns The deserialized GraphContainer
   */


  static deserialize(graph) {
    const nodeStore = (0, _primitives.createNodeStore)({
      buffer: graph.nodes,
      allocatedOnCreate: true
    });
    const edgeStore = (0, _primitives.createEdgeStore)({
      buffer: graph.edges,
      allocatedOnCreate: true
    });
    return new GraphContainer(nodeStore, edgeStore);
  }
  /**
   * @internal
   * Retrieve neigbors of the given node. This may be reflect edge-cutting
   * performed by the algorithm
   * @param n The node index to retrieve neighbors for
   * @returns A list of neighbor node indices
   */


  getNeighbors(n) {
    const result = this.getAdjacencyMap(false).get(n);
    return result ? Object.keys(result).map(k => parseInt(k, 10)) : [];
  }
  /**
   * @internal
   * Retrieve neigbors of the given node. This will not reflect any edge-cutting
   * performed by the algorithm
   * @param n The node index to retrieve neighbors for
   * @returns A list of neighbor node indices
   */


  getNeighborsObjective(id) {
    const result = this.getAdjacencyMap(true).get(id);

    if (!result) {
      throw new Error(`could not get adjacency for node ${id}`);
    }

    return Object.keys(result).map(k => parseInt(k, 10));
  }
  /**
   * @internal
   * Gets the edge weight between two nodes, which may reflect edge-cutting.
   * @throws if source and target are not connected
   * @param source The source node index
   * @param target The target node index
   * @returns The edge weight
   */


  getEdgeWeight(source, target) {
    const result = this.getAdjacencyMap(false).get(source);

    if (!result) {
      throw new Error(`could not get adjacency for node ${source}`);
    }

    return result[target];
  }
  /**
   * @internal
   * Gets the edge weight between two nodes, ignoring reflect edge-cutting
   * @throws if source and target are not connected
   * @param source The source node index
   * @param target The target node index
   * @returns The edge weight
   */


  getEdgeWeightObjective(source, target) {
    const result = this.getAdjacencyMap(true).get(source);

    if (!result) {
      throw new Error(`could not get objective adjacency for node ${source}`);
    }

    return result[target];
  }
  /**
   * @internal
   * Returns the computed cetroid of the neighborhood that the given node is a part of
   * @param n The node to get the neighborhood centroid for
   * @returns The centroid
   */


  getNeighborhoodCentroid(n) {
    const neighbors = this.getNeighbors(n);
    const node = this.nodes.itemAt(n);

    if (!node) {
      throw new Error('could not get node ' + n);
    } else if (neighbors.length === 0) {
      return {
        x: node.x,
        y: node.y
      };
    } else {
      const neighborPositions = [node];
      const neighborWeights = [1];
      neighbors.forEach(nid => {
        const neighbor = this.nodes.itemAt(nid);
        const edgeWeight = this.getEdgeWeight(n, nid);
        neighborPositions.push(neighbor);
        neighborWeights.push(edgeWeight);
      });
      const result = (0, _measure.weightedCentroid)(neighborPositions, neighborWeights);
      return result;
    }
  }
  /**
   * @internal
   * Prunes an edge
   * @param from The source node
   * @param to The target node
   */


  pruneEdge(from, to) {
    const fromList = this.getAdjacencyMap(false).get(from);
    const toList = this.getAdjacencyMap(false).get(to);

    if (!fromList || !toList) {
      throw new Error(`could not get edge for (${from}, ${to})`);
    }

    delete fromList[to];
    delete toList[from];
  }
  /**
   * @internal
   * Gets an adjacency map
   * @param original If the original adjacency map is required
   * @returns The adjacency map
   */


  getAdjacencyMap(original) {
    if (!this._originalAdjacency) {
      this._originalAdjacency = (0, _populateAdjacency.populateAdjacency)(this.nodes, this.edges);
    }

    if (!this._adjacency && !original) {
      this._adjacency = (0, _populateAdjacency.populateAdjacency)(this.nodes, this.edges);
    }

    return original ? this._originalAdjacency : this._adjacency;
  }

}

exports.GraphContainer = GraphContainer;