#version 300 es
#define attribute in
#define varying out
#define GL2
#define SQRT_2 1.414213562373095

attribute vec3 aVertex;
attribute vec3 aPosition;
attribute float aWeight;
attribute float aRadius;
attribute float aShape;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform float uMinRadius;
uniform float uMaxRadius;
uniform vec4 uColor;

varying vec2 vVertex;
varying float vRadius;
varying float vShape;
varying vec4 vColor;
uniform vec2 uScreenSize;

void main() {
  float radius_scale = aShape == 3.0 ? SQRT_2 : 1.0;

  vRadius = aRadius > 0.0 ? aRadius * radius_scale : ((uMinRadius + aWeight * (uMaxRadius - uMinRadius)) / uScreenSize.x);
  vShape = aShape;

  vec3 rotatedVert = aVertex;

  // If we are a diamond shape, then rotate
  if(vShape == 2.0) {
    rotatedVert = vec3((rotatedVert.x + rotatedVert.y) / SQRT_2, (rotatedVert.y - rotatedVert.x) / SQRT_2, rotatedVert.z);
  }
  vec3 sized = (vec4(rotatedVert, 1.0) * uModelView).xyz * vRadius;
  
  vVertex = (aVertex * vRadius).xy;
  vColor = uColor / 255.0;
  gl_Position = uProjection * uModelView * vec4(aPosition + sized, 1.0);
}
