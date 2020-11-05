/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Renderable, RenderOptions } from '@graspologic/common'
import { DataboundRenderable } from './DataboundRenderable'

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