"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scenegraph = void 0;

var _gltools = require("@luma.gl/gltools");

var _graph = require("@graspologic/graph");

var _renderablesSupport = require("@graspologic/renderables-support");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * Scenegraph for graph rendering. This contains responsibility for owning, mutating, and
 * rendering the set of renderables and primitives which compose the graph view.
 */
class Scenegraph {
  // Cache these for quick lookup

  /**
   * Constructor for the SceneGraph
   * @param gl The gl context
   * @param config The render configuration
   * @param camera The camera
   * @param data The data manager
   */
  constructor(gl, config, data) {
    _defineProperty(this, "gl", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "destroyed", false);

    _defineProperty(this, "doubleBufferedRenderables", void 0);

    _defineProperty(this, "_renderables", []);

    _defineProperty(this, "edgeData", void 0);

    _defineProperty(this, "nodeData", void 0);

    _defineProperty(this, "rebuildSaturation", () => {
      const nodes = this.config.nodeFilteredIds;
      const allIn = !nodes || nodes.length === 0 || nodes.length === this.nodeData.count;
      const nodeInSat = this.config.nodeFilteredInSaturation;
      const nodeOutSat = this.config.nodeFilteredOutSaturation;
      const edgeInSat = this.config.edgeFilteredInSaturation;
      const edgeOutSat = this.config.edgeFilteredOutSaturation; // IMPORTANT: the (prim as <type>) stuff avoids an extra `const node = prim as Node` call
      // Performance shortcut for everything in / out

      if (allIn) {
        for (const prim of this.primitives(undefined, true)) {
          if (prim.type === _graph.nodeType) {
            ;
            prim.saturation = nodeInSat;
          } else if (prim.type === _graph.edgeType) {
            ;
            prim.saturation = edgeInSat;
            prim.saturation2 = edgeInSat;
          }
        }
      } else {
        const nodeMap = (nodes || []).reduce((prev, curr) => {
          prev[curr] = true;
          return prev;
        }, {});

        for (const prim of this.primitives(undefined, true)) {
          if (prim.type === _graph.nodeType) {
            ;
            prim.saturation = nodeMap[prim.id || ''] ? nodeInSat : nodeOutSat;
          } else if (prim.type === _graph.edgeType) {
            ;
            prim.saturation = !!nodeMap[prim.source] ? edgeInSat : edgeOutSat;
            prim.saturation2 = !!nodeMap[prim.target] ? edgeInSat : edgeOutSat;
          }
        }
      }
    });

    _defineProperty(this, "handleStoreUpdated", (type, store) => {
      if (type === _graph.nodeType) {
        this.nodeData = store;
      } else {
        this.edgeData = store;
      }
    });

    this.gl = gl;
    this.config = config;
    this.data = data;
    this.doubleBufferedRenderables = new _renderablesSupport.ScreenQuadRenderable(gl);
    config.onBackgroundColorChanged(() => this.initialize({
      gl: this.gl
    }));
    data.onRegister(this.handleStoreUpdated);
    this.handleStoreUpdated(_graph.edgeType, data.retrieve(_graph.edgeType));
    this.handleStoreUpdated(_graph.nodeType, data.retrieve(_graph.nodeType));
    config.onNodeFilteredIdsChanged(this.rebuildSaturation);
    config.onNodeFilteredInSaturationChanged(this.rebuildSaturation);
    config.onNodeFilteredOutSaturationChanged(this.rebuildSaturation);
    config.onEdgeFilteredInSaturationChanged(this.rebuildSaturation);
    config.onEdgeFilteredOutSaturationChanged(this.rebuildSaturation);
    this.rebuildSaturation();
  } // #region EventHandlers

  /**
   * Resizes the scene
   * @param width The width of the scene
   * @param height The height of the scene
   */


  resize(width, height) {
    this.doubleBufferedRenderables.resize(width, height);
  }
  /**
   * Adds the list of primitives to the scene
   * @param primitives The list of primitives to add
   */


  add(primitives) {
    if (Array.isArray(primitives)) {
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives[i];

        if (primitive.type === _graph.nodeType) {
          this.nodeData.receive(primitive);
        } else if (primitive.type === _graph.edgeType) {
          this.edgeData.receive(primitive);
        } else {
          var _this$data$retrieve;

          (_this$data$retrieve = this.data.retrieve(primitive.type)) === null || _this$data$retrieve === void 0 ? void 0 : _this$data$retrieve.receive(primitive);
        }
      }
    } else {
      if (primitives.type === _graph.nodeType) {
        this.nodeData.receive(primitives);
      } else if (primitives.type === _graph.edgeType) {
        this.edgeData.receive(primitives);
      } else {
        var _this$data$retrieve2;

        (_this$data$retrieve2 = this.data.retrieve(primitives.type)) === null || _this$data$retrieve2 === void 0 ? void 0 : _this$data$retrieve2.receive(primitives);
      }
    }
  }
  /**
   * Removes the given primitive from the scene
   * @param primitive The primitive to remove
   */


  remove(primitives) {
    if (Array.isArray(primitives)) {
      for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives[i];

        if (primitive.type === _graph.nodeType) {
          this.nodeData.remove(primitive.storeId);
        } else if (primitive.type === _graph.edgeType) {
          this.edgeData.remove(primitive.storeId);
        } else {
          var _this$data$retrieve3;

          (_this$data$retrieve3 = this.data.retrieve(primitive.type)) === null || _this$data$retrieve3 === void 0 ? void 0 : _this$data$retrieve3.remove(primitive.storeId);
        }
      }
    } else {
      if (primitives.type === _graph.nodeType) {
        this.nodeData.remove(primitives.storeId);
      } else if (primitives.type === _graph.edgeType) {
        this.edgeData.remove(primitives.storeId);
      } else {
        var _this$data$retrieve4;

        (_this$data$retrieve4 = this.data.retrieve(primitives.type)) === null || _this$data$retrieve4 === void 0 ? void 0 : _this$data$retrieve4.remove(primitives.storeId);
      }
    }
  }

  clear() {
    // Empty the DM
    for (const store of this.data) {
      store.reset();
    }
  }
  /**
   * @inheritdoc
   * @see {Scene.primities}
   */


  *primitives(ids, scan = false) {
    for (const store of this.data) {
      const iterator = scan ? store.scan() : store;

      for (const prim of iterator) {
        if (!ids || ids.has(prim.id || '')) {
          yield prim;
        }
      }
    }
  }
  /**
   * Gets the list of primitives by the given type
   */


  *primitivesByType(type) {
    const data = this.data.retrieve(type);

    if (data) {
      for (const prim of data) {
        yield prim;
      }
    }
  }
  /**
   * @inheritdoc
   * @see {Scene.renderables}
   */


  *renderables() {
    for (const renderable of this._renderables) {
      yield renderable;
    }

    for (const renderables of this.doubleBufferedRenderables.renderables()) {
      yield renderables;
    }
  }
  /**
   * @inheritdoc
   * @see {Scene.nodes}
   */


  nodes(scan = false) {
    return scan ? this.nodeData.scan() : this.nodeData;
  }
  /**
   * @inheritdoc
   * @see {Scene.edges}
   */


  edges(scan = false) {
    return scan ? this.edgeData.scan() : this.edgeData;
  }
  /**
   * Adds a renderable object that will be added to the rendering pipeline
   * @param renderable The renderable to add
   * @param doubleBuffered If the renderable should be double buffered
   */


  addRenderable(renderable, doubleBuffered = false) {
    if (doubleBuffered) {
      this.doubleBufferedRenderables.addRenderable(renderable);
    } else {
      this._renderables.push(renderable);

      renderable.resize(this.config.width, this.config.height);
    }
  }
  /**
   * Removes a renderable object from the rendering pipeline
   * @param renderable The renderable to remove
   */


  removeRenderable(renderable) {
    this.doubleBufferedRenderables.removeRenderable(renderable);
    this._renderables = this._renderables.filter(r => r !== renderable);
  }
  /**
   * Initializes the scene
   * @param props The initialization props
   */


  initialize({
    gl
  }) {
    (0, _gltools.setParameters)(gl, {
      clearColor: this.config.backgroundColor,
      clearDepth: [1],
      blendFunc: [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA],
      blendEquation: [gl.FUNC_ADD, gl.FUNC_ADD]
    });
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  /**
   * Renders the scene
   * @param options The render options
   */


  render(renderOptions) {
    const {
      engineTime,
      forceRender
    } = renderOptions;
    this.updateEngineTime(engineTime);

    if (this.needsRedraw || forceRender) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.drawRenderables(forceRender, renderOptions);
    }
  }
  /**
   * Whether or not the scene needs a redraw
   */


  get needsRedraw() {
    return this.doubleBufferedRenderables.needsRedraw || this._renderables.some(r => r.needsRedraw);
  }
  /**
   * Destroys the scene
   */


  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;

      this._renderables.forEach(r => {
        if (r.destroy) {
          r.destroy();
        }
      });

      this.doubleBufferedRenderables.destroy();
    }
  }
  /**
   * Change the node filter view.
   *
   * Nodes in the nodeFilteredIds config map are rendered as normal,
   * nodes outside of the map are rendered with low opacity.
   */


  /**
   * Calls the before draw on the renderables
   * @param engineTime The current engine time
   */
  updateEngineTime(engineTime) {
    for (const renderable of this.renderables()) {
      if (renderable.updateEngineTime) {
        renderable.updateEngineTime(engineTime);
      }
    }
  }
  /**
   * Draws the renderables
   * @param force If drawing should be forced
   * @param renderOptions The render options
   */


  drawRenderables(force, renderOptions) {
    this.doubleBufferedRenderables.update(force, renderOptions);
    this.doubleBufferedRenderables.draw();

    this._renderables.forEach(r => r.draw(renderOptions));
  }

}

exports.Scenegraph = Scenegraph;