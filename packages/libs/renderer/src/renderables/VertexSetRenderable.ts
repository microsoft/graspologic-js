/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// @ts-ignore
import * as GL from '@luma.gl/constants'
import { Model, Geometry, Buffer } from 'luma.gl'
import { RenderOptions } from '../types/internal'
import { adaptMemoryLayoutToLuma } from '../util'
import { PropertyContainer } from '../util/Properties'
import { areColorsEqual } from '../util/equality'
import { createIdFactory } from '../util/ids'
import { DataboundRenderable } from './Renderables'

// @ts-ignore
import highlightFS from './shaders/highlight.fs.glsl'

// @ts-ignore
import highlightVS from './shaders/highlight.vs.glsl'
import { Node } from '@graspologic/graph'
import { createLayoutBuilder } from '@graspologic/memstore'

// We have no equivalent in the typings
const getNextId = createIdFactory('VertexHighlight')

export const position = Symbol('VertexBody::position')
export const radius = Symbol('VertexBody::radius')
export const weight = Symbol('VertexBody::weight')
export const visible = Symbol('VertexBody::visible')
export const shape = Symbol('VertexBody::shape')

export const LAYOUT = createLayoutBuilder()
	.addFloat32Vec3('position')
	.addFloat32('weight')
	.addFloat32('radius')
	.addFloat32('shape')
	.build()

export const LAYOUT_STRIDE = LAYOUT.stride
export const POSITION_OFFSET = LAYOUT.get('position')!.offset
export const WEIGHT_OFFSET = LAYOUT.get('weight')!.offset
export const RADIUS_OFFSET = LAYOUT.get('radius')!.offset
export const SHAPE_OFFSET = LAYOUT.get('shape')!.offset

/**
 * A vertex renderable for a multiple vertices, for use in rendering like highlights
 */
export class VertexSetRenderable extends DataboundRenderable<Node[]> {
	private model: Model
	private nodeGLBuffer: Buffer
	private _color = new PropertyContainer(
		[160 / 255, 240 / 255, 255 / 255, 207 / 255],
		areColorsEqual,
	)

	/**
	 * Constructor
	 * @param gl The gl context
	 * @param id The id of the renderable
	 */
	public constructor(gl: WebGLRenderingContext, private id = getNextId()) {
		super()
		const { model, buffer } = this._createModel(gl, id)

		this.model = model
		this.nodeGLBuffer = buffer
		this._color.onChange.subscribe(this.makeDirtyHandler)
	}

	/**
	 * Gets the color for the renderable
	 */
	public get color(): number[] {
		return this._color.value
	}

	/**
	 * Sets the color for the renderable
	 */
	public set color(value: number[]) {
		this._color.value = value
	}

	/**
	 * Draws the VertexSetHighlightRenderable
	 * @param options The render options
	 */
	public draw(options: RenderOptions): void {
		const {
			modelViewMatrix,
			projectionMatrix,
			minRadius,
			maxRadius,
			weightToPixel,
		} = options
		if (this.enabled) {
			this.model.draw({
				parameters: {
					depthMask: false,
					[GL.DEPTH_TEST]: false,
					blend: true,
				},
				uniforms: {
					uModelView: modelViewMatrix,
					uProjection: projectionMatrix,
					uMinRadius: minRadius,
					uMaxRadius: maxRadius,
					uWeightScale: weightToPixel,
					uOutline: 1,
					uColor: this.color.map(c => c * 255),
				},
			})
		}
		this.setNeedsRedraw(false)
	}

	/**
	 * Sets the vertex to be rendered
	 * @param vertices The vertex to render
	 */
	protected handleSetData(vertices: Node[]): void {
		const buffer = new ArrayBuffer(vertices.length * LAYOUT_STRIDE)
		const view = new DataView(buffer)
		let vertex: Node
		let pos: number[]
		let itemByteOffset: number
		for (let i = 0; i < vertices.length; i++) {
			vertex = vertices[i]
			itemByteOffset = i * LAYOUT_STRIDE
			if (vertex) {
				pos = vertex.position

				// Position
				view.setFloat32(itemByteOffset + POSITION_OFFSET, pos[0], true)
				view.setFloat32(itemByteOffset + POSITION_OFFSET + 4, pos[1], true)
				view.setFloat32(itemByteOffset + POSITION_OFFSET + 8, pos[2], true)

				view.setFloat32(itemByteOffset + RADIUS_OFFSET, vertex.radius, true)
				view.setFloat32(itemByteOffset + WEIGHT_OFFSET, vertex.weight, true)
				view.setFloat32(itemByteOffset + SHAPE_OFFSET, vertex.shape, true)
			}
		}
		this._updateModelData(buffer, vertices.length)
		this.setNeedsRedraw(true)
	}

	/**
	 * Updates the data bound to the model
	 * @param data The raw data buffer
	 * @param count The number of nodes
	 */
	private _updateModelData(data: ArrayBuffer, count: number): void {
		this.nodeGLBuffer.setData(new Uint8Array(data))
		this.model.setInstanceCount(count)
	}

	/**
	 * Gets the shaders used with the vertex body
	 */
	private _getShaders() {
		return {
			vs: highlightVS,
			fs: highlightFS,
			modules: [],
		}
	}

	/**
	 * Creates the model used for rendering the vertex body
	 * @param gl The gl context
	 * @param id The id of the model
	 */
	private _createModel(gl: WebGLRenderingContext, id: string) {
		// prettier-ignore
		const positions = [
			-1, -1, 0,
			 1, -1, 0,
			-1,  1, 0,
			 1,  1, 0,
		]

		const { buffer, attributes } = adaptMemoryLayoutToLuma(gl, LAYOUT)

		return {
			model: new Model(gl, {
				...this._getShaders(),
				id,
				isInstanced: true,
				shaderCache: null,
				geometry: new Geometry({
					drawMode: GL.TRIANGLE_STRIP,
					vertexCount: 4,
					attributes: {
						aVertex: {
							value: new Float32Array(positions),
							size: 3,
							type: GL.FLOAT,
						},
					},
				}),
				attributes,
			}),
			buffer,
		}
	}
}
