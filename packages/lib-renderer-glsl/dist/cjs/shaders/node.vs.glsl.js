module.exports = `#version 300 es
#define attribute in
#define varying out
#define GL2

#define SQRT_2 1.414213562373095

attribute vec3 aVertex;

attribute vec3 aPosition_start;
attribute vec3 aPosition;
attribute highp vec2 aPosition_tween;

attribute float aVisible;
attribute float aWeight;
attribute float aRadius;
attribute float aShape;

attribute vec4 aColor_start;
attribute vec4 aColor;
attribute vec2 aColor_tween;

attribute vec3 aPickingColor;
attribute float aSaturation;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform float uMinRadius;
uniform float uMaxRadius;
uniform vec2 uScreenSize;
uniform highp float uTime;

varying vec2 vVertex;
varying float vRadius;
varying vec4 vColor;
varying float vShape;

varying float vOnScreen;

void main() {
  picking_setPickingColor(aPickingColor);

  // Why radius_scale?
  // Instead of inscribing the circle inside the square, make the square
  // inscribe the circle
  // i.e. This bumps up the size of the circle, so when a user says
  // I have two circles, one at (0, 0) and one at (2, 0) and they both have a radius of one.
  // The circles should touch each other, without this scaling, the circles wont touch each other
  // because when we calculate our fragment, we scale a square, and then make a circle out of that.
  float radius_scale = aShape == 3.0 ? SQRT_2 : 1.0;

  vRadius = aRadius > 0.0 ? aRadius * radius_scale : (uMinRadius + aWeight * (uMaxRadius - uMinRadius));
  vShape = aShape;

  vec3 position = tween_attribute(aPosition_start, aPosition, aPosition_tween, uTime);
  vec3 rotatedVert = vShape == 2.0 ?
    // If we are a diamond shape, then rotate
    vec3((aVertex.x + aVertex.y) / SQRT_2, (aVertex.y - aVertex.x) / SQRT_2, aVertex.z) :
    aVertex;

  vec3 sized = (vec4(rotatedVert, 1.0) * uModelView).xyz * vRadius;

  vVertex = (aVertex * vRadius).xy;
  gl_Position = uProjection * uModelView * vec4(position + sized, 1.0);
  vColor = tween_attribute(aColor_start, aColor, aColor_tween, uTime) / 255.0;

  vColor.a = aSaturation;
  // float f = 1.0 - aSaturation;
  // float L = (0.3 * vColor.r + 0.6 * vColor.g + 0.1 * vColor.b);
  // L += (1.0 - L) * 0.5;
  // vColor.r += f * (L - vColor.r);
  // vColor.g += f * (L - vColor.g);
  // vColor.b += f * (L - vColor.b);

  /* calculate the center of the node with respect to the screen (-1, -1) to (1, 1) */
  vec4 center =  uProjection * uModelView * vec4(position, 1.0);
  vec2 center2D = center.xy / center.w;

  /* calculate the current vertex with respect to the screen (-1, -1) to (1, 1) */
  vec2 vertex2D = gl_Position.xy / gl_Position.w;

  /* half the offset between the center to the vertex */
  vec2 offset = (vertex2D - center2D) * 0.5;

  /* axis lengths to the center */
  vec2 lengths = abs(offset);

  /* calculate the center of the quadrant defined by the center and this vertex */
  vec2 quadCenter = center2D + offset;

  /* check if the quadrant defined by the center and this vertex overlaps with the screen */
  vOnScreen =
    step(0.0, center.w) * // the center is in front of the screen AND
    step(quadCenter.x - lengths.x, 1.0) * // left side of the quad is less than the right side of the screen AND
    step(-1.0, quadCenter.x + lengths.x) * // left side of the screen is less than the right side of the quad AND
    step(quadCenter.y - lengths.y, 1.0) * // bottom side of the quad is less than the top side of the screen AND
    step(-1.0, quadCenter.y + lengths.y); // bottom side of the screen is less than the top side of the quad

  #ifdef ALPHA_MODE
  float saturationScale = 1.0 - step(1.0, aSaturation);
  #else
  float saturationScale = step(1.0, aSaturation);
  #endif

  gl_Position.xyz *= saturationScale * aVisible;
}
`