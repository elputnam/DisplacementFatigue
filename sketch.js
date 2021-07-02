let xspacing = 10; // How far apart should each horizontal position be spaced
let w; // Width of entire wave
let maxwaves = 12; // total # of waves to add together

let theta = 0.0;
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues; // Using an array to store height values for the wave (not entirely necessary)

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  w = width + 16;

for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = [];
}

function draw() {
  background(random(100,200), random(100), 100, 5);
  
  //scale(map(mouseX, 0, width, 0.05, 1));
  lines();
  calcWave();
  renderWave();
}

function lines(){
  strokeWeight(random(1));
  stroke(random(10))
  for (i = 0; i < width*0.03; i++){
  line(random(-width, width), random(-height,height), mouseX*i, mouseY*i);
  }
  
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += random(0.01,0.05);

  // Set all height values to zero
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += tan(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each position
  noStroke();
  fill(random(200, 300), random(100), random(100));
  ellipseMode(CENTER);
  for (let x = 0; x < yvalues.length; x++) {
   circle(x * xspacing, height / 2 + yvalues[x], random(10));
  }
}