import { DataStore, Scene, Primitive } from '../../types';
import { Renderable, RenderConfiguration, RenderOptions } from '@graspologic/common';
import { Edge, Node } from '@graspologic/graph';
/**
 * @internal
 *
 * Scenegraph for graph rendering. This contains responsibility for owning, mutating, and
 * rendering the set of renderables and primitives which compose the graph view.
 */
export declare class Scenegraph implements Scene {
    private gl;
    private config;
    private data;
    private destroyed;
    private doubleBufferedRenderables;
    private _renderables;
    private edgeData;
    private nodeData;
    /**
     * Constructor for the SceneGraph
     * @param gl The gl context
     * @param config The render configuration
     * @param camera The camera
     * @param data The data manager
     */
    constructor(gl: WebGLRenderingContext, config: RenderConfiguration, data: DataStore<Primitive>);
    /**
     * Resizes the scene
     * @param width The width of the scene
     * @param height The height of the scene
     */
    resize(width: number, height: number): void;
    /**
     * Adds the list of primitives to the scene
     * @param primitives The list of primitives to add
     */
    add(primitives: Primitive | Primitive[]): void;
    /**
     * Removes the given primitive from the scene
     * @param primitive The primitive to remove
     */
    remove(primitives: Primitive | Primitive[]): void;
    clear(): void;
    /**
     * @inheritdoc
     * @see {Scene.primities}
     */
    primitives(ids?: Set<string>, scan?: boolean): Iterable<Primitive>;
    /**
     * Gets the list of primitives by the given type
     */
    primitivesByType(type: symbol): Iterable<Primitive>;
    /**
     * @inheritdoc
     * @see {Scene.renderables}
     */
    renderables(): Generator<any, void, unknown>;
    /**
     * @inheritdoc
     * @see {Scene.nodes}
     */
    nodes(scan?: boolean): Iterable<Node>;
    /**
     * @inheritdoc
     * @see {Scene.edges}
     */
    edges(scan?: boolean): Iterable<Edge>;
    /**
     * Adds a renderable object that will be added to the rendering pipeline
     * @param renderable The renderable to add
     * @param doubleBuffered If the renderable should be double buffered
     */
    addRenderable(renderable: Renderable, doubleBuffered?: boolean): void;
    /**
     * Removes a renderable object from the rendering pipeline
     * @param renderable The renderable to remove
     */
    removeRenderable(renderable: Renderable): void;
    /**
     * Initializes the scene
     * @param props The initialization props
     */
    initialize({ gl }: {
        gl: WebGLRenderingContext;
    }): void;
    /**
     * Renders the scene
     * @param options The render options
     */
    render(renderOptions: RenderOptions): void;
    /**
     * Whether or not the scene needs a redraw
     */
    get needsRedraw(): any;
    /**
     * Destroys the scene
     */
    destroy(): void;
    /**
     * Change the node filter view.
     *
     * Nodes in the nodeFilteredIds config map are rendered as normal,
     * nodes outside of the map are rendered with low opacity.
     */
    rebuildSaturation: () => void;
    /**
     * Handler when the store has been updated
     * @param type The type of store that was updated
     * @param store The new store
     */
    private handleStoreUpdated;
    /**
     * Calls the before draw on the renderables
     * @param engineTime The current engine time
     */
    private updateEngineTime;
    /**
     * Draws the renderables
     * @param force If drawing should be forced
     * @param renderOptions The render options
     */
    private drawRenderables;
}
