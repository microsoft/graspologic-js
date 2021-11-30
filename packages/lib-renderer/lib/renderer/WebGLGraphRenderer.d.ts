import { NodeComponentColorizer, Scene, PositionMap, InitializeHandler, GraphRenderer, UsesWebGL, GraphRendererEvents } from '../types';
import { Camera } from '@graspologic/camera';
import { EventEmitter, RenderConfiguration, RenderConfigurationOptions } from '@graspologic/common';
import { GraphContainer } from '@graspologic/graph';
/**
 * A WebGL 2 based graph renderer
 */
export declare class WebGLGraphRenderer extends EventEmitter<GraphRendererEvents> implements GraphRenderer, UsesWebGL {
    gl: WebGL2RenderingContext;
    config: RenderConfiguration;
    private _hoveredVertex;
    private dimensionInterpolator;
    private _dataBounds;
    private _onInitializeHandlers;
    private _kickoffDeferred;
    private kickoff;
    private initialized;
    private animationLoop;
    private animationProps;
    private _scene;
    private _camera;
    private nodes;
    private edges;
    private _engineTime;
    private _lastRenderTime;
    private _startTime;
    private _forceDraw;
    private __destroyed;
    private animationLoopRunning;
    /** Returns the current engine time for animation tweening */
    engineTime: () => number;
    private _data;
    /**
     * Constructor for WebGLGraphRenderer
     * @param gl The webgl context
     * @param config The render configuration
     * @param data The data to render
     * @param scene The scene object
     */
    private constructor();
    /**
     * Creates a new instance of the GraphRenderer
     * @param options The options for the render configuration
     */
    static createInstance(options?: Partial<RenderConfigurationOptions>, data?: GraphContainer, gl?: WebGL2RenderingContext): WebGLGraphRenderer;
    /**
     * @internal
     *
     * Triggers the onVertexClick event
     */
    handleClicked(): void;
    /**
     * Returns the underlying graph structure
     */
    get graph(): GraphContainer;
    /**
     * Gets whether or not the renderere is destroyed
     */
    get destroyed(): boolean;
    /**
     * Gets the camera
     */
    get camera(): Camera;
    /**
     * Add an initialization callback
     */
    onInitialize<T>(initializeHandler: InitializeHandler<T>): void;
    /**
     * Gets the scene, on which nodes and edges can be added
     */
    get scene(): Scene;
    /**
     * Returns the canvas behind the graph renderer
     */
    get view(): HTMLCanvasElement;
    /**
     * Loads the given graph into the renderer
     * @param data The graph to load
     * @param colorizer The colorizer function which determines the color of a node
     */
    load(data: GraphContainer, colorizer?: NodeComponentColorizer): void;
    /**
     * Changes the position of the given nodes
     * @deprecated since the nodestore shares memory with the renderer, this should no longer be necessary
     * @param newPositions The new positions of the nodes
     * @param duration The optional duration for how long the transition should take
     */
    changePositions(newPositions: PositionMap, duration?: number): void;
    /**
     * Resizes the renderer
     * @param width The width of the canvas
     * @param height The height of the canvas
     */
    resize(width: number, height: number): void;
    /**
     * @internal
     *
     * Forces the renderables to rebind to their data
     */
    rebind(): void;
    /**
     * Makes the graph renderer "dirty", so on the next render it will repaint itself
     */
    makeDirty: () => void;
    /**
     * A wrapper around camera.fitToView to ensure that the currently loaded graph is in view
     * @param duration The amount of time to take transitioning to the new view
     */
    zoomToGraph(duration?: number): void;
    /**
     * A wrapper around camera.fitToView to match the viewport
     * @param duration The amount of time to take transitioning to the new view
     */
    zoomToViewport(duration?: number): void;
    /**
     * Updates the weights in the graph
     */
    updateWeights(): Bounds3D;
    /**
     * Starts the animation loop
     */
    start(): void;
    /**
     * Stops the animation loop
     */
    stop(): void;
    /**
     * Renders the graph
     * @param delta The optional *engine time* diff since the last render, changing this will speed up or slow down animations
     * @returns The delta, either computed or the parameter passed to the function
     */
    render(delta?: number): number;
    /**
     * Returns a promise that is resolved before the first render
     */
    awaitKickoff(): Promise<void>;
    /**
     * Destroy's the graph renderer
     */
    destroy(): void;
    /**
     * Binds the given data to the renderable which supports it
     * @param type The type of data
     * @param store The data store
     */
    private bindDataToRenderable;
    /**
     * Handler when the store has been updated
     * @param type The type of store that was updated
     * @param store The new store
     */
    private handleStoreUpdated;
    /**
     * Handler for when the graphical primitives has changed somehow
     */
    private handlePrimitivesChanged;
    /**
     * Computes the world bounds of the items drawn to screen
     */
    private computeBounds;
    /**
     * Computes the weight (0 -> 1) to pixel scale
     */
    private computeWeightToPixel;
}
