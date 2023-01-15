import { ethers } from "hardhat";

const script = `const numToAscii = (num) => (num === 0 ? "A" : num === 1 ? "B" : num === 2 ? "C" : "D");
const soundFileName = "DDDC.mp3";
let sound;
let fft;
let band = 2048;
let position = [];
let velocity = [];
let friction = 0.95;
let mass = 20.0;
var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];
let v_planet = [];
let addForse;


function preload() {
	sound = loadSound("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/DDDC.mp3");
}

function setup() {
	randomSeed(seed);
	minCanvasSize = min(windowWidth, windowHeight);
	mySize = min(windowWidth, windowHeight);
	margin = mySize / 100;
	createCanvas(minCanvasSize, minCanvasSize, WEBGL);
	color_bg = "#17202A";
	background(color_bg);
	num = int(random(30, 10));
	radius = mySize * 0.75;
	for (let a = 0; a < TAU; a += TAU / num) {
		sizes.push(random(0.1, 0.5))
	}
	t = 0;
	fft = new p5.FFT(0.1, band);
	fft.setInput(sound);
	for(let i = 0; i < band; i++){
		velocity[i] = createVector(0, 0);
		position[i] = createVector(0, 0);
	}
	count=0;
}

function draw() {
	randomSeed(seed);
	background(color_bg);
	background(220);
  let spectrum = fft.analyze();
	for (i = 0; i < spectrum.length; i++) {
		let val = map(spectrum[i], 0, 255, 0, 1);
		addForce = val * width * i / float(band) * 1.0 + 10;
		let direction = radians(random(0, 360));
		let addX = cos(direction) * addForce; 
		let addY = sin(direction) * addForce;
		let accel = createVector(addX/mass, addY/mass); 
		velocity[i].add(accel);
		velocity[i].mult(friction);
		position[i].add(velocity[i]);
		if(position[i].x < -width/2 || position[i].x > width/2){
      position[i].x = 0;
    }
    if(position[i].y < -height/2 || position[i].y > height/2){
      position[i].y = 0;
    }

    let h = map(log10(i), 0, log10(band), 0, 255);
    let r = map(val, 0, 1, 1, 40);
	
    rand = random(1000);
	if(rand>990 && addForce>150){	
	for (let i = 0; i < num; i++) {
		let a = (TAU / num) * i;
		let x = radius * sin(a + t) / random(5, 3) / 1.0;
		let y = radius * cos(a + t) / random(3, 5) / 1.0;
		v_planet[i] = createVector(x, y);
	}
	push();
	if(addForce>350){
		translate(100, -100);
	}
	for (let q = 0; q < 1 / 5; q += 2 * random(0.01, 0.02)) {
		for (let j = 0; j < 1; j++) {
			let n = noise(q*t, j*t,frameCount*0.01);
			rotateX(random(TAU)+sin(-t) / 5 + q + addForce/20);
			rotateY(random(TAU)+cos(t) / 5 + q );
			rotateZ(random(TAU)+sin(-t) / 5 + q );
			noStroke();
			fill(0,50,h,h);
      
			
			num=10;
			for (let i = 0; i < num; i += 8) {
				rotateY(frameCount * 0.009);
				let d = random(radius / 2, radius / 4) / 1;
				push();
				rotateX( random(TAU)+sin(t));
				rotateY(random(TAU)+cos(-t)+n/100 );
				rotateZ( random(TAU)+2 * sin(2*t)+ addForce/20 );
				let x_plus = 1.25 * random(-d, d) / 1;
				let y_plus =  1.25 * random(-d, d) / 1;
				let z_plus =1.25 * random(-d, d) / 1;
				cylinder(z_plus+parseInt(addForce/100),random(1),parseInt(addForce/100));
				torus(z_plus,random(1),parseInt(addForce/100));
				ambientLight(60, 60, 60);
        pointLight(255, 255, 255, 50, 100, 100);
				if(addForce>250){
				box(z_plus,random(105),parseInt(addForce/2));
				}
				pop();
			}
			
			for (let i = 0; i < num; i += 4) {
				let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
				let x_plus = 0.5 * random(-d, d) / 1;
				let y_plus = 0.5 * random(-d, d) / 1;
				let z_plus = 0.5 * random(-d, d) / 1;
				stroke(0,50,h,h);
				strokeWeight(random(0.5));
				noFill();
				push();
				translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
				rotateX(random(TAU)+t);
				rotateY(random(-TAU)+t);
				rotateZ(random(PI)+t);
				sphere(random(12),2,2,2);
				pop();
			}
		}
	}
	}
	}

	t += random(2, 1) * random(0.001, 0.005) / 1;
}


function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("0712_Emotional lines_12_2022", "png");
	}
}
function log10(x) {
	return (log(x) / log(10));
}

function mouseClicked() {
  if (sound.isPlaying() == false) {
    sound.loop();
  } else {
    sound.stop();
  }
}`;

async function main() {
  const renderer = await (await ethers.getContractFactory("Renderer")).deploy();
  await renderer.deployed();
  console.log("Renderer deployed to:", renderer.address);

  const genArtMusic = await (await ethers.getContractFactory("GenArtMusic")).deploy(renderer.address);
  await genArtMusic.deployed();
  console.log("GenArtMusic deployed to:", genArtMusic.address);

  const baseImageUrl = "https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/image.png#";
  const txSetBaseImageUrl = await genArtMusic.setBaseImageUrl(baseImageUrl);
  console.log("txSetBaseImageUrl: ", txSetBaseImageUrl.hash);
  await txSetBaseImageUrl.wait();

  // MEMO: Error occurs in Goerli
  // const gasLimit = Math.floor(Number((await renderer.estimateGas.setScript(script)).toNumber()) * 1.1)
  const gasLimit = 4000000;
  const txSetScript = await renderer.setScript(script, { gasLimit });
  console.log("txSetScript: ", txSetScript.hash);
  await txSetScript.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
