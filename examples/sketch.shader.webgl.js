var vert = document.getElementById("v-shader").textContent;
var frag = document.getElementById("f-shader").textContent;

var hash = tokenData.hash;

var aspect = 1.0,
    canvas,
    gl,
    buffer,
    vertex_shader,
    fragment_shader,
    currentProgram,
    vertex_position,
    devicePixelRatio,
    parameters = { start_time: new Date().getTime(), time: 0, resolutionX: 0, resolutionY: 0 };

init();
animate();

function init() {
    devicePixelRatio = window.devicePixelRatio || 2;

    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.error("Unable to init WebGl");
    }

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

    currentProgram = createProgram(vert, frag);

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize(event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var dim = {
        x: h * aspect >= w ? w : h * aspect,
        y: w / aspect >= h ? h : w / aspect,
    };

    canvas.style.width = dim.x + "px";

    canvas.width = dim.x * devicePixelRatio;
    canvas.height = dim.y * devicePixelRatio;

    parameters.resolutionX = canvas.width;
    parameters.resolutionY = canvas.height;

    gl.viewport(0, 0, canvas.width, canvas.height);
}

function createProgram(vertex, fragment) {
    var program = gl.createProgram();

    var vs = createShader(vertex, gl.VERTEX_SHADER);
    var fs = createShader(fragment, gl.FRAGMENT_SHADER);

    if (vs == null || fs == null) return null;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

function createShader(src, type) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error((type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " SHADER:\n" + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    if (!currentProgram) return;

    parameters.time = new Date().getTime() - parameters.start_time;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(currentProgram);

    gl.uniform1f(gl.getUniformLocation(currentProgram, "uTime"), parameters.time / 1000);
    gl.uniform2f(gl.getUniformLocation(currentProgram, "uResolution"), parameters.resolutionX, parameters.resolutionY);

    gl.uniform3fv(gl.getUniformLocation(currentProgram, "uColor"), [
        parseFloat(parseInt(hash.substring(2, 4), 16) / 255),
        parseFloat(parseInt(hash.substring(4, 6), 16) / 255),
        parseFloat(parseInt(hash.substring(6, 8), 16) / 255),
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(vertex_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertex_position);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.disableVertexAttribArray(vertex_position);
}
