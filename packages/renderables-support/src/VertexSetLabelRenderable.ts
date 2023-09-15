/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Node } from '@graspologic/graph'
import { CompositeDataboundRenderable } from '@graspologic/renderables-base'
import { VertexLabelRenderable } from './VertexLabelRenderable.js'

/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a set of nodes
 */
export class VertexSetLabelRenderable extends CompositeDataboundRenderable<
	Node[]
> {
	/**
	 * Constructor
	 * @param gl The gl context
	 */
	public constructor(private gl: WebGLRenderingContext) {
		super([])
	}

	/**
	 * Sets the verticies to label
	 * @param data The set of verticies to label
	 */
	protected handleSetData(data: Node[] | undefined): void {
		this.renderables = (data || []).map(d => {
			const renderable = new VertexLabelRenderable(this.gl)
			renderable.setData(d)
			return renderable
		})
	}
}
