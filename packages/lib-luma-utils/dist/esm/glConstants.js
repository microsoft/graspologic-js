/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
export const GL_DEPTH_TEST = 0x0b71; // #region primitives

export const GL_POINTS = 0x0000;
export const GL_LINES = 0x0001;
export const GL_LINE_LOOP = 0x0002;
export const GL_LINE_STRIP = 0x0003;
export const GL_TRIANGLES = 0x0004;
export const GL_TRIANGLE_STRIP = 0x0005;
export const GL_TRIANGLE_FAN = 0x0006; // #region data

export const GL_BYTE = 0x1400;
export const GL_UNSIGNED_BYTE = 0x1401;
export const GL_SHORT = 0x1402;
export const GL_UNSIGNED_SHORT = 0x1403;
export const GL_INT = 0x1404;
export const GL_UNSIGNED_INT = 0x1405;
export const GL_FLOAT = 0x1406; // #region textures

export const GL_NEAREST = 0x2600;
export const GL_LINEAR = 0x2601;
export const GL_NEAREST_MIPMAP_NEAREST = 0x2700;
export const GL_LINEAR_MIPMAP_NEAREST = 0x2701;
export const GL_NEAREST_MIPMAP_LINEAR = 0x2702;
export const GL_LINEAR_MIPMAP_LINEAR = 0x2703;
export const GL_TEXTURE_MAG_FILTER = 0x2800;
export const GL_TEXTURE_MIN_FILTER = 0x2801;
export const GL_TEXTURE_WRAP_S = 0x2802;
export const GL_TEXTURE_WRAP_T = 0x2803;
export const GL_TEXTURE_2D = 0x0de1;
export const GL_TEXTURE = 0x1702;
export const GL_TEXTURE_CUBE_MAP = 0x8513;
export const GL_TEXTURE_BINDING_CUBE_MAP = 0x8514;
export const GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
export const GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
export const GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
export const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a;
export const GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c; // export const GL_TEXTURE0 = - 31	0x84C0 - 0x84DF	A texture unit

export const GL_ACTIVE_TEXTURE = 0x84e0;
export const GL_REPEAT = 0x2901;
export const GL_CLAMP_TO_EDGE = 0x812f;
export const GL_MIRRORED_REPEAT = 0x8370; // #region Pixel formats

export const GL_DEPTH_COMPONENT = 0x1902;
export const GL_ALPHA = 0x1906;
export const GL_RGB = 0x1907;
export const GL_RGBA = 0x1908;
export const GL_LUMINANCE = 0x1909;
export const GL_LUMINANCE_ALPHA = 0x190a; // #region blending modes

export const GL_ZERO = 0;
export const GL_ONE = 1;
export const GL_SRC_COLOR = 0x0300;
export const GL_ONE_MINUS_SRC_COLOR = 0x0301;
export const GL_SRC_ALPHA = 0x0302;
export const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
export const GL_DST_ALPHA = 0x0304;
export const GL_ONE_MINUS_DST_ALPHA = 0x0305;
export const GL_DST_COLOR = 0x0306;
export const GL_ONE_MINUS_DST_COLOR = 0x0307;
export const GL_SRC_ALPHA_SATURATE = 0x0308;
export const GL_CONSTANT_COLOR = 0x8001;
export const GL_ONE_MINUS_CONSTANT_COLOR = 0x8002;
export const GL_CONSTANT_ALPHA = 0x8003;
export const GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004; // #region blending functions

export const GL_FUNC_ADD = 0x8006;
export const GL_FUNC_SUBTRACT = 0x800a;
export const GL_FUNC_REVERSE_SUBTRACT = 0x800b; // #region Framebuffer

export const GL_FRAMEBUFFER = 0x8d40;
export const GL_RENDERBUFFER = 0x8d41;
export const GL_RGBA4 = 0x8056;
export const GL_RGB5_A1 = 0x8057;
export const GL_RGB565 = 0x8d62;
export const GL_DEPTH_COMPONENT16 = 0x81a5;
export const GL_STENCIL_INDEX8 = 0x8d48;
export const GL_DEPTH_STENCIL = 0x84f9;
export const GL_RENDERBUFFER_WIDTH = 0x8d42;
export const GL_RENDERBUFFER_HEIGHT = 0x8d43;
export const GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8d44;
export const GL_RENDERBUFFER_RED_SIZE = 0x8d50;
export const GL_RENDERBUFFER_GREEN_SIZE = 0x8d51;
export const GL_RENDERBUFFER_BLUE_SIZE = 0x8d52;
export const GL_RENDERBUFFER_ALPHA_SIZE = 0x8d53;
export const GL_RENDERBUFFER_DEPTH_SIZE = 0x8d54;
export const GL_RENDERBUFFER_STENCIL_SIZE = 0x8d55;
export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8cd0;
export const GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8cd1;
export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8cd2;
export const GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8cd3;
export const GL_COLOR_ATTACHMENT0 = 0x8ce0;
export const GL_DEPTH_ATTACHMENT = 0x8d00;
export const GL_STENCIL_ATTACHMENT = 0x8d20;
export const GL_DEPTH_STENCIL_ATTACHMENT = 0x821a;
export const GL_NONE = 0;
export const GL_FRAMEBUFFER_COMPLETE = 0x8cd5;
export const GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8cd6;
export const GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8cd7;
export const GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8cd9;
export const GL_FRAMEBUFFER_UNSUPPORTED = 0x8cdd;
export const GL_FRAMEBUFFER_BINDING = 0x8ca6;
export const GL_RENDERBUFFER_BINDING = 0x8ca7;
export const GL_MAX_RENDERBUFFER_SIZE = 0x84e8;
export const GL_INVALID_FRAMEBUFFER_OPERATION = 0x0506;