/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Renderable,
	RenderOptions,
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
} from '@graspologic/common'

/**
 * Base-class for property-holding renderable models
 */
export class DirtyableRenderable implements Renderable {
	protected _needsRedraw = false
	private _enabled = true
	protected width: number = DEFAULT_WIDTH
	protected height: number = DEFAULT_HEIGHT

	protected makeDirtyHandler = (): void => this.setNeedsRedraw(true)

	/**
	 * Resizes the renderable
	 * @param width The render width
	 * @param height The render height
	 */
	public resize(width: number, height: number) {
		this.width = width || DEFAULT_WIDTH
		this.height = height || DEFAULT_HEIGHT
	}

	/**
	 * Gets whether or not the renderable needs to be redrawn
	 */
	public get needsRedraw(): boolean {
		return this._needsRedraw
	}

	/**
	 * Gets whether or not the renderable is enabled
	 */
	public get enabled(): boolean {
		return this._enabled
	}

	/**
	 * Sets whether or not the renderable is enabled
	 */
	public set enabled(value: boolean) {
		if (value !== this._enabled) {
			this._enabled = value
			this._needsRedraw = true
		}
	}

	/**
	 * Sets the flag indicating whether or not the renderable needs to be redrawn
	 * @param value True if the renderable needs to be redrawn
	 */
	protected setNeedsRedraw(value: boolean): void {
		this._needsRedraw = value
	}

	/**
	 * Draws the renderable
	 * @param options The render options
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public render(options: RenderOptions): void {}
}
