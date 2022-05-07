// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  vec2 center = vec2(0.5, 0.5);
  float centerDist = distance(vertTexCoord.xy, center);
  vec4 color = vec4(0.0, 1.0, 1.0, 1.0);

  // circle shape
  if (centerDist > 0.5) {
    color.a = 0.0;
  }

  //spiral circles
  for (int i = 0; i < 31; i++) {
    float angle = radians(30) * i;
    float dist = 0.025 * angle;
    float radius = 0.005 * angle;
    float spiralX = center.x + (dist * cos(-1 * angle));
    float spiralY = center.y + (dist * sin(-1 * angle));
    vec2 computedCenter = vec2(spiralX, spiralY);
    float computedDist = distance(vertTexCoord.xy, computedCenter);
    if (computedDist < radius) {
      color.a = 0.0; 
    }
  }

  gl_FragColor = vec4(color);
}



