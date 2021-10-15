let D = Math.min(window.innerWidth, window.innerHeight);

function setup() {
    createCanvas(D, D);
}

function draw() {
    background(200);
    fill("red");
    square(D / 2 - D / 4, D / 2 - D / 4, D / 2, D / 2, D / 16);
}
