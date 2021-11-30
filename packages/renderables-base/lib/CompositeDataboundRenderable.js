/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DataboundRenderable } from './DataboundRenderable';
/**
 * Base class for a renderable that operates on Vertex data
 */
export class CompositeDataboundRenderable extends DataboundRenderable {
    renderables;
    constructor(renderables) {
        super();
        this.renderables = renderables;
    }
    /**
     * Draws out this renderable
     */
    draw(options) {
        if (this.enabled) {
            this.renderables.forEach(r => r.draw(options));
        }
    }
    /**
     * Determines if this renderable needs to be redrawn
     */
    get needsRedraw() {
        return this.enabled && this.renderables.some(r => r.needsRedraw);
    }
}
