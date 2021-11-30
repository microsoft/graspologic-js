"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseExecutor = void 0;

var _common = require("@graspologic/common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * Base class for layout executors
 */
class BaseExecutor extends _common.EventEmitter {
  /**
   * Constructor for the base executor
   * @param graph The graph to run the layout on
   * @param config The configuration for the layout
   * @param clock The clock which is used to indicate when a layout cycle has occurred
   * @param globalObject The "global" object environment
   */
  constructor(graph, config, clock, globalObject) {
    super();

    _defineProperty(this, "_graph", void 0);

    _defineProperty(this, "_halted", false);

    _defineProperty(this, "_complete", false);

    _defineProperty(this, "_global", void 0);

    _defineProperty(this, "_configuration", void 0);

    _defineProperty(this, "_tickListener", void 0);

    _defineProperty(this, "_clock", void 0);

    this._clock = clock;
    this._graph = graph;
    this._global = globalObject;
    this._configuration = config;
    this.executeStep = this.executeStep.bind(this);
    globalObject.console.log(`create new ${this.getName()} instance`, this._configuration);
  }
  /**
   * Halts the layout process
   */


  halt() {
    this._halted = true;
  }
  /**
   * Returns true if the layout is halted
   */


  get isHalted() {
    return this._halted;
  }
  /**
   * Returns true if the layout is completed
   */


  get isComplete() {
    return this._complete;
  }
  /**
   * Gets the current clock
   */


  get clock() {
    return this._clock;
  }
  /**
   * Gets the current graph
   */


  get graph() {
    return this._graph;
  }
  /**
   * Gets the current global object
   */


  get globalObject() {
    return this._global;
  }
  /**
   * Gets the current configuration
   */


  get configuration() {
    return this._configuration;
  }
  /**
   * Configures the executor
   * @param config The layout config
   */


  configure(config) {
    this._configuration = _objectSpread(_objectSpread({}, this.defaultConfiguration), config);
  }
  /**
   * Executes the layout process
   */


  execute() {
    this._global.console.log(`execute ${this.getName()}, %s nodes, %s edges`, this.graph.nodes.count, this.graph.edges.count);

    this._halted = false;
    this._complete = false;
    this.clearTickListener();
    return new Promise(resolve => {
      this.executeStep();
      this._tickListener = this.on('tick', () => {
        if (this._complete) {
          resolve(this.getProgress());
          this.clearTickListener();
        }
      });
    });
  }
  /**
   * Clears the tick listener
   */


  clearTickListener() {
    if (this._tickListener) {
      this._tickListener();

      this._tickListener = undefined;
    }
  }
  /**
   * Executes one step of the layout algorithm
   */


  executeStep() {
    this.performUnitOfWork(); // Advance the annealing clock

    const ticking = this._clock.tick();

    if (!ticking) {
      this._complete = true;
    } // Perform the next layout step on the event queue


    if (ticking && !this._halted) {
      this._global.setTimeout(this.executeStep, 0);
    } // Emit the tick event


    this.emit('tick', this.getProgress());
  }

}

exports.BaseExecutor = BaseExecutor;