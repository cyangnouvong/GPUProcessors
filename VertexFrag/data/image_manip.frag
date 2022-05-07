// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  //given
  vec4 diffuse_color = texture2D(my_texture, vertTexCoord.xy);

  vec2 textSize = textureSize(my_texture, 0);
  float wh = 3.0 / textSize.x;

  vec2 t1 = vertTexCoord.xy + vec2(0.0, -1 * wh);
  vec2 t2 = vertTexCoord.xy + vec2(0.0, wh);
  vec2 t3 = vertTexCoord.xy + vec2(-1 * wh, 0.0);
  vec2 t4 = vertTexCoord.xy + vec2(wh, 0.0);

  vec4 c1 = texture2D(my_texture, t1);
  vec4 c2 = texture2D(my_texture, t2);
  vec4 c3 = texture2D(my_texture, t3);
  vec4 c4 = texture2D(my_texture, t4);

  float intensity0 = (diffuse_color.r + diffuse_color.g + diffuse_color.b) / 3.0;
  float intensity1 = (c1.r + c1.g + c1.b) / 3.0;
  float intensity2 = (c2.r + c2.g + c2.b) / 3.0;
  float intensity3 = (c3.r + c3.g + c3.b) / 3.0;
  float intensity4 = (c4.r + c4.g + c4.b) / 3.0;

  float laplacian = intensity1 + intensity2 + intensity3 + intensity4 - (4 * intensity0);
  laplacian = laplacian + 0.5;
  gl_FragColor = vec4(laplacian, laplacian, laplacian, 1.0);
}
