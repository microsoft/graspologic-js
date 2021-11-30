/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model, Geometry } from '@luma.gl/engine';
import { Texture2D } from '@luma.gl/webgl';
import { PropertyContainer } from '@graspologic/common';
import { GL_RGBA, GL_LINEAR, GL_TEXTURE_MIN_FILTER, GL_CLAMP_TO_EDGE, GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T, GL_DEPTH_TEST, GL_TRIANGLE_STRIP, createIdFactory, } from '@graspologic/luma-utils';
import { DirtyableRenderable } from '@graspologic/renderables-base';
import labelFS from '@graspologic/renderer-glsl/dist/esm/shaders/label.fs.glsl';
import labelVS from '@graspologic/renderer-glsl/dist/esm/shaders/label.vs.glsl';
// We have no equivalent in the typings
const getNextId = createIdFactory('LabelInstance');
/**
 * A renderable that can be added to a GraphRenderer for rendering labels
 */
export class LabelRenderable extends DirtyableRenderable {
    renderTextureHandler = () => this._renderTexture();
    _text = new PropertyContainer('');
    _font = new PropertyContainer('monospace');
    _fontSize = new PropertyContainer(18);
    _weight = new PropertyContainer(0);
    _horizontalPadding = new PropertyContainer(8);
    _verticalPadding = new PropertyContainer(2);
    _outline = new PropertyContainer(4);
    _backgroundColor = new PropertyContainer('rgb(134, 135, 159)');
    _outlineColor = new PropertyContainer('rgb(107, 108, 127)');
    _textColor = new PropertyContainer('rgb(240, 241, 255)');
    model;
    canvas;
    ctx;
    texture;
    position01 = [];
    /**
     * Constructor
     * @param gl The gl context to render to
     * @param id The id for the renderable
     */
    constructor(gl, id = getNextId()) {
        super();
        this.model = this._createModel(gl, id);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') || undefined;
        this.texture = new Texture2D(gl, {
            format: GL_RGBA,
            mipmaps: false,
            parameters: {
                [GL_TEXTURE_MIN_FILTER]: GL_LINEAR,
                [GL_TEXTURE_WRAP_S]: GL_CLAMP_TO_EDGE,
                [GL_TEXTURE_WRAP_T]: GL_CLAMP_TO_EDGE,
            },
        });
        this._text.on('change', this.renderTextureHandler);
        this._font.on('change', this.renderTextureHandler);
        this._fontSize.on('change', this.renderTextureHandler);
        this._weight.on('change', this.makeDirtyHandler);
        this._horizontalPadding.on('change', this.renderTextureHandler);
        this._verticalPadding.on('change', this.renderTextureHandler);
        this._backgroundColor.on('change', this.renderTextureHandler);
        this._outlineColor.on('change', this.renderTextureHandler);
        this._textColor.on('change', this.renderTextureHandler);
    }
    /**
     * Gets the label to display
     */
    get text() {
        return this._text.value;
    }
    /**
     * Sets the label to display
     */
    set text(value) {
        this._text.value = value;
    }
    /**
     * Sets the font
     */
    get font() {
        return this._font.value;
    }
    /**
     * Gets the font
     */
    set font(value) {
        this._font.value = value;
    }
    /**
     * Gets the font size
     */
    get fontSize() {
        return this._fontSize.value;
    }
    /**
     * Sets the font size
     */
    set fontSize(value) {
        this._fontSize.value = value;
    }
    /**
     * Gets the horizontal padding
     */
    get horizontalPadding() {
        return this._horizontalPadding.value;
    }
    /**
     * Sets the horizontal padding
     */
    set horizontalPadding(value) {
        this._horizontalPadding.value = value;
    }
    /**
     * Gets the vertical padding
     */
    get verticalPadding() {
        return this._verticalPadding.value;
    }
    /**
     * Sets the vertical padding
     */
    set verticalPadding(value) {
        this._verticalPadding.value = value;
    }
    /**
     * Gets the outline width
     */
    get outlineWidth() {
        return this._outline.value;
    }
    /**
     * Sets the outline width
     */
    set outlineWidth(value) {
        this._outline.value = value;
    }
    /**
     * Gets the outline color
     */
    get outlineColor() {
        return this._outlineColor.value;
    }
    /**
     * Sets the outline color
     */
    set outlineColor(value) {
        this._outlineColor.value = value;
    }
    /**
     * Gets the background color
     */
    get backgroundColor() {
        return this._backgroundColor.value;
    }
    /**
     * Sets the background color
     */
    set backgroundColor(value) {
        this._backgroundColor.value = value;
    }
    /**
     * Gets the text color
     */
    get textColor() {
        return this._textColor.value;
    }
    /**
     * Sets the text color
     */
    set textColor(value) {
        this._outlineColor.value = value;
    }
    /**
     * Gets the weight
     */
    get weight() {
        return this._weight.value;
    }
    /**
     * Sets the weight
     */
    set weight(value) {
        this._weight.value = value;
    }
    /**
     * Draws the LabelRenderable
     * @param options The render options
     */
    draw(options) {
        const { modelViewMatrix, projectionMatrix, canvasPixelSize, minRadius, maxRadius, } = options;
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
            });
        }
        this.setNeedsRedraw(false);
    }
    /**
     * Sets the position of the label
     * @param position01 The position of the label
     */
    setPositions(position01) {
        this.position01 = position01;
    }
    /**
     * Gets the set of shaders used for the label renderable
     */
    _getShaders() {
        return {
            vs: labelVS,
            fs: labelFS,
            modules: [],
        };
    }
    /**
     * Creates a model that represents a label
     * @param gl The gl context
     * @param id The id of the model
     */
    _createModel(gl, id) {
        const UVs = [];
        const vertices = [];
        /*
         *  (0, 0)-------------_(1, 0)
         *      |          _,-"  |
         *      o      _,-"      o
         *      |  _,-"          |
         *  (0, 1)"-------------(1, 1)
         */
        vertices.push(0, 0, 0);
        UVs.push(0, 1);
        vertices.push(1, 0, 0);
        UVs.push(1, 1);
        vertices.push(0, 1, 0);
        UVs.push(0, 0);
        vertices.push(1, 1, 0);
        UVs.push(1, 0);
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
        });
    }
    /**
     * Renders the label to a texture
     */
    _renderTexture() {
        if (!this.ctx) {
            return;
        }
        const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
        this.ctx.font = `${this.fontSize * pixelRatio}px monospace`;
        this.canvas.width =
            this.ctx.measureText(this.text).width +
                this.horizontalPadding * 2 * pixelRatio;
        this.canvas.height =
            this.fontSize * pixelRatio + this.verticalPadding * 2 * pixelRatio;
        this.ctx.font = `${this.fontSize * pixelRatio}px ${this.font}`;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.lineWidth = this.outlineWidth;
        this.ctx.strokeStyle = this.outlineColor;
        this._roundRect(this.outlineWidth, this.outlineWidth, this.canvas.width - this.outlineWidth * 2, this.canvas.height - this.outlineWidth * 2, 10, true);
        this.ctx.fillStyle = this.textColor;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.canvas.width * 0.5, this.canvas.height * 0.5);
        this.texture.setImageData({
            pixels: this.canvas,
            width: this.canvas.width,
            height: this.canvas.height,
        });
        this.setNeedsRedraw(true);
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
    _roundRect(x, y, width, height, radius = 5, fill = false, stroke = true) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            if (stroke) {
                ctx.stroke();
            }
            if (fill) {
                ctx.fill();
            }
        }
    }
}
