function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.string.replace.js";

/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Buffer } from '@luma.gl/webgl';
import { GL_UNSIGNED_BYTE, GL_FLOAT, GL_UNSIGNED_INT } from './glConstants';
import { AttributeType } from '@graspologic/memstore';
/**
 * Returns the appropriate GL type representing the given Attribute Type
 * @param type The attribute type to get the GL type for
 */

function getGLTypeFromAttributeType(type) {
  if (type === AttributeType.Float32) {
    return GL_FLOAT;
  } else if (type === AttributeType.Uint32) {
    return GL_UNSIGNED_INT;
  }

  return GL_UNSIGNED_BYTE;
}
/**
 * Adapts an attribute name to a common shader attribute naming format
 * @param attribute The name of the attribute to get the shader name for
 */


function getShaderAttributeName(attribute) {
  return "a".concat(attribute[0].toUpperCase()).concat(attribute.substring(1).replace(/\./g, '_'));
}
/**
 * Gets the byte size for the given webgl type type
 * @param type The attribute type to get the size for
 */


function getByteSizeFromWebGLType(type) {
  if (type === GL_FLOAT) {
    return 4;
  } else if (type === GL_UNSIGNED_INT) {
    return 4;
  }

  return 1;
}
/**
 * @internal
 *
 * Adapts the given memory layout for use in luma.gl
 * @param gl The rendering context
 * @param layout The memory layout
 * @param glTypeMapping The optional mapping from attribute to the webgl underlying type
 */


export function adaptMemoryLayoutToLuma(gl, layout, glTypeMapping) {
  const buffer = new Buffer(gl);
  const stride = layout.stride;
  const attributes = {};
  layout.forEach(attrib => {
    let size = attrib.size;
    let glType = getGLTypeFromAttributeType(attrib.type);
    const overridedAttribute = glTypeMapping && glTypeMapping[attrib.name];
    const totalByteSize = getByteSizeFromWebGLType(glType) * size;

    if (overridedAttribute) {
      glType = overridedAttribute.glType;
      size = overridedAttribute.size;
      const overridedByteSize = getByteSizeFromWebGLType(glType) * size;

      if (overridedByteSize !== totalByteSize) {
        throw new Error("The overrided total byte size much match the memory layout ".concat(overridedByteSize, " !== ").concat(totalByteSize));
      }
    }

    attributes[getShaderAttributeName(attrib.name)] = [buffer, _objectSpread(_objectSpread({
      divisor: 1,
      stride,
      integer: false
    }, attrib), {}, {
      size,
      type: glType
    })];
  });
  return {
    attributes,
    buffer
  };
}