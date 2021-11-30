/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Renderable, RenderOptions } from '@graspologic/common';
/**
 * Base-class for property-holding renderable models
 */
export declare class DirtyableRenderable implements Renderable {
    protected _needsRedraw: boolean;
    private _enabled;
    protected width: number;
    protected height: number;
    protected makeDirtyHandler: () => void;
    /**
     * Resizes the renderable
     * @param width The render width
     * @param height The render height
     */
    resize(width: number, height: number): void;
    /**
     * Gets whether or not the renderable needs to be redrawn
     */
    get needsRedraw(): boolean;
    /**
     * Gets whether or not the renderable is enabled
     */
    get enabled(): boolean;
    /**
     * Sets whether or not the renderable is enabled
     */
    set enabled(value: boolean);
    /**
     * Sets the flag indicating whether or not the renderable needs to be redrawn
     * @param value True if the renderable needs to be redrawn
     */
    protected setNeedsRedraw(value: boolean): void;
    /**
     * Draws the renderable
     * @param options The render options
     */
    draw(options: RenderOptions): void;
}
