precision mediump float;

varying vec4 vColor;
varying vec2 vCenter;
varying vec2 vEdge;
varying float vWidth;

uniform float uAntialias;

void main() {
    float toPixel = length(vEdge - vCenter);
    float toEdge = max(vWidth - 1.5, 0.0);
    float antialias = 1.0 - (max((toPixel - toEdge) / max(vWidth - toEdge, 0.1), 0.0) * uAntialias);
    gl_FragColor = vec4(vColor.rgb, vColor.a * antialias);
//    gl_FragColor = vColor;
}
