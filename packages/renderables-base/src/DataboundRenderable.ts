/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DirtyableRenderable } from './DirtyRenderable.js'

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
