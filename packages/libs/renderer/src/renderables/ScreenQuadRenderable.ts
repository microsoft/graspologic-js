/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	GL_RGBA,
	GL_LINEAR,
	GL_TEXTURE_MIN_FILTER,
	GL_CLAMP_TO_EDGE,
	GL_TEXTURE_WRAP_S,
	GL_TEXTURE_WRAP_T,
	GL_DEPTH_TEST,
	GL_TRIANGLE_STRIP,
	GL_ONE,
	GL_ONE_MINUS_SRC_ALPHA,
	GL_FUNC_ADD,
	GL_COLOR_ATTACHMENT0,
} from '@graspologic/luma-utils'

import { Model, Geometry } from '@luma.gl/engine'
import { Texture2D, Framebuffer } from '@luma.gl/webgl'
import { Renderable, RenderOptions } from '../types'
import { createIdFactory } from '../util/ids'
import { DirtyableRenderable } from './Renderables'

import screenQuadFS from '@graspologic/renderer-glsl/dist/esm/shaders/screenQuad.fs.glsl'
import screenQuadVS from '@graspologic/renderer-glsl/dist/esm/shaders/screenQuad.vs.glsl'

const getNextId = createIdFactory('ScreenQuadInstance')

const CLEAR_FRAMEBUFFER_ARG = { color: [0, 0, 0, 0], depth: true }
const DRAW_PARAMETERS = {
	blendFunc: [GL_ONE, GL_ONE_MINUS_SRC_ALPHA, GL_ONE, GL_ONE_MINUS_SRC_ALPHA],
	blendEquation: GL_FUNC_ADD,
	depthMask: true,
	[GL_DEPTH_TEST]: true,
	blend: true,
}

const TEXTURE_PARAMETERS = {
	format: GL_RGBA,
	mipmaps: true,
	parameters: {
		[GL_TEXTURE_MIN_FILTER]: GL_LINEAR,
		[GL_TEXTURE_WRAP_S]: GL_CLAMP_TO_EDGE,
		[GL_TEXTURE_WRAP_T]: GL_CLAMP_TO_EDGE,
	},
}

/**
 * @internal
 *
 * Renderable that renders other Renderables to a buffer which gets rendered to the screen
 */
export class ScreenQuadRenderable extends DirtyableRenderable {
	private model: Model
	private framebuffer?: Framebuffer
	private texture?: Texture2D
	private drawArgument: object | undefined
	private renderables: Renderable[] = []
	private destroyed = false

	/**
	 * Constructor
	 * @param gl The gl context to render the screen quad to
	 * @param id The id of the renderable
	 */
	public constructor(
		private gl: WebGLRenderingContext,
		id: string = getNextId(),
	) {
		super()
		this.model = this._getModel(gl, id)
		this.reinit()
	}

	/**
	 * Updates the screen quad by re-rendering its child renderables
	 * @param forceRedraw True if the screen quad should be forced to be redrawn
	 * @param options The render options
	 */
	public update(forceRedraw: boolean, options: RenderOptions): void {
		if (forceRedraw || this.needsRedraw) {
			const offscreenOptions = { ...options, framebuffer: this.framebuffer }
			this._clearFramebuffer()
			this.renderables.forEach(r => r.draw(offscreenOptions))
			this.setNeedsRedraw(true)
		}
	}

	/**
	 * Gets whether or not the screen quad needs to be redrawn
	 */
	public get needsRedraw() {
		return this._needsRedraw || this.renderables.some(r => r.needsRedraw)
	}

	/**
	 * Resizes the screen quad
	 * @param width The render width
	 * @param height The render height
	 */
	public resize(width: number, height: number) {
		super.resize(width, height)

		this.reinit()

		this.renderables.forEach(r => r.resize(width, height))
	}

	/**
	 * Draws the screen quad
	 */
	public draw(): void {
		this.model.draw(this.drawArgument)
		this.setNeedsRedraw(false)
	}

	/**
	 * Adds a renderable that should be rendered to this screen quad
	 * @param renderable The renderable to add
	 */
	public addRenderable(renderable: Renderable) {
		this.renderables.push(renderable)
		renderable.resize(this.width, this.height)
		this.setNeedsRedraw(true)
	}

	/**
	 * Removes a renderable from the screen quad
	 * @param renderable The renderable to add
	 */
	public removeRenderable(renderable: Renderable) {
		this.renderables = this.renderables.filter(r => r !== renderable)
		this.setNeedsRedraw(true)
	}

	/**
	 * Destroys the screen quad
	 */
	public destroy() {
		if (!this.destroyed) {
			this.destroyed = true

			// .delete does exist here, but the typings aren't picking up for some reason
			if (this.framebuffer) {
				;(this.framebuffer as any).delete({ deleteChildren: true })
				delete this.framebuffer
			}
			if (this.texture) {
				;(this.texture as any).delete({ deleteChildren: true })
				this.texture = undefined
			}
		}
	}

	/**
	 * Reinitializes the screen quads internal buffers/textures
	 */
	private reinit() {
		this._createOffscreenFramebuffer(this.gl, this.width, this.height)

		this.drawArgument = {
			parameters: DRAW_PARAMETERS,
			uniforms: {
				uTexture: this.texture,
			},
		}
	}

	/**
	 * Clears the internal frame buffer
	 */
	private _clearFramebuffer() {
		this.framebuffer!.clear(CLEAR_FRAMEBUFFER_ARG as any)
	}

	/**
	 * Gets the shaders used for the screen quad
	 */
	private _getShaders() {
		return {
			vs: screenQuadVS,
			fs: screenQuadFS,
		}
	}

	/**
	 * Gets the model for the screen quad
	 * @param gl The gl context
	 * @param id The id of the model
	 */
	private _getModel(gl: WebGLRenderingContext, id: string) {
		const UVs: number[] = []
		const vertices: number[] = []

		/*
		 * (-1, -1)-------------_(1, -1)
		 *       |          _,-"  |
		 *       o      _,-"      o
		 *       |  _,-"          |
		 *  (-1, 1)"-------------(1, 1)
		 */
		vertices.push(-1, -1, 0)
		UVs.push(0, 0)
		vertices.push(1, -1, 0)
		UVs.push(1, 0)
		vertices.push(-1, 1, 0)
		UVs.push(0, 1)
		vertices.push(1, 1, 0)
		UVs.push(1, 1)

		const model = new Model(gl, {
			...this._getShaders(),
			id: id,
			geometry: new Geometry({
				drawMode: GL_TRIANGLE_STRIP,
				attributes: {
					aVertex: {
						value: new Float32Array(vertices),
						size: 3,
					},
					aUV: {
						value: new Float32Array(UVs),
						size: 2,
					},
				},
			}),
			isInstanced: false,
			vertexCount: 4,
		})

		return model
	}

	/**
	 * Creates the internal offscreen frame buffer
	 * @param gl The gl context
	 * @param width The width of the renderer
	 * @param height The height of the renderer
	 */
	private _createOffscreenFramebuffer(
		gl: WebGLRenderingContext,
		width: number,
		height: number,
	): void {
		const pixelRatio =
			(typeof window !== 'undefined' && window.devicePixelRatio) || 1
		this.texture = new Texture2D(gl, TEXTURE_PARAMETERS)
		this.framebuffer = new Framebuffer(gl, {
			width: width * pixelRatio,
			height: height * pixelRatio,
			depth: true,
		})
		this.framebuffer.attach({ [GL_COLOR_ATTACHMENT0]: this.texture })
		this.framebuffer.checkStatus()
	}
}
