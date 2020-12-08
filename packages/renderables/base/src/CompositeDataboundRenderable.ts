/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DataboundRenderable } from './DataboundRenderable'
import { Renderable, RenderOptions } from '@graspologic/common'

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
	public prepare(options: RenderOptions): void {
		if (this.enabled && this.data) {
			this.renderables.forEach(r => r.prepare && r.prepare(options))
		}
	}

	/**
	 * Draws out this renderable
	 */
	public render(options: RenderOptions): void {
		if (this.enabled && this.data) {
			this.renderables.forEach(r => r.render(options))
		}
	}

	/**
	 * Determines if this renderable needs to be redrawn
	 */
	public get needsRedraw() {
		return (
			this.enabled && !!this.data && this.renderables.some(r => r.needsRedraw)
		)
	}
}
