var vert = document.getElementById("v-shader").textContent;
var frag = document.getElementById("f-shader").textContent;

let hash = tokenData.hash;

let D = Math.min(window.innerWidth, window.innerHeight);

let program;

function setup() {
    pixelDensity(1);
    createCanvas(D, D, WEBGL);
    program = createShader(vert, frag);
    shader(program);
    noStroke();
    noLoop();
}

function draw() {
    program.setUniform("uColor", [
        float(int(hash.substring(2, 4), 16) / 255),
        float(int(hash.substring(4, 6), 16) / 255),
        float(int(hash.substring(6, 8), 16) / 255),
    ]);
    program.setUniform("uResolution", [D, D]);
    rect(0, 0, D, D);
}

window.setup = setup;
window.draw = draw;
