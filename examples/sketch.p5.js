let D = Math.min(window.innerWidth, window.innerHeight);

function setup() {
    noStroke();
    pixelDensity(1);
    createCanvas(D, D);
}

function draw() {
    background(200);
    fill("#" + tokenData.hash.substr(2, 6));
    square(D / 2 - D / 4, D / 2 - D / 4, D / 2, D / 2, D / 64);
}
