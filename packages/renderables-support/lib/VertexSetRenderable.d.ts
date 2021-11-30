import { RenderOptions } from '@graspologic/common';
import { Node } from '@graspologic/graph';
import { DataboundRenderable } from '@graspologic/renderables-base';
export declare const position: unique symbol;
export declare const radius: unique symbol;
export declare const weight: unique symbol;
export declare const visible: unique symbol;
export declare const shape: unique symbol;
export declare const LAYOUT: any;
export declare const LAYOUT_STRIDE: any;
export declare const POSITION_OFFSET: any;
export declare const WEIGHT_OFFSET: any;
export declare const RADIUS_OFFSET: any;
export declare const SHAPE_OFFSET: any;
/**
 * A vertex renderable for a multiple vertices, for use in rendering like highlights
 */
export declare class VertexSetRenderable extends DataboundRenderable<Node[]> {
    private id;
    private model;
    private nodeGLBuffer;
    private _color;
    /**
     * Constructor
     * @param gl The gl context
     * @param id The id of the renderable
     */
    constructor(gl: WebGLRenderingContext, id?: any);
    /**
     * Gets the color for the renderable
     */
    get color(): number[];
    /**
     * Sets the color for the renderable
     */
    set color(value: number[]);
    /**
     * Draws the VertexSetHighlightRenderable
     * @param options The render options
     */
    draw(options: RenderOptions): void;
    /**
     * Sets the vertex to be rendered
     * @param vertices The vertex to render
     */
    protected handleSetData(vertices: Node[]): void;
    /**
     * Updates the data bound to the model
     * @param data The raw data buffer
     * @param count The number of nodes
     */
    private _updateModelData;
    /**
     * Gets the shaders used with the vertex body
     */
    private _getShaders;
    /**
     * Creates the model used for rendering the vertex body
     * @param gl The gl context
     * @param id The id of the model
     */
    private _createModel;
}
