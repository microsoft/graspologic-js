#version 300 es
#define varying in
#define GL2

precision mediump float;

varying vec2 vVertex;
varying float vRadius;
varying vec4 vColor;
varying float vShape;

uniform float uOutline;

#ifdef GL2
out vec4 fragColor;
#else
vec4 fragColor;
#endif

float color_scale(float distance) {
  return 0.8 + step(distance / vRadius, 0.9) * 0.2;
}

float calculate_circle_distance() {
  float distance = length(vVertex);
  if (distance > vRadius) {
      discard;
  }

  return distance;
}

float calculate_square_distance() {
  return max(abs(vVertex.x), abs(vVertex.y));
}

void main(void) { 
  // Set the initial fragment color
  fragColor = vColor;

  // Diamond and Square are treated the same
  float distance = vShape == 1.0 || vShape == 2.0 ? calculate_square_distance() : calculate_circle_distance();

  // Stash the alpha channel, we restore the alpha later
  float alpha = vColor.a;

  // For the outline, muliply the color based on the distance away depending on the type of shape
  // we are drawing  
  fragColor *= uOutline == 1.0 ? color_scale(distance) : 1.0;

  fragColor.a = alpha;

  #ifndef GL2
  gl_FragColor = fragColor;
  #endif
}
