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
    return vec2(1.0, 1.0) * (uMinWidth + (uMaxWidth - uMinWidth) * aWeight) * 0.5;
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

/**
 * Computes a normal that is perpendicular to the line formed from the given two points
 */
vec2 computeLineNormal(vec3 start, vec3 end) {
  // moves the line to origin (0, 0)
  vec2 normal = end.xy - start.xy;

  // rotate the line by 90 degress counter clockwise
  normal = vec2(normal.y, -normal.x);

  // scale it by the line length to make it a unit length
  normal /= length(normal);

  return normal;
}

void main() {

  // Where is node A currently at
  vec3 nodeA = tween_attribute(aSourcePosition_start, aSourcePosition, aSourcePosition_tween, uTime);

  // Where is node B currently at
  vec3 nodeB = tween_attribute(aTargetPosition_start, aTargetPosition, aTargetPosition_tween, uTime);

  // Linear interpolate where along the edge the current vertex is
  vec3 edgePosition = mix(nodeA, nodeB, aVertex.x);

  // Find the normal for the edge (a line perpendicular to the edge)
  vec2 edgeNormal = computeLineNormal(nodeA, nodeB);

  // The edge width in normalized device coordinates
  // i.e. a size of 1 will take up half of the screen, cause normalized device coordinates are from -1 to 1
  float edge_width = 0.01;
  vec4 test = uProjection * uModelView * vec4(1.0);

  // project out the edge thickness
  edgePosition.xy += edgeNormal * (aVertex.y - 0.5) * edge_width;

  // Position the triangle's vertex
  gl_Position = uProjection * uModelView * vec4(edgePosition, 1.0);

  // Scale the node colors to 0 - 1
  vec4 color1 = vec4(aColor.rgb / 255.0, aSaturation);
  vec4 color2 = vec4(aColor2.rgb / 255.0, aSaturation2);

  // Linear interpolate the color for the current vertex
  vColor = mix(color1, color2, aVertex.x);
}
