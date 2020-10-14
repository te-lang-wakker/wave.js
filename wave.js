/**
 * Draws a wave to a specified canvas.
 *
 * @author te-lang-wakker
 */

// config

const XSTART = 0;
const YSTART = window.innerHeight / 2;

const SPEED = 0.005;        // speed at which the waves move
const VARIATION = 15;       // number of sine waves to glue
const NORMALISATION = 1;    // normalises the randomisation to make the waves more consistent

const PRECISION = 100;      // trades performance for smoothness
const MAGNITUDE = 50;       // magnitude of the sine waves
const PERIOD = 100;         // period of the sine waves

// init

let canvas;
let context;

var offset = 0;
var variations = [VARIATION];

window.addEventListener("load", init);
setInterval(draw, 5);

function init() {
    canvas = document.getElementById("wave");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    seedVariations();
}

// randomise

function seedVariations() {
    for (let i = 0; i < VARIATION; i++) {
        variations[i] = 0;
        for (let j = 0; j < NORMALISATION; j++) {
            variations[i] += Math.random();
        }
        variations[i] /= NORMALISATION;
    }
}

// calculate

function cumulativeSin(x, offset) {
    let returnSin = 0;

    for (let i = 0; i < VARIATION; i++) {
        returnSin += Math.sin(x * variations[i] + offset);
    }

    return returnSin / VARIATION;
}

// draw

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.lineTo(XSTART, YSTART + canvas.height - YSTART);

    let x = 0, y;
    for (let i = 0; x < canvas.width; i += (1 / PRECISION)) {
        x = XSTART + i * PERIOD;
        y = YSTART + cumulativeSin(i, offset) * MAGNITUDE;
        context.lineTo(x, y);
    }

    context.lineTo(x, y + canvas.height - y);
    context.closePath();
    context.fillStyle = "#D63C28";
    context.fill();

    offset += SPEED;
}
