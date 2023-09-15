/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { RenderOptions} from '@graspologic/common';
import { PropertyContainer } from '@graspologic/common'
import {
	GL_RGBA,
	GL_LINEAR,
	GL_TEXTURE_MIN_FILTER,
	GL_CLAMP_TO_EDGE,
	GL_TEXTURE_WRAP_S,
	GL_TEXTURE_WRAP_T,
	GL_DEPTH_TEST,
	GL_TRIANGLE_STRIP,
	createIdFactory,
} from '@graspologic/luma-utils'
import { DirtyableRenderable } from '@graspologic/renderables-base'

import labelFS from '@graspologic/renderer-glsl/dist/esm/shaders/label.fs.glsl'
import labelVS from '@graspologic/renderer-glsl/dist/esm/shaders/label.vs.glsl'
import { Model, Geometry } from '@luma.gl/engine'
import { Texture2D } from '@luma.gl/webgl'

// We have no equivalent in the typings
const getNextId = createIdFactory('LabelInstance')

/**
 * A renderable that can be added to a GraphRenderer for rendering labels
 */
export class LabelRenderable extends DirtyableRenderable {
	private renderTextureHandler = (): void => this._renderTexture()

	private _text = new PropertyContainer('')
	private _font = new PropertyContainer('monospace')
	private _fontSize = new PropertyContainer(18)
	private _weight = new PropertyContainer(0)
	private _horizontalPadding = new PropertyContainer(8)
	private _verticalPadding = new PropertyContainer(2)
	private _outline = new PropertyContainer(4)
	private _backgroundColor = new PropertyContainer('rgb(134, 135, 159)')
	private _outlineColor = new PropertyContainer('rgb(107, 108, 127)')
	private _textColor = new PropertyContainer('rgb(240, 241, 255)')

	private model: Model
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D | undefined
	private texture: Texture2D
	private position01: number[] = []

	/**
	 * Constructor
	 * @param gl The gl context to render to
	 * @param id The id for the renderable
	 */
	public constructor(gl: WebGLRenderingContext, id = getNextId()) {
		super()
		this.model = this._createModel(gl, id)

		this.canvas = document.createElement('canvas')
		this.ctx = this.canvas.getContext('2d') || undefined

		this.texture = new Texture2D(gl, {
			format: GL_RGBA,
			mipmaps: false,
			parameters: {
				[GL_TEXTURE_MIN_FILTER]: GL_LINEAR,
				[GL_TEXTURE_WRAP_S]: GL_CLAMP_TO_EDGE,
				[GL_TEXTURE_WRAP_T]: GL_CLAMP_TO_EDGE,
			},
		})

		this._text.on('change', this.renderTextureHandler)
		this._font.on('change', this.renderTextureHandler)
		this._fontSize.on('change', this.renderTextureHandler)
		this._weight.on('change', this.makeDirtyHandler)
		this._horizontalPadding.on('change', this.renderTextureHandler)
		this._verticalPadding.on('change', this.renderTextureHandler)
		this._backgroundColor.on('change', this.renderTextureHandler)
		this._outlineColor.on('change', this.renderTextureHandler)
		this._textColor.on('change', this.renderTextureHandler)
	}

	/**
	 * Gets the label to display
	 */
	public get text(): string {
		return this._text.value
	}

	/**
	 * Sets the label to display
	 */
	public set text(value: string) {
		this._text.value = value
	}

	/**
	 * Sets the font
	 */
	public get font(): string {
		return this._font.value
	}

	/**
	 * Gets the font
	 */
	public set font(value: string) {
		this._font.value = value
	}

	/**
	 * Gets the font size
	 */
	public get fontSize(): number {
		return this._fontSize.value
	}

	/**
	 * Sets the font size
	 */
	public set fontSize(value: number) {
		this._fontSize.value = value
	}

	/**
	 * Gets the horizontal padding
	 */
	public get horizontalPadding(): number {
		return this._horizontalPadding.value
	}

	/**
	 * Sets the horizontal padding
	 */
	public set horizontalPadding(value: number) {
		this._horizontalPadding.value = value
	}

	/**
	 * Gets the vertical padding
	 */
	public get verticalPadding(): number {
		return this._verticalPadding.value
	}

	/**
	 * Sets the vertical padding
	 */
	public set verticalPadding(value: number) {
		this._verticalPadding.value = value
	}

	/**
	 * Gets the outline width
	 */
	public get outlineWidth(): number {
		return this._outline.value
	}

	/**
	 * Sets the outline width
	 */
	public set outlineWidth(value: number) {
		this._outline.value = value
	}

	/**
	 * Gets the outline color
	 */
	public get outlineColor(): string {
		return this._outlineColor.value
	}

	/**
	 * Sets the outline color
	 */
	public set outlineColor(value: string) {
		this._outlineColor.value = value
	}

	/**
	 * Gets the background color
	 */
	public get backgroundColor(): string {
		return this._backgroundColor.value
	}

	/**
	 * Sets the background color
	 */
	public set backgroundColor(value: string) {
		this._backgroundColor.value = value
	}

	/**
	 * Gets the text color
	 */
	public get textColor(): string {
		return this._textColor.value
	}

	/**
	 * Sets the text color
	 */
	public set textColor(value: string) {
		this._outlineColor.value = value
	}

	/**
	 * Gets the weight
	 */
	public get weight(): number {
		return this._weight.value
	}

	/**
	 * Sets the weight
	 */
	public set weight(value: number) {
		this._weight.value = value
	}

	/**
	 * Draws the LabelRenderable
	 * @param options The render options
	 */
	public draw(options: RenderOptions): void {
		const {
			modelViewMatrix,
			projectionMatrix,
			canvasPixelSize,
			minRadius,
			maxRadius,
		} = options
		if (this.enabled) {
			this.model.draw({
				parameters: {
					depthMask: false,
					[GL_DEPTH_TEST]: false,
					blend: true,
				},
				uniforms: {
					uPosition01: this.position01,
					uModelView: modelViewMatrix,
					uProjection: projectionMatrix,
					uTexture: this.texture,
					uScreenSize: canvasPixelSize,
					uSize: [this.canvas.width, this.canvas.height],
					uMinRadius: minRadius,
					uMaxRadius: maxRadius,
					uWeight: this.weight,
				},
			})
		}
		this.setNeedsRedraw(false)
	}

	/**
	 * Sets the position of the label
	 * @param position01 The position of the label
	 */
	public setPositions(position01: number[]): void {
		this.position01 = position01
	}

	/**
	 * Gets the set of shaders used for the label renderable
	 */
	private _getShaders(): {
		vs: string
		fs: string
		modules: any[]
	} {
		return {
			vs: labelVS,
			fs: labelFS,
			modules: [],
		}
	}

	/**
	 * Creates a model that represents a label
	 * @param gl The gl context
	 * @param id The id of the model
	 */
	private _createModel(gl: WebGLRenderingContext, id: string): Model {
		const UVs: number[] = []
		const vertices: number[] = []

		/*
		 *  (0, 0)-------------_(1, 0)
		 *      |          _,-"  |
		 *      o      _,-"      o
		 *      |  _,-"          |
		 *  (0, 1)"-------------(1, 1)
		 */
		vertices.push(0, 0, 0)
		UVs.push(0, 1)
		vertices.push(1, 0, 0)
		UVs.push(1, 1)
		vertices.push(0, 1, 0)
		UVs.push(0, 0)
		vertices.push(1, 1, 0)
		UVs.push(1, 0)

		return new Model(gl, {
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
	}

	/**
	 * Renders the label to a texture
	 */
	private _renderTexture(): void {
		if (!this.ctx) {
			return
		}
		const pixelRatio =
			(typeof window !== 'undefined' && window.devicePixelRatio) || 1

		this.ctx.font = `${this.fontSize * pixelRatio}px monospace`

		this.canvas.width =
			this.ctx.measureText(this.text).width +
			this.horizontalPadding * 2 * pixelRatio
		this.canvas.height =
			this.fontSize * pixelRatio + this.verticalPadding * 2 * pixelRatio

		this.ctx.font = `${this.fontSize * pixelRatio}px ${this.font}`

		this.ctx.fillStyle = this.backgroundColor
		this.ctx.lineWidth = this.outlineWidth
		this.ctx.strokeStyle = this.outlineColor
		this._roundRect(
			this.outlineWidth,
			this.outlineWidth,
			this.canvas.width - this.outlineWidth * 2,
			this.canvas.height - this.outlineWidth * 2,
			10,
			true,
		)

		this.ctx.fillStyle = this.textColor
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(
			this.text,
			this.canvas.width * 0.5,
			this.canvas.height * 0.5,
		)

		this.texture.setImageData({
			pixels: this.canvas,
			width: this.canvas.width,
			height: this.canvas.height,
		})

		this.setNeedsRedraw(true)
	}

	/**
	 * Draws a rounded rect to the current ctx
	 * @param x The x location of the rectangle
	 * @param y The y location of the rectangle
	 * @param width The width of the rectangle
	 * @param height The height of the rectangle
	 * @param radius The radius of the corners
	 * @param fill The fill of the rectangle
	 * @param stroke The stroke of the rectangle
	 */
	private _roundRect(
		x: number,
		y: number,
		width: number,
		height: number,
		radius = 5,
		fill = false,
		stroke = true,
	): void {
		const ctx = this.ctx

		if (ctx) {
			ctx.beginPath()
			ctx.moveTo(x + radius, y)
			ctx.lineTo(x + width - radius, y)
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
			ctx.lineTo(x + width, y + height - radius)
			ctx.quadraticCurveTo(
				x + width,
				y + height,
				x + width - radius,
				y + height,
			)
			ctx.lineTo(x + radius, y + height)
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
			ctx.lineTo(x, y + radius)
			ctx.quadraticCurveTo(x, y, x + radius, y)
			ctx.closePath()

			if (stroke) {
				ctx.stroke()
			}

			if (fill) {
				ctx.fill()
			}
		}
	}
}
