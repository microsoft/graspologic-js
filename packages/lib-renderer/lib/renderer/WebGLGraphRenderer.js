/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { deferred } from '@essex-js-toolkit/toolbox';
import { AnimationLoop } from '@luma.gl/engine';
// This is causing problems downstream for some reason
// @ts-ignore
import { createGLContext } from '@luma.gl/gltools';
import { processGraph } from '../data';
import { Scenegraph, createDataStore, createDataStoreFromContainer, } from './delegates';
import { Camera } from '@graspologic/camera';
import { createConfiguration, CameraAdjustmentMode, EventEmitter, DEFAULT_WIDTH, DEFAULT_HEIGHT, fastDebounce, Interpolator, } from '@graspologic/common';
import { nodeType, edgeType, GraphContainer, } from '@graspologic/graph';
import { EdgesRenderable } from '@graspologic/renderables-edges';
import { NodesRenderable } from '@graspologic/renderables-nodes';
// typings are messed up for this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const invariant = require('invariant');
/**
 * Default world bounds, a 2 x 2 x 2 cube centered on 0, 0, 0
 */
const DEFAULT_BOUNDS = Object.freeze({
    x: {
        min: -1,
        max: 1,
    },
    y: {
        min: -1,
        max: 1,
    },
    z: {
        min: -1,
        max: 1,
    },
});
/**
 * A WebGL 2 based graph renderer
 */
export class WebGLGraphRenderer extends EventEmitter {
    gl;
    config;
    // Observable-pattern handler lists
    _hoveredVertex;
    dimensionInterpolator;
    _dataBounds = DEFAULT_BOUNDS;
    // Plugins
    _onInitializeHandlers = [];
    _kickoffDeferred;
    kickoff = false;
    initialized = false;
    // Logic Delegates
    animationLoop;
    animationProps;
    _scene;
    _camera;
    nodes;
    edges;
    _engineTime = 0;
    _lastRenderTime = -1;
    _startTime = Date.now();
    _forceDraw = false;
    __destroyed = false;
    animationLoopRunning = false;
    /** Returns the current engine time for animation tweening */
    engineTime = () => this._engineTime;
    _data;
    // #region construction
    /**
     * Constructor for WebGLGraphRenderer
     * @param gl The webgl context
     * @param config The render configuration
     * @param data The data to render
     * @param scene The scene object
     */
    constructor(gl, config, data, scene, camera) {
        super();
        this.gl = gl;
        this.config = config;
        this._data = data;
        data.onRegister(this.handleStoreUpdated);
        this._scene = scene;
        this._camera = camera;
        this.onInitialize((opts) => {
            this.resize(config.width, config.height);
            this.scene.initialize(opts);
            this.initialized = true;
        });
        this._kickoffDeferred = deferred();
        // Pretend all the data has updated
        for (const dataType of data.types()) {
            this.handleStoreUpdated(dataType, data.retrieve(dataType));
        }
        // We set up the animation loop here, even though
        // we might not fully use it to render loop, because it does a lot of useful things
        // i.e. sets up the framebuffer and resizing framebuffer/canvas, mouse position
        this.animationLoop = new AnimationLoop({
            gl,
            canvas: gl.canvas,
            useDevicePixels: true,
            createFramebuffer: true,
            onInitialize: (animationProps) => {
                this.animationProps = animationProps;
                this._onInitializeHandlers.forEach(h => h(animationProps));
            },
            onRender: (animationProps) => {
                this.animationProps = animationProps;
                if (this.animationLoopRunning) {
                    this.render();
                }
            },
        });
        this.dimensionInterpolator = new Interpolator(config.interpolationTime);
        // Start off in the correct position
        this.dimensionInterpolator.current = 1;
        for (const renderable of scene.renderables()) {
            if (renderable instanceof NodesRenderable) {
                this.nodes = renderable;
            }
            else if (renderable instanceof EdgesRenderable) {
                this.edges = renderable;
            }
        }
        if (this.nodes) {
            // Event Wiring
            this.nodes.on('nodeHovered', (node) => {
                this.emit('vertexHovered', node);
            });
        }
        config.onInterpolationTimeChanged(value => (this.dimensionInterpolator.interpolationTime = value));
        config.onIs3DChanged(() => {
            this.dimensionInterpolator.reset();
        });
        this.config.onHideDeselectedChanged(this.makeDirty);
        this.on('vertexHovered', node => {
            this._hoveredVertex = node;
        });
    }
    /**
     * Creates a new instance of the GraphRenderer
     * @param options The options for the render configuration
     */
    static createInstance(options = {}, data, gl) {
        if (!gl) {
            const canvas = document.createElement('canvas');
            gl = createGLContext({
                canvas,
                webgl2: true,
                webgl1: false,
            });
        }
        const store = data
            ? createDataStoreFromContainer(data)
            : createDataStore(options.nodeCountHint, options.edgeCountHint, options.autoBind);
        if (data) {
            processGraph(data, undefined);
        }
        const config = createConfiguration(options);
        const camera = new Camera();
        /** set up the scene */
        const scene = new Scenegraph(gl, config, store);
        // create nodes renderable
        const nodes = new NodesRenderable(gl, config);
        // create edges renderable
        const edges = new EdgesRenderable(gl, config);
        scene.addRenderable(edges, true);
        scene.addRenderable(nodes, true);
        return new WebGLGraphRenderer(gl, config, store, scene, camera);
    }
    // #endregion
    // #region event handling
    /**
     * @internal
     *
     * Triggers the onVertexClick event
     */
    handleClicked() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        if (this._hoveredVertex) {
            this.emit('vertexClick', this._hoveredVertex);
        }
    }
    /**
     * Returns the underlying graph structure
     */
    get graph() {
        return new GraphContainer(this._data.retrieve(nodeType), this._data.retrieve(edgeType));
    }
    /**
     * Gets whether or not the renderere is destroyed
     */
    get destroyed() {
        return this.__destroyed;
    }
    /**
     * Gets the camera
     */
    get camera() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        return this._camera;
    }
    /**
     * Add an initialization callback
     */
    onInitialize(initializeHandler) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        if (this.initialized) {
            initializeHandler(this.animationProps);
        }
        else {
            this._onInitializeHandlers.push(initializeHandler);
        }
    }
    /**
     * Gets the scene, on which nodes and edges can be added
     */
    get scene() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        return this._scene;
    }
    /**
     * Returns the canvas behind the graph renderer
     */
    get view() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        return this.gl.canvas;
    }
    // #endregion
    /**
     * Loads the given graph into the renderer
     * @param data The graph to load
     * @param colorizer The colorizer function which determines the color of a node
     */
    load(data, colorizer) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        // normalize weights and color nodes
        processGraph(data, colorizer);
        this._data.register(nodeType, data.nodes);
        this._data.register(edgeType, data.edges);
        for (const dataType of this._data.types()) {
            this.bindDataToRenderable(dataType, this._data.retrieve(dataType));
        }
        this.scene.rebuildSaturation();
        this.emit('load');
    }
    /**
     * Changes the position of the given nodes
     * @deprecated since the nodestore shares memory with the renderer, this should no longer be necessary
     * @param newPositions The new positions of the nodes
     * @param duration The optional duration for how long the transition should take
     */
    changePositions(newPositions, duration = 0) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        const nodesSupportAnim = this.graph.nodes.store.config.animation !== false;
        const edgesSupportAnim = this.graph.edges.store.config.animation !== false;
        let nodePos;
        const animateNodePosition = nodesSupportAnim
            ? (prim, newPos) => {
                ;
                prim.animatePosition(newPos, duration);
            }
            : (prim, newPos) => {
                prim.position = newPos;
            };
        const animateSourcePosition = edgesSupportAnim
            ? (prim, newPos) => {
                ;
                prim.animateSourcePosition(newPos, duration);
            }
            : (prim, newPos) => {
                prim.sourcePosition = newPos;
            };
        const animateTargetPosition = edgesSupportAnim
            ? (prim, newPos) => {
                ;
                prim.animateTargetPosition(newPos, duration);
            }
            : (prim, newPos) => {
                prim.targetPosition = newPos;
            };
        const position = [0, 0, 0];
        // I'm doing (prim as Edge) below, instead of assigning it a variable
        // as it is no additional memory cost at runtime
        for (const prim of this.scene.primitives(undefined, true)) {
            if (prim.type === nodeType) {
                nodePos = newPositions[prim.id || ''];
                if (nodePos) {
                    position[0] = nodePos.x;
                    position[1] = nodePos.y;
                    position[2] = nodePos.z || 0;
                    animateNodePosition(prim, position);
                }
            }
            else if (prim.type === edgeType) {
                nodePos = newPositions[prim.source];
                if (nodePos) {
                    position[0] = nodePos.x;
                    position[1] = nodePos.y;
                    position[2] = nodePos.z || 0;
                    animateSourcePosition(prim, position);
                }
                nodePos = newPositions[prim.target];
                if (nodePos) {
                    position[0] = nodePos.x;
                    position[1] = nodePos.y;
                    position[2] = nodePos.z || 0;
                    animateTargetPosition(prim, position);
                }
            }
        }
        this.emit('load');
        this.handlePrimitivesChanged();
    }
    /**
     * Resizes the renderer
     * @param width The width of the canvas
     * @param height The height of the canvas
     */
    resize(width, height) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        width = width || DEFAULT_WIDTH;
        height = height || DEFAULT_HEIGHT;
        this.config.width = width;
        this.config.height = height;
        const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
        const canvas = this.view;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        this.camera.resize(width, height);
        this._scene.resize(width, height);
        this.updateWeights();
        this.emit('resize');
        if (this.config.cameraAdjustmentMode === CameraAdjustmentMode.Viewport) {
            this.zoomToViewport();
        }
        else if (this.config.cameraAdjustmentMode === CameraAdjustmentMode.Graph) {
            this.zoomToGraph();
        }
    }
    /**
     * @internal
     *
     * Forces the renderables to rebind to their data
     */
    rebind() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        for (const renderable of this.scene.renderables()) {
            if (renderable.bindDataToModel) {
                renderable.bindDataToModel(true);
            }
        }
        this.makeDirty();
    }
    /**
     * Makes the graph renderer "dirty", so on the next render it will repaint itself
     */
    makeDirty = () => {
        invariant(!this.destroyed, 'renderer is destroyed!');
        if (!this._scene.needsRedraw) {
            this._forceDraw = true;
            this.emit('dirty');
        }
    };
    /**
     * A wrapper around camera.fitToView to ensure that the currently loaded graph is in view
     * @param duration The amount of time to take transitioning to the new view
     */
    zoomToGraph(duration = 0) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        const dataBounds = this.updateWeights();
        const cameraBounds = {
            x: {
                ...dataBounds.x,
            },
            y: {
                ...dataBounds.y,
            },
            ...(this.config.is3D ? { z: { ...dataBounds.z } } : {}),
        };
        this.camera.fitToView(cameraBounds, duration);
        this.makeDirty();
    }
    /**
     * A wrapper around camera.fitToView to match the viewport
     * @param duration The amount of time to take transitioning to the new view
     */
    zoomToViewport(duration = 0) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        this.camera.fitToView({
            x: {
                min: -this.config.width / 2,
                max: this.config.width / 2,
            },
            y: {
                min: -this.config.height / 2,
                max: this.config.height / 2,
            },
        }, duration);
        this.makeDirty();
    }
    /**
     * Updates the weights in the graph
     */
    updateWeights() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        this._dataBounds = this.computeBounds();
        return this._dataBounds;
    }
    /**
     * Starts the animation loop
     */
    start() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        this.animationLoopRunning = true;
        this.animationLoop.start();
    }
    /**
     * Stops the animation loop
     */
    stop() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        this.animationLoopRunning = false;
        this.animationLoop.stop();
    }
    /**
     * Renders the graph
     * @param delta The optional *engine time* diff since the last render, changing this will speed up or slow down animations
     * @returns The delta, either computed or the parameter passed to the function
     */
    render(delta) {
        invariant(!this.destroyed, 'renderer is destroyed!');
        if (!this.view.parentElement) {
            console.log('Graph Renderer is not in the document, yet it is still rendering, destroyed?: ', +this.destroyed);
        }
        if (this._lastRenderTime === -1) {
            this._lastRenderTime = Date.now();
        }
        if (!this.kickoff) {
            this.animationLoop.start();
            this._kickoffDeferred.resolve();
            this.kickoff = true;
        }
        // Increment the engine time by the amount of physical time that has elapsed
        delta = delta !== undefined ? delta : Date.now() - this._lastRenderTime;
        this._engineTime += delta;
        this._lastRenderTime = Date.now();
        const time = Date.now() - this._startTime;
        if (this.animationProps) {
            this.dimensionInterpolator.tick(time);
            const modelViewMatrix = this.camera
                .computeViewMatrix(this.config.is3D)
                .scale([
                1,
                1,
                this.config.is3D
                    ? this.dimensionInterpolator.current
                    : 1.0 - this.dimensionInterpolator.current,
            ]);
            const props = {
                time,
                engineTime: this._engineTime,
                framebuffer: this.animationProps.framebuffer,
                useDevicePixels: this.animationProps.useDevicePixels,
                _mousePosition: this.animationProps._mousePosition,
                weightToPixel: this.computeWeightToPixel(this._dataBounds),
                projectionMatrix: this.camera.projection,
                modelViewMatrix,
                hideDeselected: this.config.hideDeselected,
                minRadius: this.config.nodeMinRadius,
                maxRadius: this.config.nodeMaxRadius,
                canvasPixelSize: [this.config.width, this.config.height],
                forceRender: this._forceDraw ||
                    this.camera.isMoving ||
                    this.dimensionInterpolator.current < 1.0,
            };
            this._forceDraw = false;
            this.camera.tick(time);
            // Set the enabled states on the nodes/edges
            if (this.nodes &&
                !this.camera.isMoving &&
                props._mousePosition &&
                // We only need to compute the picking if there is something actually listening to it
                (this.hasListeners('vertexClick') || this.hasListeners('vertexHovered'))) {
                this.nodes.computeHovered(props);
            }
            if (this._scene.needsRedraw) {
                if (this.nodes) {
                    this.nodes.enabled =
                        this.config.drawNodes &&
                            (!this.config.hideNodesOnMove || !this.camera.isMoving);
                }
                if (this.edges) {
                    this.edges.enabled =
                        this.config.drawEdges &&
                            (!this.config.hideEdgesOnMove || !this.camera.isMoving);
                }
            }
            this.animationProps.engineTime = this.engineTime();
            this._scene.render(props);
        }
        return delta;
    }
    /**
     * Returns a promise that is resolved before the first render
     */
    awaitKickoff() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        return this._kickoffDeferred.promise;
    }
    /**
     * Destroy's the graph renderer
     */
    destroy() {
        invariant(!this.destroyed, 'renderer is destroyed!');
        if (!this.destroyed) {
            this.__destroyed = true;
            this.animationLoop.stop();
            this._data.destroy();
            this._scene.destroy();
        }
    }
    /**
     * Binds the given data to the renderable which supports it
     * @param type The type of data
     * @param store The data store
     */
    bindDataToRenderable(type, store) {
        // i.e. type: Node, store: NodeStore, renderable: NodeRenderable
        for (const renderable of this.scene.renderables()) {
            const hasData = renderable;
            if (hasData.itemType === type) {
                hasData.data = store;
            }
        }
    }
    /**
     * Handler when the store has been updated
     * @param type The type of store that was updated
     * @param store The new store
     */
    handleStoreUpdated = (type, store) => {
        // Update the data on the renderable
        this.bindDataToRenderable(type, store);
        // Listen for changes to the data
        store.onAddItem(fastDebounce(this.handlePrimitivesChanged, 100));
    };
    /**
     * Handler for when the graphical primitives has changed somehow
     */
    handlePrimitivesChanged = () => {
        if (this.config.cameraAdjustmentMode === CameraAdjustmentMode.Graph) {
            this.zoomToGraph();
        }
    };
    /**
     * Computes the world bounds of the items drawn to screen
     */
    computeBounds() {
        if (this.config.dataBounds) {
            return {
                ...this.config.dataBounds,
                z: this.config.dataBounds.z || DEFAULT_BOUNDS.z,
            };
        }
        else {
            let bounds;
            for (const renderable of this.scene.renderables()) {
                const boundedRenderable = renderable;
                if (boundedRenderable.computeBounds !== undefined) {
                    const newBounds = boundedRenderable.computeBounds();
                    if (!bounds) {
                        bounds = newBounds;
                    }
                    else if (newBounds) {
                        // X
                        bounds.x.max = Math.max(newBounds.x.min, newBounds.x.max, bounds.x.max);
                        bounds.x.min = Math.min(newBounds.x.min, newBounds.x.max, bounds.x.min);
                        // Y
                        bounds.y.max = Math.max(newBounds.y.min, newBounds.y.max, bounds.y.max);
                        bounds.y.min = Math.min(newBounds.y.min, newBounds.y.max, bounds.y.min);
                        // Z
                        bounds.z.max = Math.max(newBounds.z.min, newBounds.z.max, bounds.z.max);
                        bounds.z.min = Math.min(newBounds.z.min, newBounds.z.max, bounds.z.min);
                    }
                }
            }
            return Object.freeze(bounds || DEFAULT_BOUNDS);
        }
    }
    /**
     * Computes the weight (0 -> 1) to pixel scale
     */
    computeWeightToPixel(bounds) {
        return (
        // Scale the weight based on if the graph was fit to the screen
        Math.max(
        // Pretend the x axis was stretched to fit the width
        (bounds.x.max - bounds.x.min) / this.config.width, 
        // Pretend the y axis was stretched to fit the width
        (bounds.y.max - bounds.y.min) / this.config.height) / 2.0 || 1);
    }
}
