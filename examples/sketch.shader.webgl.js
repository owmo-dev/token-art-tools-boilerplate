var vert = document.getElementById("v-shader").textContent;
var frag = document.getElementById("f-shader").textContent;

let hash = tokenData.hash;

let D = Math.min(window.innerWidth, window.innerHeight);

let canvas = document.createElement("canvas");
canvas.width = D;
canvas.height = D;
canvas.style.cssText = "display:block; width:" + D + "px; height:" + D + "px;";

document.body.appendChild(canvas);

let gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
if (!gl) {
    console.error("Unable to init WebGl");
}

function createShaderFromSource(gl, src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
    }
    return s;
}

function createProgramFromShaderSources(gl, vs, fs) {
    var p = gl.createProgram();
    var v = createShaderFromSource(gl, vs, gl.VERTEX_SHADER);
    var f = createShaderFromSource(gl, fs, gl.FRAGMENT_SHADER);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(p));
        gl.deleteProgram(p);
        return null;
    }
    return p;
}

let program = createProgramFromShaderSources(gl, vert, frag);

gl.useProgram(program);

const GUL = function (gl, prg, uni) {
    return gl.getUniformLocation(prg, uni);
};

let aPosition = gl.getAttribLocation(program, "aPosition");

let uResolution = gl.getUniformLocation(program, "uResolution");
let uColor = gl.getUniformLocation(program, "uColor");

var verts = [-1, -1, 1, -1, 1, 1, -1, 1];
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

function draw() {
    gl.viewport(0, 0, D, D);
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform2fv(uResolution, [D, D]);

    gl.uniform3fv(uColor, [
        parseFloat(parseInt(hash.substring(2, 4), 16) / 255),
        parseFloat(parseInt(hash.substring(4, 6), 16) / 255),
        parseFloat(parseInt(hash.substring(6, 8), 16) / 255),
    ]);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

draw();
