/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { LabelRenderable } from './LabelRenderable';
import { DataboundRenderable } from '@graspologic/renderables-base';
/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a single node
 */
export class VertexLabelRenderable extends DataboundRenderable {
    renderable;
    /**
     * Constructor
     * @param gl The gl context
     */
    constructor(gl) {
        super();
        this.renderable = new LabelRenderable(gl);
    }
    /**
     * Sets the vertex to render the label for
     * @param vertex The vertex to render the label for
     */
    handleSetData(vertex) {
        if (vertex) {
            this.renderable.text = vertex.label || vertex.id || '';
            this.renderable.setPositions(vertex.position);
            this.renderable.weight = vertex.weight || 0;
        }
        else {
            this.renderable.text = '';
        }
    }
    draw(options) {
        if (this.enabled) {
            this.renderable.draw(options);
        }
    }
}
