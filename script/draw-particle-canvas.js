// function setup() {
//     createCanvas(windowWidth, windowHeight, WEBGL);
// }


// function draw() {
//     background(21, 24, 24);
//     box();
// }


var inc = 0.1;
var scl = 50;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function prepareFlowField() {
    // colorMode(HSB, 255);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 500; i++) {
        particles[i] = new Particle();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    prepareFlowField();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    prepareFlowField();
}

function draw() {
    background(21, 24, 24);
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var v = p5.Vector.fromAngle(0);
            var index = x + y * cols;
            var mag = noise(xoff, yoff, zoff) - 0.5; // * TWO_PI * 4;
            v.setMag(mag);
            flowfield[index] = v;
            xoff += inc;
            // stroke(mag > 0 ? 255 : 0, 255, mag > 0 ? 255 : 0);
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // strokeWeight(1);
            // line(0, 0, Math.abs(v.x) * 100, 0);
            // pop();
        }
        yoff += inc;

        zoff += 0.0005;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}