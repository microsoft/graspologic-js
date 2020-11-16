attribute vec2 aVertex;
attribute vec3 aSourcePosition_start;
attribute vec3 aSourcePosition;
attribute vec2 aSourcePosition_tween;

attribute vec3 aTargetPosition_start;
attribute vec3 aTargetPosition;
attribute vec2 aTargetPosition_tween;


attribute float aWeight;
attribute vec4 aColor;
attribute vec4 aColor2;
attribute float aSaturation;
attribute float aSaturation2;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform vec2 uScreenSize;
uniform float uConstantSize;
uniform float uMinWidth;
uniform float uMaxWidth;
uniform float uAlpha;
uniform float uTime;

varying vec4 vColor;
varying vec2 vCenter;
varying vec2 vEdge;
varying float vWidth;

vec2 computeWidth(float w) {
    return vec2(1.0 / uScreenSize.x, 1.0 / uScreenSize.y) * (uMinWidth + (uMaxWidth - uMinWidth) * aWeight) * w * 0.5;
}

vec2 clipToScreen(vec4 clip, float aspect) {
    vec2 ret = clip.xy / clip.w;
    ret.x *= aspect;
    return ret;
}

vec2 computeOffsetConstant(vec2 width, vec2 direction) {
    vec2 normal = vec2(-direction.y, direction.x);
    vec2 ret = normal * width * aVertex.x;
    return ret;
}

vec2 computeOffsetPerspective(vec2 direction, float aspect) {
    float width = uMinWidth + (uMaxWidth - uMinWidth) * aWeight;
    vec2 normal = vec2(-direction.y, direction.x);
    vec2 ret = normal * aVertex.x * width * 0.5;
    ret.x /= aspect;
    return ret;
}

void main() {
  vec3 nodeA = tween_attribute(aSourcePosition_start, aSourcePosition, aSourcePosition_tween, uTime);
  vec3 nodeB = tween_attribute(aTargetPosition_start, aTargetPosition, aTargetPosition_tween, uTime);
  
  vec4 clipA = uProjection * uModelView * vec4(nodeA, 1.0);
  vec4 clipB = uProjection * uModelView * vec4(nodeB, 1.0);
  vec4 diff = clipB - clipA;
  vec4 position = clipA + diff * aVertex.y;

  float pixelAspect = uScreenSize.x / uScreenSize.y;
  vec2 screenA = clipToScreen(clipA, pixelAspect);
  vec2 screenB = clipToScreen(clipB, pixelAspect);
  vec2 direction = normalize(screenB - screenA);
  vec2 offset;

  if (uConstantSize == 1.0) {
      vec2 width = computeWidth(position.w);
      offset = computeOffsetConstant(width, direction);
  } else {
      offset = computeOffsetPerspective(direction, pixelAspect);
      offset *= 0.5 + ((position.z / max(uScreenSize.x, uScreenSize.y)) * 0.5);
  }

  gl_Position = position + vec4(offset, 0.0001, 0.0);
  vCenter = (position.xy / position.w) * uScreenSize * 0.5 + uScreenSize * 0.5;
  vEdge = ((position.xy + offset) / position.w) * uScreenSize * 0.5 + uScreenSize * 0.5;
  vWidth = length(vEdge - vCenter);

  float f;
  float L;
  float saturationScale;

  vec4 color01 = aColor / 255.0;
  vec4 color02 = aColor2 / 255.0;

  #ifdef ALPHA_MODE
  color01.a = aSaturation;
  color02.a = aSaturation2;
  saturationScale = 1.0 - max(step(1.0, aSaturation), step(1.0, aSaturation2));
  #else
  f = 1.0 - aSaturation;
  L = (0.3 * color01.r + 0.6 * color01.g + 0.1 * color01.b);
  L += (1.0 - L) * 0.5;
  color01.r += f * (L - color01.r);
  color01.g += f * (L - color01.g);
  color01.b += f * (L - color01.b);

  f = 1.0 - aSaturation2;
  L = (0.3 * color02.r + 0.6 * color02.g + 0.1 * color02.b);
  L += (1.0 - L) * 0.5;
  color02.r += f * (L - color02.r);
  color02.g += f * (L - color02.g);
  color02.b += f * (L - color02.b);
  saturationScale = min(step(1.0, aSaturation), step(1.0, aSaturation2));

  #endif

  vColor = color01 * (1.0 - aVertex.y) + color02 * aVertex.y;
  vColor.a *= uAlpha;

  gl_Position.xyz *= saturationScale;
}
