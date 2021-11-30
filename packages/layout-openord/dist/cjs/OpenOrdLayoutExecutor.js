"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenOrdLayoutExecutor = void 0;

var _jumps = require("./jumps");

var _sampleBitmap = require("./sampleBitmap");

var _types = require("./types");

var _graph = require("@graspologic/graph");

var _layoutCore = require("@graspologic/layout-core");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * A layout executor which will run the OpenOrd layout on a graph
 */
class OpenOrdLayoutExecutor extends _layoutCore.BaseExecutor {
  /**
   * Constructor for the OpenOrdLayoutExecutor
   * @param graph The graph to layout
   * @param configuration The configuration for the algorithm
   * @param clock The annealing clock which controls how long phases are run
   * @param globalObject The global object
   * @param densityGrid The node density grid
   */
  constructor(graph, configuration, clock, globalObject, densityGrid) {
    super(graph, configuration, clock, globalObject);

    _defineProperty(this, "_densityGrid", void 0);

    this._densityGrid = densityGrid; // Randomize the graph layout if it's zeroed out

    let isZeroed = true;
    let node; // Randomize the graph layout if it's zeroed out

    for (node of this.graph.nodes) {
      if (node.x !== 0 || node.y !== 0) {
        isZeroed = false;
        break;
      }
    }

    if (isZeroed) {
      this.globalObject.console.log('randomizing layouts');

      for (node of this.graph.nodes) {
        node.x = (0, _graph.randBetween)(0, 1024);
        node.y = (0, _graph.randBetween)(0, 1024);
      }
    }

    this.initializeDensityGrid();
  }
  /**
   * Gets the name of the layout algorithm
   */


  getName() {
    return 'OpenOrd';
  }
  /**
   * Gets the density grid
   */


  get densityGrid() {
    return this._densityGrid;
  }
  /**
   * Gets the default configuration
   */


  get defaultConfiguration() {
    return _types.DEFAULT_CONFIGURATION;
  }
  /**
   * Constructs the tick progress object
   */


  getProgress() {
    const {
      phase,
      iteration,
      phaseIteration,
      targetPhaseIterations,
      targetIterations
    } = this.clock;
    const {
      emitDensitySnapshots,
      densitySnapshotSamplingRate,
      densitySnapshotEmitRate,
      emitEnergy,
      emitObjectiveEnergy
    } = this.configuration;
    const result = {
      clock: {
        phase,
        iteration,
        phaseIteration,
        targetIterations,
        targetPhaseIterations
      },
      densityGrid: {},
      metrics: {}
    };

    if (emitDensitySnapshots) {
      if (densitySnapshotEmitRate == null || this.clock.iteration % densitySnapshotEmitRate === 0) {
        result.densityGrid.bitmap = (0, _sampleBitmap.sampleBitmap)(this.densityGrid, densitySnapshotSamplingRate);
      }
    }

    if (emitEnergy) {
      const energy = this.energy;
      result.metrics.energy = energy;
    }

    if (emitObjectiveEnergy) {
      const [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy] = this.objectiveEnergy;
      result.metrics.objectiveEnergy = objectiveEnergy;
      result.metrics.attractiveEnergy = attractiveEnergy;
      result.metrics.repulsiveEnergy = repulsiveEnergy;
      result.metrics.overlapEnergy = overlapEnergy;
    }

    return result;
  }
  /**
   * Performs a single unit of work
   */


  performUnitOfWork() {
    if (this.configuration.iterativeForceModel) {
      this.performIterativeUnitOfWork();
    } else {
      this.performConcurrentUnitOfWork();
    }
  }
  /**
   * Initializes the internal density grid
   */


  initializeDensityGrid() {
    let node;

    for (node of this.graph.nodes) {
      this.densityGrid.add(node);
    }
  }
  /**
   * perform the unit of work (layout step) with a concurrent force model - updates are applied after they have all been computed
   */


  performConcurrentUnitOfWork() {
    let node;

    for (node of this.graph.nodes) {
      const update = this.computeNodeUpdate(node);
      this.applyUpdate(update);
    }
  }
  /**
   * perform the unit of work (layout step) with a iterative force model - updates are applied in series
   */


  performIterativeUnitOfWork() {
    let update;

    for (update of this.computeIterativeUpdates()) {
      this.applyUpdate(update);
    }
  }
  /**
   * This is a generator so that we can either resolve the updates iteratively using
   * a stochastic gradient descent method, or all at the same time using a force modeling
   * approach
   * @returns The updates for each of the nodes
   */


  *computeIterativeUpdates() {
    let node;

    for (node of this.graph.nodes) {
      yield this.computeNodeUpdate(node);
    }
  }

  computeNodeUpdate(node) {
    const [centroidJump, centroidEdgeCut] = this.computeCentroidJump(node);
    const centroidJumpEnergy = this.computeNodePosEnergy(node, centroidJump);
    const jumpScale = 0.01 * this.clock.temperature;
    const randJumpPosition = (0, _jumps.jumpRandom)(centroidJump, jumpScale);
    const randJumpEnergy = this.computeNodePosEnergy(node, randJumpPosition);

    if (randJumpEnergy < centroidJumpEnergy) {
      return {
        node,
        kind: _types.NodeUpdateKind.RandomJump,
        position: randJumpPosition,
        energy: randJumpEnergy
      };
    } else {
      return {
        node,
        kind: _types.NodeUpdateKind.CentroidJump,
        position: centroidJump,
        energy: centroidJumpEnergy,
        prunedEdge: centroidEdgeCut
      };
    }
  }

  computeNodePosEnergy(node, position) {
    const attractive = this.nodeAttractiveForce(node, position);
    const repulsive = this.nodeRepulsiveForce(node, position);
    return attractive + repulsive;
  }

  nodeAttractiveForce(node, position) {
    //const attractionFactor = this.clock.attraction ** 4 * 2e-2
    const energyDistancePower = this.clock.energyDistancePower;
    let sum = 0.0;
    let neighborId;
    let neighbor;
    let weight;

    for (neighborId of this.graph.getNeighbors(node.storeId)) {
      neighbor = this.graph.nodes.itemAt(neighborId);
      weight = this.graph.getEdgeWeight(node.storeId, neighborId);

      if (weight != null) {
        const energyDistance = (0, _graph.squareDistanceTo)(position, neighbor) ** energyDistancePower;
        const neighborEnergy = weight * energyDistance; // * attractionFactor

        sum += neighborEnergy;
      }
    }

    return sum;
  }

  nodeRepulsiveForce(node, position) {
    return this.densityGrid.getDensity(node, position, this.clock.useFineDensity);
  }

  computeCentroidJump(node) {
    const isNeighborCutRequired = () => {
      // TODO: This turns on when users set the edge cut manually. It doesn't fire with the default
      // value of 0.8. Is this even useful?
      const cutEndActive = this.clock.cutEnd < 39500.9;

      const numNeighborsExceedsMin = () => {
        const numNeighbors = this.graph.getNeighbors(node.storeId).length;
        return numNeighbors > this.clock.minEdges;
      };

      return this.clock.neighborCutsEnabled && cutEndActive && numNeighborsExceedsMin();
    };

    const centroidPos = this.graph.getNeighborhoodCentroid(node.storeId);
    const jumpPos = (0, _jumps.jumpTowards)(node, centroidPos, this.clock.damping);
    const jumpDist = (0, _graph.squareDistanceTo)(centroidPos, jumpPos);
    const prunedEdge = jumpDist > 0 && isNeighborCutRequired() ? this.getEdgeToCut(node, centroidPos) : undefined;
    return [jumpPos, prunedEdge];
  }

  getEdgeToCut(node, centroidPos) {
    const neighbors = this.graph.getNeighbors(node.storeId);
    const squareConnections = Math.sqrt(neighbors.length);
    let maxDistance = 0.0;
    let maxNeighbor;
    neighbors.forEach(neighborId => {
      const neighbor = this.graph.nodes.itemAt(neighborId);
      const distance = (0, _graph.squareDistanceTo)(centroidPos, neighbor) * squareConnections;

      if (distance > maxDistance && distance > this.clock.cutOffLength) {
        maxDistance = distance;
        maxNeighbor = neighborId;
      }
    });
    return maxNeighbor;
  }

  applyUpdate({
    node,
    position,
    prunedEdge
  }) {
    if (this.densityGrid.contains(node)) {
      this.densityGrid.subtract(node);
    } // Move node position


    node.x = position.x;
    node.y = position.y;

    if (prunedEdge) {
      this.graph.pruneEdge(node.storeId, prunedEdge);
    }

    this.densityGrid.add(node);
  }
  /**
   * Gets the working energy. This differs from the objective energy in that we cull low-weight edges as the
   * algorithm progresses. The objective energy keep these in tact.
   */


  get energy() {
    let result = 0;
    let node;

    for (node of this.graph.nodes) {
      result += this.computeNodePosEnergy(node, node);
    }

    return result;
  }
  /**
   * Gets the objective energy according to Equation 1 of the OpenOrd Paper
   *
   * https://www.researchgate.net/publication/253087985_OpenOrd_An_Open-Source_Toolbox_for_Large_Graph_Layout
   */


  get objectiveEnergy() {
    let attractiveEnergy = 0;
    let repulsiveEnergy = 0;
    let overlapEnergy = 0.001;
    let node;
    let neighbor;

    for (node of this.graph.nodes) {
      repulsiveEnergy += this.densityGrid.getDensity(node, node, false);

      if (this.clock.phase && this.clock.phase > _types.AnnealingPhase.Liquid) {
        overlapEnergy += this.densityGrid.getOverlap(node, node);
      }

      for (neighbor of this.graph.getNeighborsObjective(node.storeId).map(nid => this.graph.nodes.itemAt(nid))) {
        const distance = (0, _graph.squareDistanceTo)(node, neighbor);
        const weight = this.graph.getEdgeWeightObjective(node.storeId, neighbor.storeId);
        attractiveEnergy += distance * weight;
      }
    }

    const objectiveEnergy = attractiveEnergy + repulsiveEnergy;
    return [objectiveEnergy, attractiveEnergy, repulsiveEnergy, overlapEnergy];
  }

}

exports.OpenOrdLayoutExecutor = OpenOrdLayoutExecutor;