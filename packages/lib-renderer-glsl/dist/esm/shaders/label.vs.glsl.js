export default `#version 300 es
#define attribute in
#define varying out
#define GL2

attribute vec3 aVertex;
attribute vec2 aUV;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform vec3 uPosition01;
uniform vec2 uScreenSize;
uniform vec2 uSize;

uniform float uMinRadius;
uniform float uMaxRadius;
uniform float uWeight;

varying vec2 vUV;

void main() {
    vec3 position = uPosition01;

    float radius = uMinRadius + uWeight * (uMaxRadius - uMinRadius);
    vec3 radiusVec = (vec4(1.0, 0.0, 0.0, 1.0) * uModelView).xyz * radius;
    vec4 radiusProjected = uProjection * uModelView * vec4(position + radiusVec, 1.0);
    vec2 radiusScreen = radiusProjected.xy / radiusProjected.w;

    vec4 projected = uProjection * uModelView * vec4(position, 1.0);
    vec2 screen = projected.xy / projected.w;

    vec2 size = vec2((uSize.x / uScreenSize.x), (uSize.y / uScreenSize.y));

    float radiusDiff = radiusScreen.x - screen.x;
    float radiusStep = smoothstep(radiusDiff, radiusDiff * 2.0, size.x);
    float offsetX = mix(-size.x * 0.5, radiusDiff, radiusStep);
//    float offsetX = radiusDiff * radiusScale + -size.x * 0.5 * (1.0 - radiusScale);

    vec2 offset = vec2(offsetX + size.x * aVertex.x, -size.y * 0.5 + size.y * aVertex.y);

    vUV = aUV;
    gl_Position = vec4(screen + offset, 0.0, 1.0);
}
`