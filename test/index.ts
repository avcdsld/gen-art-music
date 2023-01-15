import { expect } from "chai";
import { ethers } from "hardhat";

const script = `const numToAscii = (num) => (num === 0 ? "A" : num === 1 ? "B" : num === 2 ? "C" : "D");
// const soundFileName = numToAscii(GAM_RHYTHM) + numToAscii(GAM_SPEECH) + numToAscii(GAM_SYNTHESIZER) + numToAscii(GAM_MELODY) + ".mp3";
const soundFileName = "DDDC.mp3";
let sound;
let fft;
let band = 2048;
let pos = [];
let velocity = [];
let friction = 0.95;
let mass = 20.0;
var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];

let colors = [];
let colors0 = "ADFF2F".split("-").map((a) => "#" + a);
let colors22 = "00FF00".split("-").map((a) => "#" + a);
let colors23 = "90EE90".split("-").map((a) => "#" + a);
let colors24 = "00FA9A".split("-").map((a) => "#" + a);
let colors25 = "154360".split("-").map((a) => "#" + a);
let colors26 = "9ACD32".split("-").map((a) => "#" + a);
let colors7 = "7FFF00".split("-").map((a) => "#" + a);
let colors8 = "98FB98".split("-").map((a) => "#" + a);
let colors11 = "3CB371".split("-").map((a) => "#" + a);
let colors12 = "FFFF00".split("-").map((a) => "#" + a);
let colors13 = "2F4F4F".split("-").map((a) => "#" + a);
var color_setup1, color_setup2;
let color_bg;
let v_planet = [];
let addForse;

function preload() {
  sound = loadSound("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/DDDC.mp3");
}

function setup() {
  randomSeed(seed);
  mySize = min(windowWidth, windowHeight);
  margin = mySize / 100;
  createCanvas(windowWidth, windowHeight, WEBGL);
  color_setup1 = colors7;
  color_setup2 = random([colors22, colors23, colors24, colors25, colors26, colors11, colors12, colors13]);
  color_bg = "#17202A";
  background(color_bg);
  num = int(random(30, 10));
  radius = mySize * 0.75;
  for (let a = 0; a < TAU; a += TAU / num) {
    sizes.push(random(0.1, 0.5));
  }
  t = 0;
  fft = new p5.FFT(0.1, band);
  fft.setInput(sound);
  for (let i = 0; i < band; i++) {
    velocity[i] = createVector(0, 0);
    pos[i] = createVector(0, 0);
  }
  count = 0;
}

function draw() {
  randomSeed(seed);
  background(color_bg);
  background(220);
  let spectrum = fft.analyze();
  for (i = 0; i < spectrum.length; i++) {
    let val = map(spectrum[i], 0, 255, 0, 1);
    addForce = ((val * width * i) / float(band)) * 1.0 + 10;
    let direction = radians(random(0, 360));
    let addX = cos(direction) * addForce;
    let addY = sin(direction) * addForce;
    let accel = createVector(addX / mass, addY / mass);
    velocity[i].add(accel);
    velocity[i].mult(friction);
    pos[i].add(velocity[i]);
    if (pos[i].x < -width / 2 || pos[i].x > width / 2) {
      pos[i].x = 0;
    }
    if (pos[i].y < -height / 2 || pos[i].y > height / 2) {
      pos[i].y = 0;
    }
    let h = map(log10(i), 0, log10(band), 0, 255);
    let r = map(val, 0, 1, 1, 40);

    rand = random(1000);
    if (rand > 990 && addForce > 150) {
      for (let i = 0; i < num; i++) {
        let a = (TAU / num) * i;
        let x = (radius * sin(a + t)) / random(5, 3) / 1.0;
        let y = (radius * cos(a + t)) / random(3, 5) / 1.0;
        v_planet[i] = createVector(x, y);
      }
      push();

      for (let q = 0; q < 1 / 5; q += 2 * random(0.01, 0.02)) {
        for (let j = 0; j < 1; j++) {
          let n = noise(q * t, j * t, frameCount * 0.01);
          rotateX(random(TAU) + sin(-t) / 5 + q);
          rotateY(random(TAU) + cos(t) / 5 + q);
          rotateZ(random(TAU) + sin(-t) / 5 + q);
          noStroke();
          fill(0, 50, h, h);

          num = 10;
          for (let i = 0; i < num; i += 8) {
            let d = random(radius / 2, radius / 4) / 1;
            push();
            rotateX(random(TAU) + sin(t));
            rotateY(random(TAU) + cos(-t) + n / 100);
            rotateZ(random(TAU) + 2 * sin(2 * t));
            let x_plus = (1.25 * random(-d, d)) / 1;
            let y_plus = (1.25 * random(-d, d)) / 1;
            let z_plus = (1.25 * random(-d, d)) / 1;
            cylinder(z_plus, random(1), parseInt(addForce / 100));
            torus(z_plus, random(1), parseInt(addForce / 100));
            pop();
          }

          for (let i = 0; i < num; i += 4) {
            let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
            let x_plus = (0.5 * random(-d, d)) / 1;
            let y_plus = (0.5 * random(-d, d)) / 1;
            let z_plus = (0.5 * random(-d, d)) / 1;
            stroke(0, 50, h, h);
            strokeWeight(random(0.5));
            noFill();
            push();
            translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
            rotateX(random(TAU) + t);
            rotateY(random(-TAU) + t);
            rotateZ(random(PI) + t);
            sphere(random(12), 2, 2, 2);
            pop();
          }
        }
      }
    }
  }
  pop();

  t += (random(2, 1) * random(0.001, 0.005)) / 1;
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("0712_Emotional lines_12_2022", "png");
  }
}
function log10(x) {
  return log(x) / log(10);
}

function mouseClicked() {
  if (sound.isPlaying() == false) {
    sound.loop();
  } else {
    sound.stop();
  }
}`;

describe("GenArtMusic", function () {
  it("should mint randomly", async function () {
    const [deployer] = await ethers.getSigners();

    const renderer = await (await ethers.getContractFactory("Renderer")).deploy();
    await renderer.deployed();
    const genArtMusic = await (await ethers.getContractFactory("GenArtMusic")).deploy(renderer.address);
    await genArtMusic.deployed();

    await (await renderer.setScript(script)).wait();
    await (await genArtMusic.setRenderer(renderer.address)).wait();
    await (await genArtMusic.setBaseImageUrl("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/image.png#")).wait();

    const totalNum = 256;
    expect(await genArtMusic.tokenRemaining()).to.equal(totalNum);

    const mintedIds: { [key: number]: boolean } = [];
    for (let i = 1; i <= totalNum; i++) {
      const tx = await genArtMusic.mint(deployer.address);
      await tx.wait();

      const musicId = await genArtMusic.tokenIdToMusicIds(i);
      expect(typeof mintedIds[musicId]).to.equal("undefined");
      mintedIds[musicId] = true;

      console.log(await genArtMusic.musicParam(i), musicId);
      // console.log(await genArtMusic.tokenURI(i));
    }

    for (let i = 0; i < totalNum; i++) {
      expect(mintedIds[i]).to.equal(true);
    }

    console.log(await genArtMusic.musicParam(1));
    console.log(await genArtMusic.tokenURI(1));
  });
});
