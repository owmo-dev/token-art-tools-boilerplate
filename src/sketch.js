var vert = document.getElementById("v-shader").textContent;
var frag = document.getElementById("f-shader").textContent;

let hash = tokenData.hash;

let D = Math.min(window.innerWidth, window.innerHeight);

// Thanks @piterpasma for the RNG!

let S = Uint32Array.from([0, 0, 0, 0]).map((i) => parseInt(hash.substr(i * 8 + 5, 8), 16));

let R = (a = 1) => {
    let t = S[3];
    S[3] = S[2];
    S[2] = S[1];
    let s = (S[1] = S[0]);
    t ^= t << 11;
    S[0] ^= t ^ (t >>> 8) ^ (s >>> 19);
    return (a * S[0]) / 2 ** 32;
};

let program;

function setup() {
    createCanvas(D, D, WEBGL);
    program = createShader(vert, frag);
    shader(program);
    noStroke();
    noLoop();
}

function draw() {
    program.setUniform("u_color", [
        float(int(hash.substring(2, 4), 16) / 255),
        float(int(hash.substring(4, 6), 16) / 255),
        float(int(hash.substring(6, 8), 16) / 255),
    ]);
    program.setUniform("u_resolution", [D, D]);
    rect(0, 0, D, D);
}

window.setup = setup;
window.draw = draw;
