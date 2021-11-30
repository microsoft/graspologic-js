import { RenderOptions, RenderConfiguration } from '@graspologic/common';
import { EdgesRenderable } from '@graspologic/renderables-edges';
/**
 * A renderable that can be added to a GraphRenderer to render a set of Axes on the graph
 */
export declare class AxesRenderable extends EdgesRenderable {
    private projection?;
    /**
     * Constructor
     * @param gl The gl context to render the axes to
     * @param config The render configuration
     */
    constructor(gl: WebGLRenderingContext, config: RenderConfiguration);
    /**
     * Resizes the axes renderable
     * @param width The render width
     * @param height The render height
     */
    resize(width: number, height: number): void;
    /**
     * Gets the maxiumum width of an edge
     */
    protected get edgeMaxWidth(): number;
    /**
     * Gets whether or not the edges are antialiased
     */
    protected get edgeAntialias(): boolean;
    /**
     * Gets the alpha used to render the edges
     */
    protected get edgeAlpha(): number;
    /**
     * Gets whether or not the edges should be rendered with a constant width
     */
    protected get edgeConstantWidth(): boolean;
    /**
     * Renders the axes renderable
     * @param options The set of render options
     */
    draw(options: RenderOptions): void;
    /**
     * Generates the set of edges used as our axes
     */
    private generateEdges;
}
