function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.float32-array.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Model, Geometry } from '@luma.gl/engine';
import { areColorsEqual, PropertyContainer } from '@graspologic/common';
import { GL_DEPTH_TEST, GL_FLOAT, GL_TRIANGLE_STRIP, adaptMemoryLayoutToLuma, createIdFactory } from '@graspologic/luma-utils';
import { createLayoutBuilder } from '@graspologic/memstore';
import { DataboundRenderable } from '@graspologic/renderables-base';
import highlightFS from '@graspologic/renderer-glsl/dist/esm/shaders/highlight.fs.glsl';
import highlightVS from '@graspologic/renderer-glsl/dist/esm/shaders/highlight.vs.glsl'; // We have no equivalent in the typings

const getNextId = createIdFactory('VertexHighlight');
export const position = Symbol('VertexBody::position');
export const radius = Symbol('VertexBody::radius');
export const weight = Symbol('VertexBody::weight');
export const visible = Symbol('VertexBody::visible');
export const shape = Symbol('VertexBody::shape');
export const LAYOUT = createLayoutBuilder().addFloat32Vec3('position').addFloat32('weight').addFloat32('radius').addFloat32('shape').build();
export const LAYOUT_STRIDE = LAYOUT.stride;
export const POSITION_OFFSET = LAYOUT.get('position').offset;
export const WEIGHT_OFFSET = LAYOUT.get('weight').offset;
export const RADIUS_OFFSET = LAYOUT.get('radius').offset;
export const SHAPE_OFFSET = LAYOUT.get('shape').offset;
/**
 * A vertex renderable for a multiple vertices, for use in rendering like highlights
 */

export class VertexSetRenderable extends DataboundRenderable {
  /**
   * Constructor
   * @param gl The gl context
   * @param id The id of the renderable
   */
  constructor(gl) {
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getNextId();
    super();

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "nodeGLBuffer", void 0);

    _defineProperty(this, "_color", new PropertyContainer([160 / 255, 240 / 255, 255 / 255, 207 / 255], areColorsEqual));

    this.id = id;

    const {
      model,
      buffer
    } = this._createModel(gl, id);

    this.model = model;
    this.nodeGLBuffer = buffer;

    this._color.on('change', this.makeDirtyHandler);
  }
  /**
   * Gets the color for the renderable
   */


  get color() {
    return this._color.value;
  }
  /**
   * Sets the color for the renderable
   */


  set color(value) {
    this._color.value = value;
  }
  /**
   * Draws the VertexSetHighlightRenderable
   * @param options The render options
   */


  draw(options) {
    const {
      modelViewMatrix,
      projectionMatrix,
      minRadius,
      maxRadius,
      weightToPixel
    } = options;

    if (this.enabled) {
      this.model.draw({
        parameters: {
          depthMask: false,
          [GL_DEPTH_TEST]: false,
          blend: true
        },
        uniforms: {
          uModelView: modelViewMatrix,
          uProjection: projectionMatrix,
          uMinRadius: minRadius * weightToPixel,
          uMaxRadius: maxRadius * weightToPixel,
          uOutline: 1,
          uColor: this.color.map(c => c * 255)
        }
      });
    }

    this.setNeedsRedraw(false);
  }
  /**
   * Sets the vertex to be rendered
   * @param vertices The vertex to render
   */


  handleSetData(vertices) {
    const buffer = new ArrayBuffer(vertices.length * LAYOUT_STRIDE);
    const view = new DataView(buffer);
    let vertex;
    let pos;
    let itemByteOffset;

    for (let i = 0; i < vertices.length; i++) {
      vertex = vertices[i];
      itemByteOffset = i * LAYOUT_STRIDE;

      if (vertex) {
        pos = vertex.position; // Position

        view.setFloat32(itemByteOffset + POSITION_OFFSET, pos[0], true);
        view.setFloat32(itemByteOffset + POSITION_OFFSET + 4, pos[1], true);
        view.setFloat32(itemByteOffset + POSITION_OFFSET + 8, pos[2], true);
        view.setFloat32(itemByteOffset + RADIUS_OFFSET, vertex.radius, true);
        view.setFloat32(itemByteOffset + WEIGHT_OFFSET, vertex.weight, true);
        view.setFloat32(itemByteOffset + SHAPE_OFFSET, vertex.shape, true);
      }
    }

    this._updateModelData(buffer, vertices.length);

    this.setNeedsRedraw(true);
  }
  /**
   * Updates the data bound to the model
   * @param data The raw data buffer
   * @param count The number of nodes
   */


  _updateModelData(data, count) {
    this.nodeGLBuffer.setData(new Uint8Array(data));
    this.model.setInstanceCount(count);
  }
  /**
   * Gets the shaders used with the vertex body
   */


  _getShaders() {
    return {
      vs: highlightVS,
      fs: highlightFS,
      modules: []
    };
  }
  /**
   * Creates the model used for rendering the vertex body
   * @param gl The gl context
   * @param id The id of the model
   */


  _createModel(gl, id) {
    // prettier-ignore
    const positions = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
    const {
      buffer,
      attributes
    } = adaptMemoryLayoutToLuma(gl, LAYOUT);
    return {
      model: new Model(gl, _objectSpread(_objectSpread({}, this._getShaders()), {}, {
        id,
        isInstanced: true,
        shaderCache: null,
        geometry: new Geometry({
          drawMode: GL_TRIANGLE_STRIP,
          vertexCount: 4,
          attributes: {
            aVertex: {
              value: new Float32Array(positions),
              size: 3,
              type: GL_FLOAT
            }
          }
        }),
        attributes
      })),
      buffer
    };
  }

}