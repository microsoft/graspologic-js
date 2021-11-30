/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Renderable, RenderOptions } from '@graspologic/common';
import { DirtyableRenderable } from '@graspologic/renderables-base';
/**
 * @internal
 *
 * Renderable that renders other Renderables to a buffer which gets rendered to the screen
 */
export declare class ScreenQuadRenderable extends DirtyableRenderable {
    private gl;
    private model;
    private framebuffer?;
    private texture?;
    private drawArgument;
    private _renderables;
    private destroyed;
    /**
     * Constructor
     * @param gl The gl context to render the screen quad to
     * @param id The id of the renderable
     */
    constructor(gl: WebGLRenderingContext, id?: string);
    /**
     * Updates the screen quad by re-rendering its child renderables
     * @param forceRedraw True if the screen quad should be forced to be redrawn
     * @param options The render options
     */
    update(forceRedraw: boolean, options: RenderOptions): void;
    /**
     * Gets whether or not the screen quad needs to be redrawn
     */
    get needsRedraw(): any;
    /**
     * Resizes the screen quad
     * @param width The render width
     * @param height The render height
     */
    resize(width: number, height: number): void;
    /**
     * Draws the screen quad
     */
    draw(): void;
    /**
     * Adds a renderable that should be rendered to this screen quad
     * @param renderable The renderable to add
     */
    addRenderable(renderable: Renderable): void;
    /**
     * Removes a renderable from the screen quad
     * @param renderable The renderable to add
     */
    removeRenderable(renderable: Renderable): void;
    /**
     * Gets the list of renderables contained in this renderable
     */
    renderables(): Iterable<Renderable>;
    /**
     * Destroys the screen quad
     */
    destroy(): void;
    /**
     * Reinitializes the screen quads internal buffers/textures
     */
    private reinit;
    /**
     * Clears the internal frame buffer
     */
    private _clearFramebuffer;
    /**
     * Gets the shaders used for the screen quad
     */
    private _getShaders;
    /**
     * Gets the model for the screen quad
     * @param gl The gl context
     * @param id The id of the model
     */
    private _getModel;
    /**
     * Creates the internal offscreen frame buffer
     * @param gl The gl context
     * @param width The width of the renderer
     * @param height The height of the renderer
     */
    private _createOffscreenFramebuffer;
}
