/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { VertexLabelRenderable } from './VertexLabelRenderable';
import { CompositeDataboundRenderable } from '@graspologic/renderables-base';
/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a set of nodes
 */
export class VertexSetLabelRenderable extends CompositeDataboundRenderable {
    gl;
    /**
     * Constructor
     * @param gl The gl context
     */
    constructor(gl) {
        super([]);
        this.gl = gl;
    }
    /**
     * Sets the verticies to label
     * @param data The set of verticies to label
     */
    handleSetData(data) {
        this.renderables = (data || []).map(d => {
            const renderable = new VertexLabelRenderable(this.gl);
            renderable.setData(d);
            return renderable;
        });
    }
}
