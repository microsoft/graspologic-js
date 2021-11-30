import { RenderOptions } from '@graspologic/common';
import { Node } from '@graspologic/graph';
import { DataboundRenderable } from '@graspologic/renderables-base';
/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a single node
 */
export declare class VertexLabelRenderable extends DataboundRenderable<Node> {
    private renderable;
    /**
     * Constructor
     * @param gl The gl context
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * Sets the vertex to render the label for
     * @param vertex The vertex to render the label for
     */
    handleSetData(vertex: Node | undefined): void;
    draw(options: RenderOptions): void;
}
