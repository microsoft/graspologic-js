/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../defaults'
import { Renderable, RenderOptions } from '../types'

/**
 * Base-class for property-holding renderable models
 */
export abstract class DirtyableRenderable implements Renderable {
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
	public abstract draw(options: RenderOptions): void
}
/**
 * Base class for a vertex renderable
 */
export abstract class DataboundRenderable<T> extends DirtyableRenderable {
	// The bound data of this renderable
	protected data: T | undefined

	/**
	 * Determines whether this renderable is enabled
	 */
	public get enabled(): boolean {
		return this.data != null
	}

	/**
	 * Get the related vertex
	 */
	public getData(): T | undefined {
		return this.data
	}

	/**
	 * Set the related vertex
	 * @param vertex The related vertex
	 */
	public setData(data: T | undefined): void {
		if (this.isEqual(data, this.data)) {
			this.data = data
			this.handleSetData(data)
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Returns true if the new data is equal to the old data
	 * @param data The new data
	 * @param existing The edisting data
	 */
	protected isEqual(data: T | undefined, existing: T | undefined) {
		return data !== existing
	}

	/**
	 * Inner handler for responding to a new set vertex
	 * @param vertex The vertext that has been set
	 */
	protected abstract handleSetData(vertex: T | undefined): void
}

/**
 * Base class for a renderable that operates on Vertex data
 */
export abstract class CompositeDataboundRenderable<T>
	extends DataboundRenderable<T>
	implements DataboundRenderable<T> {
	protected constructor(protected renderables: Renderable[]) {
		super()
	}

	/**
	 * Draws out this renderable
	 */
	public draw(options: RenderOptions): void {
		if (this.enabled) {
			this.renderables.forEach(r => r.draw(options))
		}
	}

	/**
	 * Determines if this renderable needs to be redrawn
	 */
	public get needsRedraw() {
		return this.enabled && this.renderables.some(r => r.needsRedraw)
	}
}
