// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec2 z = vec2(vertTexCoord.x * 3 - 1.5, vertTexCoord.y * 3 - 1.5); // map to [-1.5, 1.5]
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
  int i = 0;
  while (i++ < 50) {
    if (z.x * z.x + z.y * z.y < 16) {
      color = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
      color = vec4(0.71, 0.65, 0.88, 1.0);
    }
    z = vec2(z.x * z.x * z.x - z.x * z.y * z.y - 2 * z.x * z.y * z.y + cx, 2 * z.x * z.x* z.y + z.x * z.x * z.y - z.y * z.y * z.y + cy);
  }
  gl_FragColor = vec4(color);
}