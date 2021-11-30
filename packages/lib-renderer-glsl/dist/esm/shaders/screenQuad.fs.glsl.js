export default `#version 300 es
#define GL2

#ifdef GL2
#define varying in
#define texture2D texture
out vec4 fragColor;
#else
vec4 fragColor;
#endif

uniform sampler2D uTexture;
varying vec2 vUV;

void main() {
//    fragColor = vec4(1.0, 0.5, 0.5, 0.2) + texture2D(uTexture, vUV);
    fragColor = texture2D(uTexture, vUV);

    #ifndef GL2
    gl_FragColor = fragColor;
    #endif
}
`