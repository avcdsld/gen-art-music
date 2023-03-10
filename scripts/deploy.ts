import { ethers } from "hardhat";

const script = `const numToAscii = (num) => (num === 0 ? "A" : num === 1 ? "B" : num === 2 ? "C" : "D");
// const soundFileName = numToAscii(GAM_RHYTHM) + numToAscii(GAM_LYRIC) + numToAscii(GAM_SYNTHESIZER) + numToAscii(GAM_ADSR) + ".mp3";
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
let bb = []; 
let gridSize = 400;
let xoff = 0;
let count=0;

let pp = [];
let addForse;


function preload() {
    sound = loadSound("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/DDDC.mp3");
}

function setup() {
	pixelDensity(2);
	frameRate(30);
	randomSeed(seed);
	minCanvasSize = min(windowWidth, windowHeight);
	margin = minCanvasSize / 100;
  createCanvas(minCanvasSize, minCanvasSize, WEBGL);
	background(220,220,220,100);
	num = int(random(30, 10));
	radius = minCanvasSize * 0.75;
	for (let a = 0; a < TAU; a += TAU / num) {
		sizes.push(random(0.1, 0.5));
	}
	t = 0;
	fft = new p5.FFT(0.1, band);
	fft.setInput(sound);
	for(let i = 0; i < band; i++){
		velocity[i] = createVector(0, 0);
		pos[i] = createVector(0, 0);
	}
	count=0;

	mRate = 1000/minCanvasSize;
	
	if (windowWidth < windowHeight) {
		let canvas = document.getElementById('defaultCanvas0');
		canvas.style.width = parseInt(minCanvasSize)+"px";
	  canvas.style.height = parseInt(minCanvasSize)+"px";
	} else {
		let canvas = document.getElementById('defaultCanvas0');
	 canvas.style.width = parseInt(minCanvasSize)+"px";
	 canvas.style.height = parseInt(minCanvasSize)+"px";

	}
	
	for (let i = 0; i < 1020; i++) {
    bb[i] = new Bb___();
  }
	
	myCamera = createCamera();

	
}

function draw() {
	rand=random(1000);
	if(rand<100){
		return;
	}
	if(rand>990 || count%50==0){
  	background(220,220,220,100);
	}

	randomSeed(seed);

  let spectrum = fft.analyze();
	for (i = 0; i < spectrum.length; i++) {
		let val = map(spectrum[i], 0, 255, 0, 1);
		addForce = val * minCanvasSize*mRate * i / float(band) * 1.0 + 10*mRate;
		
		if(addForce>450 ){
			background(220,220,220,100);
		}
		let direction = radians(random(0, 360));
		let addX = cos(direction) * addForce; 
		let addY = sin(direction) * addForce;
		let accel = createVector(addX/mass, addY/mass); 
		velocity[i].add(accel);
		velocity[i].mult(friction);
		pos[i].add(velocity[i]);
		if(pos[i].x < -minCanvasSize/2 || pos[i].x > minCanvasSize/2){
      pos[i].x = 0;
    }
    if(pos[i].y < -minCanvasSize/2 || pos[i].y > minCanvasSize/2){
      pos[i].y = 0;
    }
    let h = map(log10(i), 0, log10(band), 0, 255);
    let r = map(val, 0, 1, 1, 40);

		rand = random(1000);
		
	if(rand>990 && addForce>150){	
	for (let i = 0; i < num; i++) {
		let a = (TAU / num) * i;
		let x = radius * sin(a + t) / random(5, 3) / 1.0;
		let y = radius * cos(a + t) / random(3, 5) / 1.0;
		pp[i] = createVector(x, y);
	}
	push();
	if(addForce>250){
		translate(random(400*mRate), random(-400*mRate));
		myCamera.camera(random(255), random(255), random(255) + (height / 2.0) / tan(180 * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
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

        ran=random(1000);
				if(spectrum[i]>190 && ran>950 ){
		
					push();
					if(spectrum[i]>240){
						strokeWeight(2);
					}else{
						strokeWeight(1);
					}
					noFill(); 
						stroke(random(50),random(50),random(200),random(100));
					  
						circle(0,0,random(200,addForce*40)/5);
					pop();


				}
				
				if(ran<300){
					push();
					rotateY(random(1.25));
				  rotateX(-0.9);
					ambientLight(255);
					ambientMaterial(170, 30, 30,30);
					stroke(0,0,0,0);
					pop();
				}
				
				ambientLight(60, 60, 60);
        pointLight(255, 255, 255, 50, 100, 100);
				
				if(addForce>250){
					for(let i=0; i<10; i++){
						push();
            pointLight(155, 255, 255, 250, 100, 100);
						ambientLight(20);
						ambientMaterial(230, 30, 130,100);
				  	box(z_plus+i*10,random(105)+i*10,i*5,parseInt(addForce/2)*2);
						pop();
					}
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
				translate(pp[i].x + x_plus, pp[i].y + y_plus, z_plus);
				rotateX(random(TAU)+t);
				rotateY(random(-TAU)+t);
				rotateZ(random(PI)+t);
				pop();
			}
		}
	}
	}
	}
	t += random(2, 1) * random(0.001, 0.005) / 1;
	count++;
}

function draw_() {
  stroke(255);
  noFill();
	for(let e=0; e<1; e++){
	for(let t=0; t<8; t++){
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.02) {
    let offset = noise(xoff) * 1*t*10;
    let r = 160 + offset;
    let x = r * cos(a);
    let y = r * sin(a);
		let d = dist(x+5, y+5, x+1200, y+1200);
		let mx = x + cos(r) * d * 0.1;
    let my = y + sin(r) * d * 0.1;
		rand = random(1000);

    xoff += 0.01;
		
      x = lerp(mx, mx+100, 1);
      y = lerp(my, my+100, 5);
      let n = noise(x * 0.005, y * 0.005, frameCount * 0.005);
      r = map(n, 0, 1, 0, TWO_PI);
      mx = x + cos(r) * d * 0.1;
      my = y + sin(r) * d * 0.1;
      offset = random(-1, 1);
      mx += offset;
      my += offset;
      point(mx, my);
  }
  endShape(CLOSE);
	}
	}
}

class Bb___ {
  constructor() {
    this.x1 = floor(random(50, gridSize)) * (width / gridSize);
    this.y1 = floor(random(0, gridSize)) * (height / gridSize);
    this.x2 = floor(random(50, gridSize)) * (width / gridSize);
    this.y2 = floor(random(0, gridSize)) * (height / gridSize);
  }

  draw(addF) {
    strokeWeight(1);
		stroke(0,50,random(120,200),random(255));
    for (let t = 0; t <= 1; t += 0.03) {
      let x = lerp(this.x1, this.x2, t);
      let y = lerp(this.y1, this.y2, t);
      let d = dist(width+t*4, this.y1+t*3, width, this.y2*addF);
      let n = noise(x * 0.005, y * 0.005, frameCount * 0.005);
      let r = map(n, 0, 1,0.1, TWO_PI*t);
      let mx = x + cos(r) * d * 0.1;
      let my = y + sin(r) * d * 0.1;
			for(let i=0; i<3; i++){
				let p = random(0,15);
	
				rand=random(70);
				if(rand>5){
          point(mx+i*3+cos(r), my+i*3+sin(r));
				}else{
				}
			}
    }
  }
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

	const asyncToSync = await (await ethers.getContractFactory("AsyncToSync")).deploy(renderer.address);
	await asyncToSync.deployed();
	console.log("AsyncToSync deployed to:", asyncToSync.address);

	const baseImageUrl = "https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/image.png#";
	const txSetBaseImageUrl = await asyncToSync.setBaseImageUrl(baseImageUrl);
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
