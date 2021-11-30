/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DataboundRenderable } from './DataboundRenderable';
import { Renderable, RenderOptions } from '@graspologic/common';
/**
 * Base class for a renderable that operates on Vertex data
 */
export declare abstract class CompositeDataboundRenderable<T> extends DataboundRenderable<T> implements DataboundRenderable<T> {
    protected renderables: Renderable[];
    protected constructor(renderables: Renderable[]);
    /**
     * Draws out this renderable
     */
    draw(options: RenderOptions): void;
    /**
     * Determines if this renderable needs to be redrawn
     */
    get needsRedraw(): boolean;
}
