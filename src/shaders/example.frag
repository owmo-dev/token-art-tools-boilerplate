#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_color;
uniform vec2 u_resolution;

void main() {
    vec3 col = vec3(.75);
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    if (st.x > 0.25 && st.x < 0.75 && st.y > 0.25 && st.y < 0.75)
        col = u_color;
    gl_FragColor = vec4(col, 1.0);
}