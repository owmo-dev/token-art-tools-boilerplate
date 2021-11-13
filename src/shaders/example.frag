#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 uColor;
uniform vec2 uResolution;

void main() {
    vec3 col = vec3(.75);
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    if (st.x > 0.25 && st.x < 0.75 && st.y > 0.25 && st.y < 0.75)
        col = uColor;
    gl_FragColor = vec4(col, 1.0);
}