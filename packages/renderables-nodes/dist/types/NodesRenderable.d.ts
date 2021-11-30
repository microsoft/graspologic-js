import { Bounds3D, RenderOptions, RenderConfiguration, ItemBasedRenderable, BoundedRenderable } from '@graspologic/common';
import { NodeStore, Node } from '@graspologic/graph';
/**
 * The event interface for the NodesRenderable
 */
export interface NodesRenderableEvents {
    nodeHovered(node?: Node): void;
}
declare const NodesBase: any;
/**
 * A renderable that can be added to the GraphRenderer which adds support for rendering nodes
 */
export declare class NodesRenderable extends NodesBase implements ItemBasedRenderable, BoundedRenderable {
    private gl;
    protected config: RenderConfiguration;
    private readonly model;
    private readonly modelBuffer;
    private readonly translucentModel;
    private readonly translucentModelBuffer;
    private needsDataBind;
    private _data;
    private pickingSelectedColor;
    /**
     * Constructor
     * @param gl The gl context the nodes should be rendered to
     * @param config The render configuration
     * @param id The id of the renderable
     */
    constructor(gl: WebGLRenderingContext, config: RenderConfiguration, id?: any);
    /**
     * Gets the data type associated with this renderable
     */
    get itemType(): symbol;
    /**
     * Gets the node data that should be rendered
     */
    get data(): NodeStore | undefined;
    /**
     * Sets the node data that should be rendered
     */
    set data(value: NodeStore | undefined);
    /**
     * Runs the hovered logic to determine what node is being hovered over
     * @param param0
     */
    computeHovered({ framebuffer, _mousePosition }: RenderOptions): any;
    updateEngineTime(engineTime: number): void;
    /**
     * Draws the NodesRenderable
     * @param options The set of render options
     */
    draw(options: RenderOptions): void;
    /**
     * Computes the bounds of the nodes
     */
    computeBounds(): Bounds3D | undefined;
    /**
     * Binds the data in our databuffer to the model
     * @param force Force a reload of all the data
     */
    bindDataToModel(forceAll?: boolean): boolean;
    /**
     * Handler for when a node is added
     * @param primitive The primitive to add
     */
    protected handleNodeAdded: (nodeOrIndex: number | Node) => void;
    /**
     * Removes a primitive from the scene
     * @param primitive The primitive to remove
     */
    protected handleNodeRemoved: (nodeOrIndex: number | Node) => void;
    /**
     * Handler for when an attribute for a node is updated
     */
    private handleNodeAttributeUpdated;
    /**
     * Compares two picking colors to see if they are equal
     * @param color1 The first picking color
     * @param color2 The second picking color
     */
    private _comparePickingColors;
}
export {};
