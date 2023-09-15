/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { RenderOptions, RenderConfiguration } from '@graspologic/common'
import { createEdgeStore } from '@graspologic/graph'
import { EdgesRenderable } from '@graspologic/renderables-edges'
import { Matrix4 } from 'math.gl'

const AXIS_COLORS = [0xff0000ff, 0xff00ff00, 0xffff0000]
const X = [0.1, 0, 0]
const Y = [0, 0.1, 0]
const Z = [0, 0, 0.1]
const OFFSET_X = -0.4
const OFFSET_Y = -0.4
const OFFSET_Z = -420
const AXIS_WIDTH = 2
const SCALE_CENTER_AXES = 3

/**
 * A renderable that can be added to a GraphRenderer to render a set of Axes on the graph
 */
export class AxesRenderable extends EdgesRenderable {
	private projection?: Matrix4

	/**
	 * Constructor
	 * @param gl The gl context to render the axes to
	 * @param config The render configuration
	 */
	public constructor(gl: WebGLRenderingContext, config: RenderConfiguration) {
		super(gl, config)
		config.onCornerAxesChanged(this.makeDirtyHandler)
		config.onDrawAxesChanged(this.makeDirtyHandler)
		config.onIs3DChanged(() => this.generateEdges())
		config.onCornerAxesChanged(() => this.generateEdges())
		this.setNeedsRedraw(true)
	}

	/**
	 * Resizes the axes renderable
	 * @param width The render width
	 * @param height The render height
	 */
	public resize(width: number, height: number): void {
		super.resize(width, height)
		this.generateEdges()
		this.setNeedsRedraw(true)
	}

	/**
	 * Gets the maxiumum width of an edge
	 */
	protected get edgeMaxWidth() {
		return AXIS_WIDTH
	}

	/**
	 * Gets whether or not the edges are antialiased
	 */
	protected get edgeAntialias() {
		return false
	}

	/**
	 * Gets the alpha used to render the edges
	 */
	protected get edgeAlpha() {
		return 1
	}

	/**
	 * Gets whether or not the edges should be rendered with a constant width
	 */
	protected get edgeConstantWidth() {
		return true
	}

	/**
	 * Renders the axes renderable
	 * @param options The set of render options
	 */
	public draw(options: RenderOptions) {
		if (this.data && this.config.drawAxes) {
			const localMatrix = options.modelViewMatrix.clone()
			if (this.config.cornerAxes) {
				localMatrix[12] = OFFSET_X * this.width
				localMatrix[13] = OFFSET_Y * this.height
				localMatrix[14] = OFFSET_Z
			} else {
				localMatrix[0] = SCALE_CENTER_AXES
				localMatrix[5] = SCALE_CENTER_AXES
				localMatrix[10] = SCALE_CENTER_AXES
			}
			super.draw({
				...options,
				modelViewMatrix: localMatrix || options.modelViewMatrix,
				projectionMatrix: this.config.cornerAxes
					? this.projection!
					: options.projectionMatrix,
			})
		}
	}

	/**
	 * Generates the set of edges used as our axes
	 */
	private generateEdges() {
		const screenSize = Math.min(this.width, this.height)
		const axisCount = this.config.is3D ? 3 : 2
		const edgesBuffer = createEdgeStore({ capacity: axisCount })
		this.data = edgesBuffer
		this.projection = new Matrix4().ortho({
			left: -0.5 * this.width,
			right: 0.5 * this.width,
			bottom: -0.5 * this.height,
			top: 0.5 * this.height,
		} as any)

		for (let i = 0; i < axisCount; i++) {
			const storeId = edgesBuffer.add()
			const newEdge = edgesBuffer.itemAt(storeId)
			newEdge.sourcePosition = [0, 0, 0]
			newEdge.targetPosition = [
				X[i] * screenSize,
				Y[i] * screenSize,
				Z[i] * screenSize,
			]
			newEdge.weight = 1
			newEdge.color = AXIS_COLORS[i]
			newEdge.color2 = AXIS_COLORS[i]
		}
	}
}
