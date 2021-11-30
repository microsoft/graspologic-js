export default `#version 300 es
#define attribute in
#define varying out
#define GL2

attribute vec3 aVertex;
attribute vec2 aUV;

varying vec2 vUV;

void main() {
    vUV = aUV;
    gl_Position = vec4(aVertex, 1.0);
}
`