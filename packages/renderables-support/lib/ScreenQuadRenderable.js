/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model, Geometry } from '@luma.gl/engine';
import { Texture2D, Framebuffer } from '@luma.gl/webgl';
import { GL_RGBA, GL_LINEAR, GL_TEXTURE_MIN_FILTER, GL_CLAMP_TO_EDGE, GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T, GL_DEPTH_TEST, GL_TRIANGLE_STRIP, GL_ONE, GL_ONE_MINUS_SRC_ALPHA, GL_FUNC_ADD, GL_COLOR_ATTACHMENT0, createIdFactory, } from '@graspologic/luma-utils';
import { DirtyableRenderable } from '@graspologic/renderables-base';
import screenQuadFS from '@graspologic/renderer-glsl/dist/esm/shaders/screenQuad.fs.glsl';
import screenQuadVS from '@graspologic/renderer-glsl/dist/esm/shaders/screenQuad.vs.glsl';
const getNextId = createIdFactory('ScreenQuadInstance');
const CLEAR_FRAMEBUFFER_ARG = { color: [0, 0, 0, 0], depth: true };
const DRAW_PARAMETERS = {
    blendFunc: [GL_ONE, GL_ONE_MINUS_SRC_ALPHA, GL_ONE, GL_ONE_MINUS_SRC_ALPHA],
    blendEquation: GL_FUNC_ADD,
    depthMask: true,
    [GL_DEPTH_TEST]: true,
    blend: true,
};
const TEXTURE_PARAMETERS = {
    format: GL_RGBA,
    mipmaps: true,
    parameters: {
        [GL_TEXTURE_MIN_FILTER]: GL_LINEAR,
        [GL_TEXTURE_WRAP_S]: GL_CLAMP_TO_EDGE,
        [GL_TEXTURE_WRAP_T]: GL_CLAMP_TO_EDGE,
    },
};
/**
 * @internal
 *
 * Renderable that renders other Renderables to a buffer which gets rendered to the screen
 */
export class ScreenQuadRenderable extends DirtyableRenderable {
    gl;
    model;
    framebuffer;
    texture;
    drawArgument;
    _renderables = [];
    destroyed = false;
    /**
     * Constructor
     * @param gl The gl context to render the screen quad to
     * @param id The id of the renderable
     */
    constructor(gl, id = getNextId()) {
        super();
        this.gl = gl;
        this.model = this._getModel(gl, id);
        this.reinit();
    }
    /**
     * Updates the screen quad by re-rendering its child renderables
     * @param forceRedraw True if the screen quad should be forced to be redrawn
     * @param options The render options
     */
    update(forceRedraw, options) {
        if (forceRedraw || this.needsRedraw) {
            const offscreenOptions = { ...options, framebuffer: this.framebuffer };
            this._clearFramebuffer();
            this._renderables.forEach(r => r.draw(offscreenOptions));
            this.setNeedsRedraw(true);
        }
    }
    /**
     * Gets whether or not the screen quad needs to be redrawn
     */
    get needsRedraw() {
        return this._needsRedraw || this._renderables.some(r => r.needsRedraw);
    }
    /**
     * Resizes the screen quad
     * @param width The render width
     * @param height The render height
     */
    resize(width, height) {
        super.resize(width, height);
        this.reinit();
        this._renderables.forEach(r => r.resize(width, height));
    }
    /**
     * Draws the screen quad
     */
    draw() {
        this.model.draw(this.drawArgument);
        this.setNeedsRedraw(false);
    }
    /**
     * Adds a renderable that should be rendered to this screen quad
     * @param renderable The renderable to add
     */
    addRenderable(renderable) {
        this._renderables.push(renderable);
        renderable.resize(this.width, this.height);
        this.setNeedsRedraw(true);
    }
    /**
     * Removes a renderable from the screen quad
     * @param renderable The renderable to add
     */
    removeRenderable(renderable) {
        this._renderables = this._renderables.filter(r => r !== renderable);
        this.setNeedsRedraw(true);
    }
    /**
     * Gets the list of renderables contained in this renderable
     */
    renderables() {
        return this._renderables;
    }
    /**
     * Destroys the screen quad
     */
    destroy() {
        if (!this.destroyed) {
            this.destroyed = true;
            // .delete does exist here, but the typings aren't picking up for some reason
            if (this.framebuffer) {
                ;
                this.framebuffer.delete({ deleteChildren: true });
                delete this.framebuffer;
            }
            if (this.texture) {
                ;
                this.texture.delete({ deleteChildren: true });
                this.texture = undefined;
            }
        }
    }
    /**
     * Reinitializes the screen quads internal buffers/textures
     */
    reinit() {
        this._createOffscreenFramebuffer(this.gl, this.width, this.height);
        this.drawArgument = {
            parameters: DRAW_PARAMETERS,
            uniforms: {
                uTexture: this.texture,
            },
        };
    }
    /**
     * Clears the internal frame buffer
     */
    _clearFramebuffer() {
        this.framebuffer.clear(CLEAR_FRAMEBUFFER_ARG);
    }
    /**
     * Gets the shaders used for the screen quad
     */
    _getShaders() {
        return {
            vs: screenQuadVS,
            fs: screenQuadFS,
        };
    }
    /**
     * Gets the model for the screen quad
     * @param gl The gl context
     * @param id The id of the model
     */
    _getModel(gl, id) {
        const UVs = [];
        const vertices = [];
        /*
         * (-1, -1)-------------_(1, -1)
         *       |          _,-"  |
         *       o      _,-"      o
         *       |  _,-"          |
         *  (-1, 1)"-------------(1, 1)
         */
        vertices.push(-1, -1, 0);
        UVs.push(0, 0);
        vertices.push(1, -1, 0);
        UVs.push(1, 0);
        vertices.push(-1, 1, 0);
        UVs.push(0, 1);
        vertices.push(1, 1, 0);
        UVs.push(1, 1);
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
        });
        return model;
    }
    /**
     * Creates the internal offscreen frame buffer
     * @param gl The gl context
     * @param width The width of the renderer
     * @param height The height of the renderer
     */
    _createOffscreenFramebuffer(gl, width, height) {
        const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
        this.texture = new Texture2D(gl, TEXTURE_PARAMETERS);
        this.framebuffer = new Framebuffer(gl, {
            width: width * pixelRatio,
            height: height * pixelRatio,
            depth: true,
        });
        this.framebuffer.attach({ [GL_COLOR_ATTACHMENT0]: this.texture });
        this.framebuffer.checkStatus();
    }
}
