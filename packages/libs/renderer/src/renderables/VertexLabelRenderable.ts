/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Node } from '@graspologic/graph'
import { RenderOptions } from '../types/internal'
import { LabelRenderable } from './LabelRenderable'
import { DataboundRenderable } from './Renderables'

/**
 * A renderable that can be added to a GraphRenderer for rendering labels for a single node
 */
export class VertexLabelRenderable extends DataboundRenderable<Node> {
	private renderable: LabelRenderable
	/**
	 * Constructor
	 * @param gl The gl context
	 */
	public constructor(gl: WebGLRenderingContext) {
		super()
		this.renderable = new LabelRenderable(gl)
	}

	/**
	 * Sets the vertex to render the label for
	 * @param vertex The vertex to render the label for
	 */
	public handleSetData(vertex: Node | undefined) {
		if (vertex) {
			this.renderable.text = vertex.label || vertex.id || ''
			this.renderable.setPositions(vertex.position)
			this.renderable.weight = vertex.weight || 0
		} else {
			this.renderable.text = ''
		}
	}

	public draw(options: RenderOptions) {
		if (this.enabled) {
			this.renderable.draw(options)
		}
	}
}
