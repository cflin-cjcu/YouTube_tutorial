let r = 100;
let r0 = 130, r1 = 80;

let tauMaxSlider, tauMaxValue;
let tauDensitySlider, tauDensityValue;

let freqSlider, freqValue;
let freqSlider2, freqValue2;

let radius0_Slider, radius1_Slider;
let radius0Value, radius1Value;

let offset = 0;

function setup(){
  createCanvas(700, 500, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  stroke(321, 38, 80);
  strokeWeight(2);
  noFill();

  //Create slider!
  radius0Value = createDiv();
  radius0Value.class("valueDisplay");
  radius0_Slider = createSlider(0, 200, 130, 1);
  radius0_Slider.class("Slider");

  radius1Value = createDiv();
  radius1Value.class("valueDisplay");
  radius1_Slider = createSlider(0, 200, 80, 1);
  radius1_Slider.class("Slider");

  freqValue = createDiv();
  freqValue.class("valueDisplay");
  freqSlider = createSlider(1, 30, 29, 0.1);
  freqSlider.class("Slider");

  freqValue2 = createDiv();
  freqValue2.class("valueDisplay");
  freqSlider2 = createSlider(1, 30, 30, 0.1);
  freqSlider2.class("Slider");
}

function draw(){
  background(230, 50, 15, 100);
  orbitControl(4, 4);//Mouse control

  rotateX(65);

  // torusLissajous1();
  torusLissajous2();

  radius0Value.html("radius0: " + radius0_Slider.value());
  radius1Value.html("radius1: " + radius1_Slider.value());
  freqValue.html("frequency: " + freqSlider.value());
  freqValue2.html("frequency2: " + freqSlider2.value());

  offset+=0.4;
}

function torusLissajous1(){
  for(let tau = 1; tau < 2; tau += 1){
    beginShape();
    for(let phi = 0; phi < 360; phi += 0.2){
      let x = r * sinh(tau) * cos(phi*freqSlider.value()) / (cosh(tau) - cos((phi*freqSlider2.value())+offset));
      let y = r * sinh(tau) * sin(phi*freqSlider.value()) / (cosh(tau) - cos((phi*freqSlider2.value())+offset));
      let z = r * sin((phi*freqSlider2.value())+offset) / (cosh(tau) - cos((phi*freqSlider2.value())+offset));
      vertex(x, y, z);
    }
    endShape();
  }
}

function torusLissajous2(){
  beginShape();
  for(let phi = 0; phi < 360; phi += 0.2){
    let x = cos(phi*freqSlider.value()) * (radius0_Slider.value()+radius1_Slider.value() * cos(phi*freqSlider2.value()));
    let y = sin(phi*freqSlider.value()) * (radius0_Slider.value()+radius1_Slider.value() * cos(phi*freqSlider2.value()));
    let z = radius1_Slider.value() * sin(phi*freqSlider2.value());
    vertex(x, y, z);
  }
  endShape();
}

function sinh(x){
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function cosh(x){
  return (Math.exp(x) + Math.exp(-x)) / 2;
}