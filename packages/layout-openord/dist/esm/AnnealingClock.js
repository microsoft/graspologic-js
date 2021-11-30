function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AnnealingPhase } from './types';
/**
 * @internal
 *
 * A type of clock that uses simulated annealing through several phases
 */

export class AnnealingClock {
  // edge-cutting state
  // annealing state
  constructor(edgeCut = 0.8, schedule = {}) {
    _defineProperty(this, "_schedule", void 0);

    _defineProperty(this, "_phase", AnnealingPhase.Initial);

    _defineProperty(this, "_iteration", 0);

    _defineProperty(this, "_phaseIteration", 0);

    _defineProperty(this, "_targetIterations", void 0);

    _defineProperty(this, "_minEdges", void 0);

    _defineProperty(this, "_cutEnd", void 0);

    _defineProperty(this, "_cutLengthEnd", void 0);

    _defineProperty(this, "_cutLengthStart", void 0);

    _defineProperty(this, "_cutOffLength", void 0);

    _defineProperty(this, "_cutRate", void 0);

    _defineProperty(this, "_temperature", 0);

    _defineProperty(this, "_attraction", 0);

    _defineProperty(this, "_damping", 0);

    // establish the schedule
    this._schedule = _objectSpread(_objectSpread({}, DEFAULT_SCHEDULE), schedule);
    this._targetIterations = Object.values(this._schedule).map(v => v.iterations).reduce((prev, curr) => prev + curr, 0); // Taken from the python init_params method

    this._minEdges = 20.000001;
    this._cutEnd = 40000.0 * (1.0 - edgeCut);
    this._cutLengthEnd = this._cutEnd < 1 ? 1 : this._cutEnd;
    this._cutLengthStart = 4.0 * this._cutLengthEnd;
    this._cutOffLength = this._cutLengthStart;
    this._cutRate = (this._cutLengthStart - this._cutLengthEnd) / 400;
    this.schedulePhase(AnnealingPhase.Initial);
  }
  /**
   * Gets the current phase
   */


  get phase() {
    return this._phase;
  }
  /**
   * Determines if annealing is complete
   */


  get isComplete() {
    return this._phase === AnnealingPhase.Complete;
  }
  /**
   * Gets the current iteration
   */


  get iteration() {
    return this._iteration;
  }
  /**
   * Gets the current phase iteration
   */


  get phaseIteration() {
    return this._phaseIteration;
  }
  /**
   * Gets the target phase iterations
   */


  get targetPhaseIterations() {
    return this.phase != null ? this.schedule[this.phase].iterations : 0;
  }
  /**
   * Gets the target number of iterations
   */


  get targetIterations() {
    return this._targetIterations;
  }

  get attraction() {
    return this._attraction;
  }

  get temperature() {
    return this._temperature;
  }

  get damping() {
    return this._damping;
  }

  get minEdges() {
    return this._minEdges;
  }
  /**
   * Gets the annealing schedule
   */


  get schedule() {
    return this._schedule;
  }

  get cutEnd() {
    return this._cutEnd;
  }

  get cutOffLength() {
    return this._cutOffLength;
  }

  get neighborCutsEnabled() {
    switch (this.phase) {
      case AnnealingPhase.Liquid:
      case AnnealingPhase.Expansion:
      case AnnealingPhase.Cooldown:
      case AnnealingPhase.Crunch:
        return true;

      default:
        return false;
    }
  }
  /**
   * Runs an annealing iteration
   * @returns True if an iteration was run
   */


  tick() {
    if (this.isComplete) {
      return false;
    } else {
      this._iteration += 1;
      this._phaseIteration += 1;

      if (this.phaseIteration >= this.targetPhaseIterations) {
        this.handlePhaseComplete();
      } else {
        this.handlePhaseTick();
      }

      return true;
    }
  }
  /**
   * Handler for when a tick occurs
   */


  handlePhaseTick() {
    if (this.phase === AnnealingPhase.Expansion) {
      this._cutLengthEnd -= this._cutRate;

      if (this.attraction > 1.0) {
        this._attraction -= 0.05;
      }

      if (this.minEdges > 12.0) {
        this._minEdges -= 0.05;
      }

      if (this.damping > 0.1) {
        this._damping -= 0.005;
      }
    } else if (this.phase === AnnealingPhase.Cooldown) {
      if (this.temperature > 50.0) {
        this._temperature -= 10.0;
      }

      if (this._cutOffLength > this._cutLengthEnd) {
        this._cutOffLength -= this._cutRate * 2.0;
      }

      if (this.minEdges > 1.0) {
        this._minEdges -= 0.2;
      }
    }
  }
  /**
   * Handler for when a phase has completed
   */


  handlePhaseComplete() {
    this._phaseIteration = 0;

    if (this.phase === AnnealingPhase.Initial) {
      return this.schedulePhase(AnnealingPhase.Liquid);
    } else if (this.phase === AnnealingPhase.Liquid) {
      return this.schedulePhase(AnnealingPhase.Expansion);
    } else if (this.phase === AnnealingPhase.Expansion) {
      this._minEdges = 12.0000000001;
      return this.schedulePhase(AnnealingPhase.Cooldown);
    } else if (this.phase === AnnealingPhase.Cooldown) {
      this._minEdges = 1.0 + 0.00000000000001;
      this._cutOffLength = this._cutLengthEnd;
      return this.schedulePhase(AnnealingPhase.Crunch);
    } else if (this.phase === AnnealingPhase.Crunch) {
      // TODO REMOVE, this is functionally eliminated
      this._minEdges = 99.0;
      return this.schedulePhase(AnnealingPhase.Simmer);
    } else if (this.phase === AnnealingPhase.Simmer) {
      return this.schedulePhase(AnnealingPhase.Complete);
    }
  }
  /**
   * Schedules __phase__ to run on the next iteration
   * @param phase The phase to schedule
   */


  schedulePhase(phase) {
    var _this$schedule$phase;

    this._phase = phase;

    if (((_this$schedule$phase = this.schedule[phase]) === null || _this$schedule$phase === void 0 ? void 0 : _this$schedule$phase.iterations) > 0) {
      this._temperature = this.schedule[phase].temperature;
      this._attraction = this.schedule[phase].attraction;
      this._damping = this.schedule[phase].damping;
    } else {
      if (phase === AnnealingPhase.Initial) {
        this.schedulePhase(AnnealingPhase.Liquid);
      } else if (phase === AnnealingPhase.Liquid) {
        this.schedulePhase(AnnealingPhase.Expansion);
      } else if (phase === AnnealingPhase.Cooldown) {
        this.schedulePhase(AnnealingPhase.Crunch);
      } else if (phase === AnnealingPhase.Crunch) {
        this.schedulePhase(AnnealingPhase.Simmer);
      } else if (phase === AnnealingPhase.Simmer) {
        this._phase = AnnealingPhase.Complete;
      }
    }
  }

  get energyDistancePower() {
    switch (this.phase) {
      case AnnealingPhase.Liquid:
        return 4;

      case AnnealingPhase.Expansion:
        return 2;

      default:
        return 1;
    }
  }

  get useFineDensity() {
    return this.phase === AnnealingPhase.Simmer;
  }

}
/**
 * @internal
 *
 * The default schedule used during layout
 */

const DEFAULT_SCHEDULE = {
  [AnnealingPhase.Initial]: {
    iterations: 1,
    temperature: 2000,
    attraction: 10,
    damping: 1
  },
  [AnnealingPhase.Liquid]: {
    iterations: 200,
    temperature: 2000,
    attraction: 2,
    damping: 1
  },
  [AnnealingPhase.Expansion]: {
    iterations: 200,
    temperature: 2000,
    attraction: 10,
    damping: 1
  },
  [AnnealingPhase.Cooldown]: {
    iterations: 200,
    temperature: 2000,
    attraction: 1,
    damping: 0.1
  },
  [AnnealingPhase.Crunch]: {
    iterations: 50,
    temperature: 250,
    attraction: 1.0,
    damping: 0.25
  },
  [AnnealingPhase.Simmer]: {
    iterations: 100,
    temperature: 250,
    attraction: 0.5,
    damping: 0
  },
  [AnnealingPhase.Complete]: {
    iterations: 0,
    temperature: 0,
    attraction: 0,
    damping: 0
  }
};