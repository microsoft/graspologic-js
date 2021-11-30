import { Node } from '@graspologic/graph';
import { CompositeDataboundRenderable } from '@graspologic/renderables-base';
/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a set of nodes
 */
export declare class VertexSetLabelRenderable extends CompositeDataboundRenderable<Node[]> {
    private gl;
    /**
     * Constructor
     * @param gl The gl context
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * Sets the verticies to label
     * @param data The set of verticies to label
     */
    protected handleSetData(data: Node[] | undefined): void;
}
