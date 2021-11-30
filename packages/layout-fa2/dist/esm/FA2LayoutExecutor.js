function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { iterate } from './forces';
import { DEFAULT_CONFIGURATION } from './types';
import { randBetween } from '@graspologic/graph';
import { BaseExecutor } from '@graspologic/layout-core';
/**
 * @internal
 *
 * The layout executor which applies the ForceAtlas2 layout algorithm
 */

export class FA2LayoutExecutor extends BaseExecutor {
  /**
   * Constructor for the fa2 layout executor
   * @param graph The graph to run the layout on
   * @param config The configuration for the layout
   * @param clock The clock which is used to indicate when a layout cycle has occurred
   * @param globalObject The "global" object environment
   */
  constructor(graph, configuration, clock, globalObject) {
    super(graph, configuration, clock, globalObject);

    _defineProperty(this, "_metrics", [0, 0, 0, 0, 0, 0]);

    this.checkforRandomization();
    this.computeMass();
  }
  /**
   * Gets the name of the layout
   */


  getName() {
    return 'ForceAtlas2';
  }
  /**
   * Gets the default layout configuration
   */


  get defaultConfiguration() {
    return DEFAULT_CONFIGURATION;
  }
  /**
   * Performs one iteration of the ForceAtlas2 algorithm
   */


  performUnitOfWork() {
    try {
      this._metrics = iterate(this.graph.nodes, this.graph.edges, this.configuration);
    } catch (err) {
      this.globalObject.console.log('caught error', err);
      throw err;
    }
  }
  /**
   * Returns the current progress of the layout algorithm
   */


  getProgress() {
    return {
      clock: {
        iteration: this.clock.currentTicks,
        targetIterations: this.clock.targetTicks
      },
      metrics: {
        tension: this._metrics[0],
        swing: this._metrics[1],
        traction: this._metrics[2]
      }
    };
  }
  /**
   * Checks if the graph is setup for randomization
   */


  checkforRandomization() {
    let node;
    let isZeroed = true; // Randomize the graph layout if it's zeroed out

    for (node of this.graph.nodes) {
      if (node.x !== 0 || node.y !== 0) {
        isZeroed = false;
        break;
      }
    }

    if (isZeroed) {
      this.globalObject.console.log('randomizing layouts');

      for (node of this.graph.nodes) {
        node.x = randBetween(0, 1024);
        node.y = randBetween(0, 1024);
      }
    }
  }
  /**
   * Computes the mass of the graph
   */


  computeMass() {
    let node;

    for (node of this.graph.nodes) {
      node.mass = 1;
    }

    let edge;

    for (edge of this.graph.edges) {
      this.graph.nodes.itemAt(edge.sourceIndex).mass += 1;
      this.graph.nodes.itemAt(edge.targetIndex).mass += 1;
    }
  }

}