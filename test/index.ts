import { expect } from "chai";
import { ethers } from "hardhat";
const crypto = require("crypto");

const script = `
let oscObj = null;
let sound;
let fft;
let band = 2048; //FFTサイズ 　
let position2 = []; //位置のベクトル
let velocity = []; //速度のベクトル　 
let friction = 0.75; //摩擦  
let mass = 10.0; //質量
var seed = Math.random() * 3;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];
let bb = [];
let gridSize = 400; // グリッドのサイズ
let xoff = 0;
let count = 0;
let offcount = 0;
let pp = [];
let addForse;
let arpha;
let xoff1 = 0.0;
let xoff2 = 10000.0;
let xoff3 = 20000.0;
let afterImage;
var hed;
var aspectRatio = 16 / 9;
var ew, eh;
let colors1 = ["#EF6100", "#EF6100", "#FF9D00", "#FFC100", "#0070F6", "#D7C7DE", "#D0B3F4", ];
let colors2 = ["#A4ECFF", "#8461C9", "#D0B3F4", "#FF80D2", "#FFEB36", "#FF9D00", "#EF6100", "#598200", "#DCEF25", "#FF0097", "#0070F6", "#00AF57", "#FF0000", ];
let colors3 = ["#DCEF25", "#FF0097", "#0070F6"];
let colors4 = ["#0070F6", "#FFFFFF", "#0f07af", "#FF9D00"];
let colors5 = ["#A4ECFF", "#8461C9", "#D0B3F4", "#FF0097", "#0070F6", "#00AF57", "#FF0000", ];
let colors6 = ["#A4ECFF", "#8461C9", "#D0B3F4", "#FF80D2", "#FFEB36"];
let colors7 = ["#FFF100", "#C265A4", "#CBD5DC","#0f07af", "#FFFFFF", "#000000"];
let colors8 = ["#FFF100", "#CBD5DC", "#CBD5DC", "#EA5514"];
let colors9 = ["#008CD6", "#B9A172", "#124098", "#8DC556"]; //Bright Blue base
let colors10 = ["#005BAC", "#7D7D7D", "#8D1038","#FFFFFF", "#0f7baf"];
let colors11 = ["#EEE0C0", "#DEC69F", "#920783", "#93B4C5"]; //Beige
let colors12 = ["#C9CACA", "#EDDFD6", "#E73273","#40cecb"]; //Red 
let colors13 = ["#EEE0C0", "#920783", "#C9CACA", "#C9CACA", ]; //Beige silver purple-red 
let colors14 = ["#EEE0C0", "#0f07af3", "#C9CACA", "#0070F6"]; //Beige silver purple-red 
let colors15 = ["#EF6100", "#EF6100", "#FF9D00", "#FFC100", "#0070F6", "#D7C7DE", "#D0B3F4", ];
let colors16 = ["#0070F6", "#FFFFFF","#FFFFFF", "#0f7baf"];
let colors17 = ["#A4ECFF", "#8461C9", "#D0B3F4"];
let colors18 = ["#FF3399", "#006F86","#FFFFFF", "#0f7baf","#40cecb"];
let colors19 = ["#DCEF25", "#FF0097", "#0070F6"];
let colors20 = ["#0070F6", "#FFFFFF", "#FF9D00","#FFFFFF", "#0f7baf"];

let cmColors1 =  ["#00a63d","#ced5dc"];
let cmColors2 =  ["#40cecb","#ced5dc"];
let cmColors3 =  ["#367589","#ced5dc"];
let cmColors4 =  ["#6aa9de","#ced5dc"];
let cmColors5 =  ["#849bab","#ced5dc"];
let cmColors6 =  ["#ceafb2","#ced5dc"];
let cmColors7 =  ["#f2f9e7","#ced5dc","#736f6c"];
let cmColors8 =  ["#8ba26C","#ced5dc"];
let cmColors9 =  ["#d6441b","#ced5dc"];
let cmColors10=  ["#ff3403","#ced5dc"];
let cmColors11=  ["#ff3403","#ced5dc","#ec008c"];
let cmColors12=  ["#ced5dc","#9a7ccf","#d0747c"];
let cmColors13=  ["#503c47","#ced5dc","#dbcabf"];
let cmColors14=  ["#28171a","#ced5dc","#a59089"];
let cmColors15=  ["#f9dd00","#ced5dc","#f5cc5e"];
let cmColors16=  ["#e6d29b","#ced5dc","#ddd582"];
let cmColors17=  ["#27a1a4","#ced5dc","#00a63d"];
let cmColors18=  ["#7cf135","#ced5dc","#4166f5"];
let cmColors19=  ["#536fb0","#ced5dc","#849bab"];
let cmColors20=  ["#ff3403","#ced5dc","#d78152"];




let bkcolors = ["#afafb0", "#eae8e1", "#FAFAD2"]

let colors10090 = ["#7D7D7D","#000000","#000000","#000000"];

let colorsYve = ["#00008b"];
let bkcolorsYve = ["#ced5dc"]


let type;
let rhythm;
let lyric;
let osc;
let adsr;

let mainObj;
//let colors = [ "#ffffff", "#329fe3"];
let shapes = [];
const GAM_TOKEN_ID = 1;
const GAM_RHYTHM = 1;
const GAM_SPEECH = 1;
const GAM_SYNTHESIZER = 0;
const GAM_MELODY = 0;
const GAM_PARAM1 = 0; // 0-9
const GAM_PARAM2 = 0; // 0-9
const GAM_PARAM3 = 0; // 0-9
const GAM_PARAM4 = 0; // 0-9
let myCamera;
let sliderX, sliderY, sliderZ;
let camX = 0,
	camY = 0,
	camZ = 0;
let infoP;
let infoP2;
let ranMO = 0.02;
let voiceRect = false;
let bigCircle = false;
let textureOn = false;
var sphereArr = [];
var sphereMax = 50;
var trackCount = 15;
let theShader;
let numSpheres = 10;
let spheres = [];
let particles = [];
let num_particles = 10;
let helixRadius = 200;
let helixHeight = 15;
let helixTurns = 1;
let helixStep = 0.4;
let torusRadius = 100;
let torusTubeRadius = 20;
let knotRadius = 60;
let knotNum = 7;
let r = 100;
let angle = 0;
let angle2 = 0;
//let size = 200;
let polygons = [];
let gl;
let myShader;
let xx = 0;
let yy = 0;
let zz = 0;
let aaa = 110;
let bbb = 128;
let ccc = 8 / 1;
//let xoff = 0.0;
let xArray = [];
let yArray = [];
let cameraX = 0,
	cameraZ = 0;
const stepX = 10,
	stepZ = 10;
let t1 = 0,
	t2 = 100;

let _text;

let dotPattern;
let maxBranches = 1200;
let noiseScale = 0.002;
let noiseStrength = 1250;
let maxBranchingAngle = Math.PI / 11;
let minBranchLength = 111;
let maxBranchLength = 113;
let colors44 = ["#FFEB36", "#FF9D00", "#EF6100"];

class Branch {
  constructor(x, y, z, angle, length) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.angle = angle;
    this.length = length;
  }

  createBranch() {
    let angleNoise = noise(this.x * noiseScale, this.y * noiseScale, this.z * noiseScale);
    let newAngle = map(angleNoise, 10, 1, -maxBranchingAngle, maxBranchingAngle) + this.angle;
    let lengthNoise = noise(this.x * noiseScale, this.y * noiseScale, this.z * noiseScale + 0);
    let newLength = map(lengthNoise, 0, 1, minBranchLength, maxBranchLength);
    let dir = p5.Vector.fromAngles(newAngle, 10, 1);
    dir.setMag(newLength/10);
    let newX = this.x + dir.x;
    let newY = this.y + dir.y;
    let newZ = this.z + dir.z;
    return new Branch(newX, newY, newZ, newAngle, newLength);
  }

  show() {
    stroke(random(0,50));
    strokeWeight(0.1);
    push();
    translate(this.x, this.y, this.z);
    rotateY(this.angle);
    noFill();
    beginShape();
		//rotateX(0.1)
		rotateY(0.1)
		rotateZ(1)
    vertex(0, 0, 0);
    let n = noise(this.x * noiseScale, this.y * noiseScale, this.z * noiseScale);
    let r = map(n, 0, 1, 1, noiseStrength);
    for (let i = 0; i <= 1; i++) {
      let x = r * cos(i * 2 * Math.PI / 9);
      let y = r * sin(i * 2 * Math.PI / 7);
			let rand=random(1000)
			//if(rand>4678){
			
			rotateZ(i*2)
     // vertex(x, y, i * 0.001);
			translate(x, y, i * 0.001)
			//line(41,40,x,y)
		//	line(-x,-y,x,y)
			texture(dotPattern);
	//		box(1400,200,200)
			translate(x+x, y+y, i * 0.001)
			//fill(random(colors))
			fill(random(colors44))
			texture(dotPattern2);
			//fill(random(colors44))
//			box(1400,200,200)
			//vertex(x, y+frameCount, i * 0.2);
			//vertex(x+frameCount, y, i * 0.3);
		//	}
    }
    endShape(CLOSE);
    pop();
  }
}

let branches = [];
branches.push(new Branch(0, 0, 0, 0, 0));

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function preload() {
	sound = loadSound("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/DDDC.mp3");
	// sound = loadSound('./master-04.mp3');
	//	sound = loadSound('./master-01.mp3'); 
}


function setup() {
	amplitude = new p5.Amplitude();

	setAttributes("alpha", false);

	type = random(A2S_RARITY);
	rhythm = random(A2S_RHYTHM);
	lyric = random(A2S_LYRIC);
	osc = random(A2S_OSCILLATOR);
	adsr = random(A2S_ADSR);

	PARAM1 = int(random(10));  //A2S_PARAM1
	PARAM2 = int(random(10));  //A2S_PARAM2
	PARAM3 = int(random(10));  //A2S_PARAM3
	//A2S_PARAM1 = random(10);
	//textParam1 = A2S_CU1.length % 9;
	textParam1 = decodeURIComponent(escape(window.atob(A2S_CU1)));
	textParam2 = decodeURIComponent(escape(window.atob(A2S_CU2)));
	textParam3 = decodeURIComponent(escape(window.atob(A2S_CU3)));
	textParam4 = decodeURIComponent(escape(window.atob(A2S_CU4)));
	textParam5 = decodeURIComponent(escape(window.atob(A2S_CU5)));
	textParam6 = decodeURIComponent(escape(window.atob(A2S_CU6)));
	textParam7 = decodeURIComponent(escape(window.atob(A2S_CU7)));
	textParam8 = decodeURIComponent(escape(window.atob(A2S_CU8)));
	textParam9 = decodeURIComponent(escape(window.atob(A2S_CU9)));
	textParam10 = decodeURIComponent(escape(window.atob(A2S_CU10)));
	textParam11 = decodeURIComponent(escape(window.atob(A2S_CU11)));
	textParam12 = decodeURIComponent(escape(window.atob(A2S_CU12)));
	theTEXT = textParam1 + " " + textParam2 + " " + textParam3 + " " + textParam4 + " " + textParam5 + " " + textParam6 + " " + textParam7 + " " + textParam8 + " " + textParam9 + " " + textParam10 + " " + textParam11 + " " + textParam12;
	console.log(theTEXT)

	hyperStripe = false;
	hyperFlat = false;
	rotateXZ = true;
  //type="COMMON"
 // type="RARE"
//	type="SUPERRARE"
//	type="ULTRARARE"
//	type="ONE_OF_ONE"
	
	///////////////////// Rarity毎の設定
	if (type == "COMMON") {
    common = true;
	} else {
    common = false;
	}
	if (type == "RARE") {
		rare = true;
		hyperStripe = true;
		
	} else {
		rare = false;
	}
	if (type == "SUPERRARE") {
		superRare = true;
	//	hyperFlat = true;
		textureOn = true;
		hyperStripe = true;
	//	rotateXZ =true;
		afterImage = int(random(3));
	} else {
		superRare = false;
	}
	if (type == "ULTRARARE") {
		ultraRare = true;
		hyperStripe = true;
		//hyperStripe = true;
	} else {
		ultraRare = false;
	}
	
	if(type == "ONE_OF_ONE"){
	  oneOfOne = true;
		
	}else{
	  oneOfOne = false;
	}
//	oneOfOne=true;
	//superRare = true;
	textureOn = true;
	//common = true;
	/**
  	hyperMode =random(20);
	if(hyperMode>19){
		hyperStripe=true;
	}if(hyperMode>19){
	  hyperFlat=true;
	}if(hyperMode>18){
		rotateXZ=false;
	}
	*/
	console.log("Rarity:" + type)
	colrand = int(PARAM1);
	//colrand=1;
	if(!common){
		randCol2 =random(10)
		if(randCol2>5){
			colrand = colrand+10;
		}else{
		}
		if (colrand == 1) {
			colors = colors1;
		} else if (colrand == 2) {
			colors = colors2;
		} else if (colrand == 3) {
			colors = colors3;
		} else if (colrand == 4) {
			colors = colors4;
		} else if (colrand == 5) {
			colors = colors5;
		} else if (colrand == 6) {
			colors = colors6;
		} else if (colrand == 7) {
			colors = colors7;
		} else if (colrand == 8) {
			colors = colors8;
		} else if (colrand == 9) {
			colors = colors9;
		} else if (colrand == 10) {
			colors = colors10;
		} else if (colrand == 11) {
			colors = colors11;
		} else {
			colors = colors4;
		}
	}
	if(common){
		randCol =random(10)
		if(randCol>5){
			colrand = colrand+10;
		}else{
		}
		
		if (colrand == 1) {
			colors = cmColors1;
		} else if (colrand == 2) {
			colors = cmColors2;
		} else if (colrand == 3) {
			colors = cmColors3;
		} else if (colrand == 4) {
			colors = cmColors4;
		} else if (colrand == 5) {
			colors = cmColors5;
		} else if (colrand == 6) {
			colors = cmColors6;
		} else if (colrand == 7) {
			colors = cmColors7;
		} else if (colrand == 8) {
			colors = cmColors8;
		} else if (colrand == 9) {
			colors = cmColors9;
		} else if (colrand == 10) {
			colors = cmColors10;
		} else if (colrand == 11) {
			colors = cmColors11;
		} else if (colrand == 12) {
			colors = cmColors12;
		} else if (colrand == 13) {
			colors = cmColors13;
		} else if (colrand == 14) {
			colors = cmColors14;
		} else if (colrand == 15) {
			colors = cmColors15;
		} else if (colrand == 16) {
			colors = cmColors16;
		} else if (colrand == 17) {
			colors = cmColors17;
		} else if (colrand == 18) {
			colors = cmColors18;
		} else if (colrand == 19) {
			colors = cmColors19;
		} else if (colrand == 20) {
			colors = cmColors20;
		}else{
			colors = cmColors1;
		}
	}
	
	if(oneOfOne==true){
	  colors=colorsYve;
	  bkcolors = bkcolorsYve;
		if (rhythm == "THICK") {
			mainObj = 3;
		} else if (rhythm == "LO_FI") {
			mainObj = 1;
		} else if (rhythm == "HI_FI") {
			mainObj = 2;
		} else if (rhythm == "GLITCH") {
			mainObj = 0;
		} else {
		  mainObj = int(random(4));
		}

	}

  mainObj = int(random(4));

	//LYRICによってXXXXXXXXXXXXxを決定する "LITTLE_BOY","FUSSY_MAN","OLD_MANN","LITTLE_GIRL"
	if (lyric == "LITTLE_BOY") {
    
	} else if (lyric == "FUSSY_MAN") {

	} else if (lyric == "OLD_MANN") {

	} else if (lyric == "LITTLE_GIRL") {}

	//ランダムにサブオブジェクトを決定する
	subObj = int(random(3));
	console.log("subObj:" + subObj)


	////////////////after Image mode
	//ADSRによってAfter Image Modeを決定する　ADSR=["PIANO","PAD","PLUCK","LEAD"]
	//afImgR = random(20);
	if (adsr == "PIANO") {
		afterImage = 0;
	} else if (adsr == "PAD") {
		afterImage = 1;
	} else if (adsr == "PLUCK") {
		afterImage = 2;
	} else if (adsr == "LEAD") {
		afterImage = 3;
	}else{
	  afterImage = int(random(3));
	}
	console.log("ADSR:" + adsr)


	//particlesの設定
	for (let i = 0; i < num_particles; i++) {
		let p = new Particle();
		particles.push(p);
	}

	//polygonsの設定
	for (let i = 0; i < 100; i++) {
		let poly = [];
		let sides = int(random(3, 10));
		let radius = random(100, 300);
		for (let j = 0; j < sides; j++) {
			let a = map(j, 0, sides, 0, TWO_PI);
			let x = cos(a) * radius;
			let y = sin(a) * radius;
			let z = random(-100, 100);
			poly.push(createVector(x, y, z));
		}
		polygons.push(poly);
	}


	/////////////////attributeObjects
	if(oneOfOne){
	  PARAM3=10;
	}
	if(PARAM3>5){
		vrRand = random(10);
		if (vrRand > 5) {
			voiceRect = true;
		} else {
			voiceRect = false;
		}
		voiceRect = true;
		uneRand = random(10)
		if (uneRand > 9) {
			uneune = true;
		} else {
			uneune = false;
		}
		//uneune=false;
		sprObj = true;
		conRect = false;
		//inazuma=false;
		baseLines = false;
		polygonLine = true;
	  particle = false
	}else if(PARAM3>3){
		vrRand = random(10);
		if (vrRand > 5) {
			voiceRect = true;
		} else {
			voiceRect = false;
		}
		voiceRect = false;
		uneRand = random(10)
		if (uneRand > 9) {
			uneune = true;
		} else {
			uneune = false;
		}
		//uneune=false;
		sprObj = false;
		conRect = true;
		//inazuma=false;
		baseLines = false;
		polygonLine = true;
	  particle = false;
	}else if(PARAM3>1){
		vrRand = random(10);
		if (vrRand > 5) {
			voiceRect = true;
		} else {
			voiceRect = false;
		}
		voiceRect = true;
		uneRand = random(10)
		if (uneRand > 9) {
			uneune = true;
		} else {
			uneune = false;
		}
		uneune=false;
		sprObj = false;
		conRect = true;
		baseLines = true;
		polygonLine = false;
	  particle = false;
	}else{
	  vrRand = random(10);
		if (vrRand > 5) {
			voiceRect = true;
		} else {
			voiceRect = false;
		}
		voiceRect = true;
		uneRand = random(10)
		if (uneRand > 9) {
			uneune = true;
		} else {
			uneune = false;
		}
		uneune=false;
		sprObj = false;
		conRect = false;
		baseLines = false;
		polygonLine = false;
	  particle = false;
	
	
	}
		
	



	/////////////////Osc Objects
	//OSCILLATORに合わせてoscObjを決定する　OSCILLATOR=["GLITCH","LFO","FREAK","LYRA"]
	if (osc == "GLITCH") {
		oscObj = 0;
	} else if (osc == "LFO") {
		oscObj = 1;
	} else if (osc == "FREAK") {
		oscObj = 2;
	} else if (osc == "LYRA") {
		oscObj = 3;
	}
	/////////////////Circle Rect
	circleRect = true;
	circleRectH = 1;
	////////////////rotateMode
	/**
  hyperStripe=false;
  hyperFlat=false;
  rotateXZ=true;
	
  hyperMode =random(20);
  if(hyperMode>19){
  	hyperStripe=true;
  }if(hyperMode>19){
    hyperFlat=true;
  }if(hyperMode>18){
  	rotateXZ=false;
  }
  */
	frameRate(30);
	randomSeed(seed);
	minCanvasSize = min(windowWidth, windowHeight);
	margin = minCanvasSize / 100;
	createCanvas(windowWidth, windowHeight, WEBGL);
	//	theShader = createShader(vs, fs);
	textureMode(NORMAL);
	//  colorMode(HSB);
	/**
	whiteLRand=random(10);
	if(whiteLRand>5){  /////線を全て白にする
		gl = this._renderer.GL;
		myShader = createShader(vs, fs);
		shader(myShader);
	}
	*/
	//  noFill();
	//  gl.enable(gl.DEPTH_TEST); // 深度は基本無効になってるので有効にしておく
	//WebGL = createGraphics(width, height, WEBGL);
	//  background(220, 220, 220, 100);
	background(240, 240, 230, 100);
	
	//ULTRA RAREの場合は黒
	if (ultraRare) {
		colors = ["#000000"];
		background(0,0,0)
	}
	
	
	num = int(random(10, 30));
	radius = minCanvasSize * 0.75;
	//  for (let a = 0; a < TAU; a += TAU / num) {
	//  sizes.push(random(0.1, 0.5))
	//  }
	t = 0;
	fft = new p5.FFT(0.1, band);
	fft.setInput(sound);
	for (let i = 0; i < band; i++) {
		velocity[i] = createVector(0, 0);
		position2[i] = createVector(0, 0);
	}
	count = 0;
	//	if(minCanvasSize<1000){
	mRate = 1000 / minCanvasSize;
	myCamera = createCamera();
	infoP = createP();
	infoP2 = createP();
	infoP.position(20, 0);
	infoP2.position(20,20);
	//infoP2.style('font-size', '24px');
	//mainObj=int(random(7));
	arpha = 0.7;
	polygon = int(random(12));
	xmag = 1;
	ymag = 1;
	zmag = 2;
	friction = 0.701;
	ew = width;
	eh = ew / aspectRatio;
	hed = new Polyhedoron(ew / 2, eh * 0.6, eh * 0.5, 1);
	count2 = 0;
	count5 = 0;
	count6 = 0;
	
	randbkline =random(10);
	
	for (var i = 0; i < sphereMax; i++) {
		sphereArr[i] = new PointObj();
	}
	for (let i = 0; i < numSpheres; i++) {
		spheres.push({
			pos: createVector(random(-100, 100), random(-100, 100), random(-100, 100)),
			r: random(10, 50),
			speed: createVector(random(-1, 1), random(-1, 1), random(-1, 1))
		});
	}


	//事前に背景グリッドを描く
	for (let t = 0; t < height / 4; t++) {
		push();
		//stroke(255,255,255-t,255);
		stroke(255 - t, 255 - t, 155, 2);
		// stroke(255-t/100,255-t/100,255,2);
		randl = random(1000);
		if (hyperStripe && randl > 0) {
			line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
		}
		if (randl > 995) {
			if (baseLines) {
				stroke(255 - t, 255 - t, 155, 2);
				//stroke(random(colors))
				line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
			}
		}
		if (randl > 950) {
			// stroke(random(colors))
			//  line(-width,-height/2+ t*4,width, -height/2 + t*4);
		}
		pop();
	}
	
	 _text = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
	_text.textFont('Source Code Pro');
  _text.textAlign(CENTER);
  _text.textSize(133);
  _text.fill(3, 7, 11);
  _text.noStroke();
  _text.text(textParam1, width * 0.5, height * 0.5);
	
	
  dotPattern = createGraphics(40, 40);
  drawDotPattern();
	dotPattern2 = createGraphics(140, 140);
  drawDotPattern();
	
//	dotPattern2 = createGraphics(40, 40);
 // drawDotPattern2();
	
	
	//console.log(currentUrl);
  //console.log(queryParams); 

  // クエリパラメータを取得
  const cap = getQueryParam("cap");
  console.log("cap:", cap);

}

function drawDotPattern() {
  dotPattern.background(255, 255, 255, 0);
//  dotPattern.fill(random(colors));
  dotPattern.stroke(random(colors))
 // dotPattern.noStroke();
	
  for (let i = 0; i < dotPattern.width; i += 2) {
    for (let j = 0; j < dotPattern.height; j += 2) {
			//fill(random(colors))
		//	dotPattern.stroke(random(colors))
			//stroke(random(colors))
     // dotPattern.ellipse(i, j, 2, 2);
		//	dotPattern.point(i,j,1,1)
			rand=random(1000)
			if(rand>980){
		  	//dotPattern.line(i,j,i+1,j+10)
				dotPattern.rect(i, j, 1, 20);
			}
		//	dotPattern.rect(i, j, 1, 20);
    }
  }
}

function drawDotPattern2() {
  dotPattern.background(255, 255, 255, 0);
//  dotPattern.fill(random(colors));
  dotPattern.stroke(random(colors))
 // dotPattern.noStroke();
	
  for (let i = 0; i < dotPattern.width; i += 2) {
    for (let j = 0; j < dotPattern.height; j += 2) {
			//fill(random(colors))
		//	dotPattern.stroke(random(colors))
			//stroke(random(colors))
     // dotPattern.ellipse(i, j, 2, 2);
		//	dotPattern.point(i,j,1,1)
			rand=random(1000)
			if(rand>980){
		  	//dotPattern.line(i,j,i+1,j+10)
				for(let i=0; i<10;i++){
				 dotPattern.point(i+random(-10,10), j+random(-10,10));
				}
			}
		//	dotPattern.rect(i, j, 1, 20);
    }
  }
}

function ease(x) {
	if (x < 0.5) {
		if(superRare){
			return 8 * pow(x, 35);
		}else{
		  return 8 * pow(x, 4);
		}
	}
	if(superRare){
		return 1 - 8 * pow(1 - x, 35);
	}else{
	  return 1 - 8 * pow(1 - x, 4);
	}
	//	return 20 - 8 * pow(1 - x, 4);
}
/**
function createXYZslider(min, max, cam, pos) {
    const slider = createSlider(min, max, cam, 1);
    slider.position(pos.x, pos.y);
    slider.style('width', '400px');
    slider.input(function() {
        cam = slider.value();
    });
    return slider;
}
*/
function draw() {
	scale(0.9)
	/**
	rotateX(frameCount*0.01)
  rotateY(frameCount*0.004)
	rotateZ(frameCount*0.01)
	scale(0.2)
  let branches = [];
  branches.push(new Branch(0, 0, frameCount, 0, 0));
 // background(255,255,245);
	
  //translate(-width/2, -height/2);
  //translate(0, 0, -200);
  for (let i = 0; i < branches.length; i++) {
			let rand=random(1000)
			//if(rand>4678){
      branches[i].show();
		//	}
    if (branches[i].length < maxBranchLength) {
      if (branches.length < maxBranches) {
        if (random(1) < 0.005) {
          let newBranch = branches[i].createBranch();
          branches.push(newBranch);
        }
      }
    }
  }
	*/
	//	translate(-300,600)
	//音量が0.001以下になったらカウントリセット
	const level = amplitude.getLevel()
	if (level < 0.001 && sound.isPlaying() == true) {
		count = 0;
	} // easeの設定
	let prg = 1 - abs(240 - count % 480) / 240;
	prg = ease(prg);
	scale(1, 1, 1 + 2 * prg);
	//	myShader.setUniform("uCount", count);
	//WebGL.shader(theShader);
	drawR = random(10)
	if (drawR > 7) {
		count2++;
		count++;
		return
	}
	if (count > 6000) {
		count = 0
	} //count reset
	if (count2 > 500) {
		count2 = 0; //count2 rest
	}
	if (count2 > 460) {
		//	count2++; count++;  
		//	rotateX(frameCount/5+45 + (int(random(4)) * 360) / 4);
		//	rotate(-2);
		//	return;
	} //250-300の間は何もしない
	count2++


	/////////////////background change setting
	if (count > 4000) {
		afterImage = 2;
	} else {
		afterImage = 3;
	}
	if (rare) {
		hyperStripe = true;
		//	rotateX(frameCount/500);
		//		rotateY(frameCount/5+45 + (int(random(4)) * 360) / 4);
		//rotateZ(frameCount/500);
	}
	if (hyperStripe) {
		rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
	} else if (hyperFlat) {
	
	} else if (rotateXZ) {
		rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
		//	rotateY(frameCount/5+45 + (int(random(4)) * 360) / 4);
		rotateZ(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
	} else {
		rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
		rotateY(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
		rotateZ(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
	}
	//	rotateY(frameCount/5+45 + (int(random(4)) * 360) / 4);



	//十字キーで　Zoomなど操作
	if (keyIsDown(LEFT_ARROW)) {
		cameraX += stepX;
	} else if (keyIsDown(RIGHT_ARROW)) {
		cameraX -= stepX;
	}
	if (keyIsDown(UP_ARROW)) {
		cameraZ -= stepZ;
	} else if (keyIsDown(DOWN_ARROW)) {
		cameraZ += stepZ;
	}
	camera(cameraX + 0, 0, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  if (superRare) {
		rorand = random(100)
		if(rorand>80){
	  	rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 500);
			//rotateZ(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
		}
	}

	/////////////////// background glid setting
	for (let i = 0; i < height / 4; i++) {
		push();
		//stroke(255,255,255-i,100);
		stroke(255 - i, 255 - i, 155, 255);
		//line(-width,height/2- i*2,width, height/2 - i*2);
		pop();
	}
	for (let t = 0; t < height / 4; t++) {
		push();
		//stroke(255,255,255-t,255);
		stroke(255 - t, 255 - t, 155, 100);
		//	 line(-width,height/2+ t*2,width, height/2 + t*2);
		pop();
	}
	for (let i = 0; i < height / 4; i++) {
		push();
		//stroke(255,255,255-i,100);
		stroke(255 - i, 255 - i, 155, 255);
		//	 line(-width,-height/2- i*2,width, -height/2 - i*2);
		pop();
	}
	for (let t = 0; t < height / 4; t++) {
		push();
		//stroke(255,255,255-t,255);
		
			//stroke(255 - t, 255 - t, 155, 2);
				if(randbkline>8){ 
					stroke(255 - t, 100, 100, 2);
				}else if(randbkline>8){
					stroke(t, 255 - t, 155, 2);
				}else if(randbkline>6){
					stroke(t, 255 - t, 255-t, 2);
				}else if(randbkline>4){
					stroke(255-t, t, t,2);
				}else if(randbkline>2){
					stroke(t, t, t);
				}else{
				  stroke(255, 255, 255);
				}
		// stroke(255-t/100,255-t/100,255,2);
		randl = random(1000);
		if (hyperStripe && randl > 0) {
			line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
		}
		if (randl > 995) {
			if (baseLines) {
			//	stroke(255 - t, 255 - t, 155, 2);
				if(randbkline>8){ 
					stroke(255 - t, 100, 100, 2);
				}else if(randbkline>8){
					stroke(t, 255 - t, 155, 2);
				}else if(randbkline>6){
					stroke(t, 255 - t, 255-t, 2);
				}else if(randbkline>4){
					stroke(255-t, t, t,2);
				}else if(randbkline>2){
					stroke(t, t, t);
				}else{
				  stroke(255, 255, 255);
				}
				line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
			}
		}
		if (randl > 950) {
			// stroke(random(colors))
			//  line(-width,-height/2+ t*4,width, -height/2 + t*4);
		}
		pop();
	}
	if (count > 2500) {
		//s 	myCamera.camera(0, 0, 0 + (height / 2.0) / tan(180 * 26 / 180.0), 0, 0, 0, 0, 1, 0);
	}
	//	myCamera.camera(0, 0, 0 + (height / 2.0) / tan(180 * 26 / 180.0), 0, 0, 0, 0, 1, 0);


	//
	/**
	cameraRand = random(100)
	if(cameraRand>80){
	  camera(cameraX +0, 0, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
	}else if(cameraRand>70){
		camera(cameraX +500, -500, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
	}else if(cameraRand>60){
		camera(cameraX +500, -500, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
	}else if(cameraRand>20){
	}
	*/
	camera(cameraX + 0, 0, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);



	infoP.html('count:' + count + "   mainObject:" + mainObj + "    Color:" + type+"-"+colrand + "    Rarity:" + type + "   Level:" + level);
	infoP2.html(theTEXT );
	
 // texture(_text);
 // rotateY(map(mouseX, 0, width, 0, 3));
//  plane(window.innerWidth - 400, window.innerHeight - 400);
	
	
	rand = random(1000); //以降で利用するrand

	if (ultraRare) {
		if (rand < 100) {
			background(50, 50, 50);
			//return;
		}
	}
	//////
	for (let i = 0; i < 2; i++) {
		push();
		rotate(i * TWO_PI / 4);
		px = cos(frameCount * 0.005 + i * 0.1) * 200;
		py = sin(frameCount * 0.005 + i * 0.1) * 200;
		beginShape();
		for (let j = 0; j < 5; j++) {
			ang = j * TWO_PI / 20;
			d1 = noise(cos(ang) * 2 + px * 0.002 + t1 * 0.002, sin(ang) * 2 + py * 0.002 + t1 * 0.002);
			d2 = noise(cos(ang) * 1.5 + px * 0.003 + t2 * 0.003, sin(ang) * 1.5 + py * 0.003 + t2 * 0.003);
			d = map(d1, 0, 1, -50, 50) + map(d2, 0, 1, -50, 50);
			x = cos(ang) * (500 + d * level * 250);
			y = sin(ang) * (500 + d * level * 250);
			//	x = cos(ang) * (200 + d*15);
			//  y = sin(ang/4) * (200 + d*15);
			//	fill(200/i%2,50,200,20)
			stroke(50, 200 / i % 2, 200, 100)
			//fill(255,255,255,140*level*5)
			noFill();
			stroke(random(155,255))
			//stroke(0,0,0,0)
			if(count>2000){
				cnt=1000
			}else{
			  cnt=count;
			}
			for(let i=0; i<cnt/10; i++){
				randCu =random(1000)
				if(randCu>950){
			    curveVertex(x+i, y+i);
				}
			//curveVertex(x, y);
			//curveVertex(x, y);
			}
		}
		endShape(CLOSE);
		pop();
	}

 
	/////////////////Uneune setting
	if (uneune) {
		unerand = random(100);
		if (unerand > 90) {
			push();
			translate(-width / 2, -height / 2)
			beginShape();
			noFill();
			//fill(240)
			for (let t = 0; t <= TWO_PI * 2; t += 0.5) {
				let r = map(noise(t * 0.01, frameCount * 0.01), 0, 1, 650, 2);
				let x = r * cos(t) + width / 2;
				let y = r * sin(t) + height;
				y = map(noise(x * 0.01, frameCount * 0.01), 0, 1, 0, height);
				vertex(x, y + 200);
				vertex(x, y);
				vertex(x - 200, y - 200);
			}
			endShape();
			pop();
		}
	}

	///////////////// noise circles
	if (count > 3) {
		beginShape();
		for (let a = 0; a < TWO_PI * 2; a += 0.2) {
			let offset = noise(xoff) * 1 * t * 2;
			let r = 60 + offset;
			let x = r * cos(a);
			let y = r * sin(a);
			let d = dist(x + 500, y + 500, x + 3209, y + 3209);
			let mx = x + cos(r) * d * 0.1;
			let my = y + sin(r) * d * 0.1;
			xoff += 0.1;
			x = lerp(mx, mx + 100, 1);
			y = lerp(my, my + 100, 5);
			let n = noise(x * 0.005, y * 0.005, frameCount * 0.005);
			r = map(n, 0, 1, 0, TWO_PI);
			mx = x + cos(r) * d * 0.1;
			my = y + sin(r) * d * 0.1;
			offset = random(-1, 1);
			mx += offset;
			my += offset;
			push();
			noStroke();
			fill(random(colors))
			if (sprObj) {
				rect(mx + 200, my - 500, 5)
			}
			pop();
		}
		endShape(CLOSE);
	}


	//  音楽がplayでない時は200カウント毎にbackgroundを強制切り替え
	if (offcount % 200 == 0 && sound.isPlaying() == false) {
		if(ultraRare){
			background(50, 50, 50);
		}else{
		  background(random(bkcolors));
		}
	}
	// 300カウント毎にbackgroundを強制切り替え
	if (count % 300 == 0 && sound.isPlaying() == true) {
		background(240, 240, 220);
	}


	changeBK = true;
	if (changeBK && sound.isPlaying() == true) {
		// 300カウント毎にbackgroundを強制切り替え
		if (count % 300 == 0) {
			background(240, 240, 220);
		}
//	if (rand > 950 || count % 150 == 0) {
		if (rand > 950 ) {
			if (count < 870) {
				background(240, 240, 220);
			} else if (count > 870 && rand > 975) {
				background(random(colors));
			} else if (count > 870) {
				background(random(bkcolors));
			}
			if (count > 2) {
				rect(-width, -height, width * 2, height * 2)
			}
			/**
			if( rand>995){
				background(240, 240, 220);
			}else{
				background(220, 220, 220, 100);
			}
			*/
		}
	}

	if (rand > 50 && superRare || count % 50 == 0 && superRare) {
		ra = random(10)
		// After Image 残像の設定
		if (afterImage == 1) {
			if (ra > 5) {
				fill(240, 240, 220, 20)
			} else {
				fill(240, 240, 120, 20)
			}
		} else if (afterImage == 2) {
			if (ra > 5) {
				fill(240, 240, 240, 40)
			} else {
				fill(240, 240, 240, 40)
			}
		}
		if (ra > 5) {
			//  fill(240, 240, 220,10)
		} else {
			//  fill(230, 230, 240,10)
		}
		//
		if (afterImage > 0) {
			if (count > 2) {
				rect(-width, -height, width * 2, height * 2)
			}
		}
	}
	
	randomSeed(seed);
	randW = random(-400, 400)
	randH = random(-400, 400)
	/////////////////// sound spectrum trigger setting
	let spectrum = fft.analyze();
	//console.log(spectrum.length)
	//spectrum=createDummySpectrum();


	for (i = 0; i < spectrum.length; i++) {
		//スペクトルの強さを抽出
		let val = map(spectrum[i], 0, 255, 0, 1);
		//console.log(spectrum[i]);
		//スペクトルの強さから加える力を算出
		addForce = val * minCanvasSize * mRate * i / float(band) * 1.0 + 10 * mRate;

		//音楽が停止している際の設定
		if (sound.isPlaying() == false) {
			//translate(-400,400)
			//addForce = random(200, 350);
			addForce = random(200, 450);
			//spectrum[i] = random(-200, 200);
			spectrum = createDummySpectrum();
			angle = getRandomAngle();
			frameCount = random(6000)
			rotateX(0.01)
		  rotateY(0.01)
			rotateZ(random(-0.05,0.05))
			//translate(0,600)
			//camera(cameraX , 0, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
			//再生停止中はoffcountをカウントする
			offcount++;
			//level=random(200)
			//console.log("OFF")
		}
		//addForce = random(addForce - 20, addForce + 20)
		/**
			 push();
			let r = map(spectrum[i], 0, 255, 0, 200);
			let x = map(i, 0, spectrum.length, 0, width);
			let y = 0;
			let z = sin(frameCount * 0.01 + x * 0.1) * r;
			//translate(x/10, y, x);
			fill(255);
			sphere(510);
			pop();
			*/
		rand = random(1000);
		if (rand > 990) {
			push();
			fill(colorAlpha(random(colors), arpha))
			stroke(random(colors))
			//////////////////////// 
			push();
			if (circleRect && spectrum[20] > 0 && circleRectH > 0) {
				stroke(0, 0, 0, 0)
				// rect(spectrum[20] * 2, spectrum[20] * 2, spectrum[20] * circleRectH, 10);
			}
			pop();
			if (oscObj) {
				randip = 1000;
				randip = random(1000);
				if (count > 2500 && count < 4500 && randip > 900) {
					translate(random(400 * mRate), random(-400 * mRate));
					rotate(random(-2, 2));
					if (oscObj == 1) {
						hed.show();
					} else if (oscObj == 2) {
						//	translate(random(400 * mRate), random(-400 * mRate));
						//rotate(random(-2,2));
						push()
						noFill();
						let st = 200;
						x1 = random(st - 100, st + 100);
						y1 = random(st - 100, st + 100);
						w1 = random(200);
						translate(count / 100, count / 100);
						for (let i = 0; i < 20; i += 4) {
							//	 rect(x1+(-i,i*2),y1+(-i,i*2),w1+i+(-1,4));
							rect(x1 + (-i, i), y1 + (-i, i), w1 + i + 4 + count / 100);
						}
						pop();
					} else if (oscObj == 3) {
						push()
						noFill();
						let st = 200;
						x1 = random(st - 100, st + 100);
						y1 = random(st - 100, st + 100);
						w1 = random(500);
						translate(random(count / 10), random(count / 10));
						for (let i = 0; i < 2; i++) {
							//	 rect(x1+(-i,i*2),y1+(-i,i*2),w1+i+(-1,4));
							circle(x1 + (-i, i), y1 + (-i, i), w1 + i + 4 + count / 5);
						}
						pop();
						/**
									let aa = 30;
									let bb = 250;
									let deltaa = 0.02;
									let xx, yy;

									beginShape();
									for (let t = 0; t <Math.PI; t += deltaa) {
										xx = aa * Math.sin(t* aa)/10;
										yy = bb * Math.cos(t * bb)*10;

										// Change the value of a and b over time
									//	x = 30 + 2 * Math.sin(frameCount * 0.01);
									//	y = 50 + 2 * Math.cos(frameCount * 0.01);

									//	vertex(xx, yy);
										randr=random(100)
										if(randr>95){
											rect(xx-10,yy,20)
										//	circle(x,y,100)
										}
									}
									*/
					} else if (oscObj == 4) {
						randosc4 = random(100)
						if (randosc4 > 95) {
							rotate(random(-2, 2));
							for (let i = 0; i < 10; i++) {
								push();
								rotate(i * TWO_PI / 20);
								px = cos(frameCount * 0.005 + i * 0.1) * 200;
								py = sin(frameCount * 0.005 + i * 0.1) * 200;
								beginShape();
								for (let j = 0; j < 20; j++) {
									ang = j * TWO_PI / 20;
									d1 = noise(cos(ang) * 2 + px * 0.002 + t1 * 0.002, sin(ang) * 2 + py * 0.002 + t1 * 0.002);
									d2 = noise(cos(ang) * 1.5 + px * 0.003 + t2 * 0.003, sin(ang) * 1.5 + py * 0.003 + t2 * 0.003);
									d = map(d1, 0, 1, -50, 50) + map(d2, 0, 1, -50, 50);
									x = cos(ang / 4) * (200 + d * 15);
									y = sin(ang) * (200 + d * 15);
									//fill(200,50,200,20)
									noFill();
									stroke(random(colors))
									curveVertex(x, y);
								}
								endShape(CLOSE);
								pop();
							}
							t1 += 1;
							t2 += 2;
						}
					}
				}
			}
			/////////////////// sound spectrum trigger setting
			//rand=random(1000);
			if (voiceRect) {
				//translate(200,200)
				rotate(random(-2, 2));
				let x1 = map(Math.log10(i), 0, Math.log10(spectrum.length), width / 2, width);
				let x2 = map(Math.log10(i), 0, Math.log10(spectrum.length), width / 2, 0);
				let h1 = map(Math.log10(i), 0, Math.log10(spectrum.length), 0, 128);
				let diameter = map(pow(spectrum[i], 2), 0, pow(255, 2), 0, height);
				//fill(h1, 255, 255, 15);
				push();
				fill(colorAlpha(random(colors), 0.1));
				//	push();
				//translate(-width / 2, -height / 2);
			//	texture(dotPattern2)
				rect(x1, height / 2, diameter + level * 5);
				rect(x2, height / 2, diameter + level * 5);
				pop();
			}
			pop();
			push();
			beginShape();
			noFill();
			//	  stroke(random(colors2))
			rand = random(1000)
			if (rand > 900) {
				if (polygonLine) {
					/////////////////////// BK_POLYGON Setting
					for (let k = 0; k < polygon; k++) {
						let angle = TWO_PI / polygon * k;
						let px = cos(angle) * 520 / 2 * addForce / 3;
						let py = sin(angle) * 520 / 2 * addForce / 3;
						//	translate(random(-100,100),random(-100,100))
						stroke(random(colors))
						//	strokeWeight(random(10))
						vertex(px, py);
					}
				}
			}
			endShape(CLOSE);
			pop();
		}
		rand100 = random(1000);
		if (rand < 10) {}
		if (spectrum[20] < 100 && spectrum[20] > 80) {
			//	fill(255,255,0)
			//  rect(spectrum[20] * 2, spectrum[20] * 2, 50);
		}
		if (addForce > 120 && addForce < 140 && rand > 935) {
			//	drawvera30();
			//	stroke(220,0,0,250);
			//	fill(0,0,0,0);
			//	rect(0, 0, count5+coun5t/2)
			//	circle(0, 0, width - count+count/2);
		}
		if (addForce < 120 && addForce > 100 && rand > 935) {
			//	stroke(1);
			push();
			//rectMode(CENTER);
			st = count5 * 1;
			noFill();
			strokeWeight(1);
			//rotate(10)
			stroke(random(colors))
			if (conRect) {
				rect(randW, randH, width - count5)
			}
			count5 += 10;
			if (count5 > 5000) {
				count5 = 0;
			}
		}
		//////////////////////////// addForce > 450
		if (addForce > 450 && sound.isPlaying() == true) {
			
			background(220, 220, 220, 100);
			//fill(220,220,220,10)
			//rect(0,0,width,height);
		}
		//	addForce = val * minCanvasSize * i / float(band) * 1.0 + 10;
		//角度をランダムに決定
		let direction = radians(random(0, 360));
		//角度からX方向とY方向の力を算出
		let addX = cos(direction);
		let addY = sin(direction);
		//加速度のベクトルを算出
		// F = ma
		// a = F/m
		let accel = createVector(addX / mass, addY / mass);
		//加速度から次のフレームの速度を算出
		velocity[i].add(accel);
		//摩擦力の影響を受けた速度に
		velocity[i].mult(friction);
		//速度から次のフレームの位置を検出
		position2[i].add(velocity[i]);
		//画面からはみ出した際の処理
		if (position2[i].x < -minCanvasSize / 2 || position2[i].x > minCanvasSize / 2) {
			position2[i].x = 0;
		}
		if (position2[i].y < -minCanvasSize / 2 || position2[i].y > minCanvasSize / 2) {
			position2[i].y = 0;
		}
		// パーティクルを描画
		//色
		// let h = map(log10(i), 0, log10(band), 0, 255);
		//サイズ
		// let r = map(val, 0, 1, 1, 40);
		rand = random(1000);
		/////////////////////////////addForce > 150
		if (rand > 995 && addForce > 150) {
			for (let i = 0; i < num; i++) {
				let a = (TAU / num) * i;
				let x = radius * sin(a + t) / random(5, 3) / 1.0;
				let y = radius * cos(a + t) / random(3, 5) / 1.0;
				pp[i] = createVector(x, y);
			}
			push();
			/////////////////////////////addForce > 250
			if (addForce > 250) {
				translate(random(400 * mRate), random(-400 * mRate));
				//	camera(0, 0, height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);
				//		myCamera.camera(random(255), random(255), random(255) + (height / 2.0) / tan(180 * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
				push();
				stroke(220, 0, 0, 250);
				fill(0, 0, 0, 0);
				//rect(0, 0, count+count/2)
				//	fill(240,240,220)
				if (count > 3 && bigCircle) {
					circle(0, 0, width - count + count / 2);
				}
				pop();
				rand = random(1000);
				if (rand > 0) {
					push();
					fill(colorAlpha(random(colors), arpha))
					//random(colors);
					//stroke(0,0,0,0)
					rect(spectrum[20] * 2, spectrum[20] * 2, spectrum[20] * 2);
					pop();
				}
				if (circleRect && spectrum[20] * 2 > 130) {
					// translate(random(400 * mRate), random(-400 * mRate));
					rotate(random(-2, 2));
					push();
					//	ip.show();
					//translate(random(400 * mRate), random(-400 * mRate));
					rect(spectrum[20] * 2, spectrum[20] * 2, spectrum[20] * circleRectH, 10);
					pop();
				}
			}
			///////////////////////////////addForce > 300
			if (addForce > 300) {}
			///////////////////////////////addForce121-140
			if (addForce > 120 && addForce <= 140 && rand > 435) {
				//	drawvera30();
				push();
				stroke(220, 0, 0, 250);
				fill(0, 0, 0, 0);
				rect(0, 0, count + count / 2)
				circle(-100, 0, width - count + count / 2);
				stroke(255)
				rect(0, 0, width - count)
				line(width, width - count * 3, 0, count * 3);
			}
			/////////////////////////////////addForce100-120	
			if (addForce <= 120 && addForce >= 100) {

			}
			//textSize(50);
			//text(count,550,550);	
			// translate(200, -200);
			//
			if (mainObj == 1) {
				randMO = 2;
			} else {
				randMO = 0.02;
			}

			//for (let q = 0; q < 1 / 5; q += 2 * random(0.01, 2)) {
			for (let q = 0; q < 1 / 5; q += 2 * random(0.01, randMO)) {
				//for (let q = 0; q < 1 / 5; q += 2 * random(0.01, 2)) {
				for (let j = 0; j < 1; j++) {
					let n = noise(q * t, j * t, frameCount * 0.01);
					rotateX(random(TAU) + sin(-t) / 5 + q);
					rotateY(random(TAU) + cos(t) / 5 + q);
					rotateZ(random(TAU) + sin(-t) / 5 + q);
					noStroke();
					//fill(random(color_setup2));
					// fill(0, 50, h, h);
					fill(colorAlpha(random(colors), arpha));
					num = 20;
					for (let i = 0; i < num; i += 8) {
						rotateY(frameCount * 0.009);
						let d = random(radius / 2, radius / 4) / 1;
						push();
						rotateX(random(TAU) + sin(t) * random(TAU));
						rotateY(random(TAU) + cos(-t) + n / 10 * random(TAU));
						rotateZ(random(TAU) + 2 * sin(2 * t) + addForce / 20 * random(TAU));
						let x_plus = 1.25 * random(-d, d) / 1 * xmag;
						let y_plus = 1.25 * random(-d, d) / 1 * ymag;
						let z_plus = 1.25 * random(-d, d) / 1 * zmag;
						//	translate(x_plus/2, y_plus/2, z_plus/2);
						// circle(0,0, x_plus);
						// circle(0,0, y_plus);
						//		rect(z_plus,random(1),addForse,addForse);
						//		circle(z_plus,random(1),addForse,addForse);
						// 		cylinder((z_plus+parseInt(addForce/100))*mRate,random(100),parseInt(parseInt(addForce/100)*mRate));
						//		torus(z_plus*mRate,random(1),parseInt(parseInt(addForce/100)*mRate));
						ran = random(1000);
						if (spectrum[i] > 190 && ran > 950) {
							push();
							if (spectrum[i] > 240) {
								strokeWeight(2);
							} else {
								strokeWeight(1);
							}
							noFill();

							stroke(random(50), random(50), random(200), random(100));
							//		ellipse(random(-(spectrum[i]*2),spectrum[i]*2),random(-(spectrum[i]*2),spectrum[i]*2),random(addForce*3),parseInt(addForce-spectrum[i]),parseInt(random(addForce-spectrum[i]/2)));
							if (!(count > 850 && count < 1500)) {
								stroke(random(colors));
								//	 circle(0,0,random(200,addForce*40)/5);
							}
							pop();
						}
						//	ran=random(1000);
						if (ran < 300) {
							push();
							//	push();
							//		translate(-275, 175);
							//	rotateY(random(1.25));
							//	rotateX(-0.9);
							//    ambientLight(255);             // ※light
							//   ambientMaterial(220, 220, 30, 30);  ※light
							stroke(0, 0, 0, 0)
							//translate(100,0)
							if (count > 820 && count < 1900) {
								//cylinder((z_plus+parseInt(addForce/100)),random(5)+random(15),parseInt(parseInt(addForce/1000)));
								//cylinder((z_plus+parseInt(addForce/100)),random(2),parseInt(parseInt(addForce/100)));
								//torus(z_plus,random(1),parseInt(parseInt(addForce/100)));
							}
							pop();
						}
						//  ambientLight(60, 60, 60);   ※light
						//   pointLight(255, 255, 255, 50, 100, 100);  ※light
						/////////////////////////////////addForce > 250
						if (addForce > 250) {
					

							//  box(z_plus*mRate,random(105)*mRate,parseInt(addForce/2)*mRate);
							for (let i = 0; i < 10; i++) {
								push();
								pointLight(255, 255, 255, 250, 250, 100); //※light
								//  pointLight(0, 0, 0, 0, 100, 100);  //※light
								//  ambientLight(20);
								
								ambientLight(220); //※light //henkou
								
								
							//	ambientMaterial(50, 50, 100, 250);  //※light
								
								
								ambientMaterial(random(colors)); //henkou
								
								
								//	ambientMaterial(10,10,230);
								//	ambientMaterial(0,120,120);
								//		ambientMaterial(205);
								//		fill(255,255,255,255)
								//noFill();
								//time
								if (count > 820 && count < 2000) {
									if (subObj == 0) {
										rect((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate, (parseInt(addForce / 2) * 2) * mRate);
									} else if (subObj == 1) {
										circle((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate);
									} else {
										circle((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate);
									}

								}


								rand = random(100)
								if (rand > 20) {
									//mainObj=3;
									//mainObj=int(random(2,4))
									///////////////////////////////※※※※※※※※※※※MAIN OBJECT SETTING※※※※※※※※※※※※
									if (mainObj == 0) {
										push();
										
										randm1 =random(100)
										if(randm1>50){
										  fill(colorAlpha(random(colors), arpha));
										}else if(randm1<20){
											noFill();
											stroke(0)
										}
										//fill(colorAlpha(random(colors), arpha));
									//	stroke(0)
										if(textureOn){
										  texture(dotPattern);
										}
										box((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate, int((parseInt(addForce / 2) * 3) * mRate));
										pop();
									} else if (mainObj == 1) {
										push();
										noFill();
										rotateX(frameCount * 0.01);
										rotateY(frameCount * 0.21);
										let dt = 0.01;
										for (let i = 0; i < 100; i++) {
											let dx = aaa * (yy - xx);
											let dy = xx * (bbb - zz) - yy;
											let dz = xx * yy - ccc * zz;
											xx += dx * dt;
											yy += dy * dt;
											zz += dz * dt;
											stroke(colorAlpha(random(colors), arpha))
											noStroke();
											let r = 2;
											if(textureOn){
											//  texture(dotPattern);
											}
											ellipse(xx * r, yy * r, 280, 280);
										}
										pop();

										push();
										beginShape(TRIANGLE_STRIP);
										//	helixRadius=random(helixRadius);
										for (let i = 0; i <= helixTurns * TWO_PI; i += helixStep) {
											let x = helixRadius * cos(i);
											let y = helixRadius * sin(i);
											let z = helixHeight * i / helixTurns;
											//stroke(0,0,0,0)
											stroke(colorAlpha(random(colors), arpha))
											//noStroke();
											vertex(x, y, z);
											vertex(x, y, z - helixHeight);
										}
										endShape();
										angle += 0.02;
										pop();
										push();
										orbitControl();
										rotateX(angle);
										rotateY(angle * 1.3);
										rotateZ(angle * 0.7);
										noStroke();
										fractal(400, 10, 0, 20);
										angle += 0.02;
										pop();
										/**
											rand=random(100)
											if(rand>95){
											for (let i = 0; i < polygons.length; i++) {
												beginShape();
												let poly = polygons[i];
												for (let j = 0; j < poly.length; j++) {
													randd=random(100)
													if(randd>85){
													vertex(poly[j].x, poly[j].y, poly[j].z);
													}
												}
												endShape(CLOSE);
											}
											}
											*/
										//	push();
										// drawvera30()
										//	fill(colorAlpha(random(colors), arpha));
										//	strokeWeight(20);
										//  stroke(0);
										//		box((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 50) * mRate, int((parseInt(addForce / 2) * 3) * mRate));
										pop();
									} else if (mainObj == 2) {
										noStroke();
										//rotateY(frameCount / 40.0);
										//	rotateX(frameCount / 600.0);
										
										randm1 =random(100)
										if(randm1>50){
										  fill(colorAlpha(random(colors), arpha));
										}else if(randm1<20){
											noFill();
											stroke(0)
										}
										//fill(colorAlpha(random(colors), arpha));
										//texture(dotPattern);
										box((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate, int((parseInt(addForce / 2) * 3) * mRate));
										//回転をくりかえしながら立方体を描画
										for (let i = 0; i < 1; i++) {
											push();
											rotateZ(frameCount * 0.01);
											//	rotateX(frameCount * 0.01);
											//	rotateY(frameCount * 0.01);
											noFill();
											stroke(random(colors));
											//texture(dotPattern);
											randC=random(1000);
											if(randC>980){
											  cylinder(100 + addForce, 2, 10, 2);
											}
											pop();
										}
									} else if (mainObj == 3) {
										let hue = random(40, 80);
										noStroke();
										// let fillColor = color( hexToRgb(random(colors)));
										// fill(fillColor.setAlpha(100));
										fill(colorAlpha(random(colors), arpha));
										//　fillColor.setAlpha(100);
										let fuzzX = 0 + map(random(), 0, 200, 0, height / 10);
										let fuzzY = 0 + map(random(), 0, 200, 0, height / 10);
										if(sound.isPlaying() == false){
										  rotateX(0.01);
											rotateY(0.01);
											//rotateZ(0.01);
										}
										if(textureOn){
										  texture(dotPattern);
										}
										if (dist(0, 0, fuzzX, fuzzY) < height * 2) {
											ellipsoid(2, 180, 40);
											
											/**
											translate(random(1000),random(1000),random(1000))
											ellipsoid(2, 280, 80);
											*/
											// circle(fuzzX, fuzzY, map(random(), 400, 10, height /2, height / 2));
										}
										if (dist(0, 0, fuzzX, fuzzY) < height) {
										//	ellipsoid(2, 280, 80);
											
											/**
											translate(random(1000),random(1000),random(1000))
											ellipsoid(2, 280, 80);
											*/
											// circle(fuzzX, fuzzY, map(random(), 400, 10, height /2, height / 2));
										}
									} else if (mainObj == 4) {
										randrr = random(1000)
										if (randrr > 985) {
											//  torus(300, 50, 3, 3);
											rotateY(frameCount * .01);
											rotateX(PI / 2);
											//ambientMaterial(hu%360, 100, 100);
											cone(300, 300, 3, 1);
										}
									} else if (mainObj == 5) {
										randrr = random(1000)
										if (randrr > 985) {
											for (let i = 0; i < 20; i++) {
												push();
												rotate(i * TWO_PI / 20);
												px = cos(frameCount * 0.005 + i * 0.1) * 200;
												py = sin(frameCount * 0.005 + i * 0.1) * 200;
												beginShape();
												for (let j = 0; j < 20; j++) {
													ang = j * TWO_PI / 20;
													d1 = noise(cos(ang) * 2 + px * 0.002 + t1 * 0.002, sin(ang) * 2 + py * 0.002 + t1 * 0.002);
													d2 = noise(cos(ang) * 1.5 + px * 0.003 + t2 * 0.003, sin(ang) * 1.5 + py * 0.003 + t2 * 0.003);
													d = map(d1, 0, 1, -50, 50) + map(d2, 0, 1, -50, 50);
													x = cos(ang / 4) * (200 + d * 15);
													y = sin(ang) * (200 + d * 15);
													fill(200, 50, 200, 20)
													//noFill();
													stroke(random(colors))
													curveVertex(x, y);
												}
												endShape(CLOSE);
												pop();
											}
											t1 += 1;
											t2 += 2;
										}
										//t1 += 1;
										//t2 += 2;
									} else if (mainObj == 6) {
										for (let x = 0; x < 5; x++) {
											for (let y = 0; y < 5; y++) {
												for (let z = 0; z < 5; z++) {
													point(x * 10, y * 10, z * 10);
												}
											}
										}
									} else if (mainObj == 8) {
										//		let a = 130;
										//		let b = 20;
										let delta = 0.01;
										let x, y;
										beginShape();
										let aa = 30;
										let bb = 250;
										let deltaa = 0.02;
										let xx, yy;
										beginShape();
										for (let t = 0; t < Math.PI; t += deltaa) {
											xx = aa * Math.sin(t * aa) / 10;
											yy = bb * Math.cos(t * bb) * 10;
											// Change the value of a and b over time
											//	x = 30 + 2 * Math.sin(frameCount * 0.01);
											//	y = 50 + 2 * Math.cos(frameCount * 0.01);
											//	vertex(xx, yy);
											randr = random(100)
											if (randr > 95) {
												rect(xx - 10, yy, 20)
												//	circle(x,y,100)
											}
										}
										randrr = random(100)
										if (randrr > 95) {
											//rect(x,y,200)
										}
										endShape();
									} else if (mainObj == 9) {
										let a = 130;
										let b = 130;
										let delta = 0.01;
										let x, y;
										beginShape();
										for (let t = 0; t < 1; t += delta) {
											x = a * Math.sin(t * a);
											x = a;
											y = b * Math.cos(t * b);
											y = b;
											// Change the value of a and b over time
											//	x = 30 + 2 * Math.sin(frameCount * 0.01);
											//	y = 50 + 2 * Math.cos(frameCount * 0.01);
											//	vertex(x, y);
											randr = random(1000)
											if (randr > 998) {
												//	circle(x-10,y,50)
												translate(100, 10)
												rotate(10)
												sphere(int(50), int(50))
												//	circle(x-10,y,40)
											}
										}
										randrr = random(100)
										if (randrr > 95) {
											//rect(x,y,200)
										}
										endShape();
										let aa = 30;
										let bb = 250;
										let deltaa = 0.01;
										let xx, yy;
										beginShape();
										for (let t = 0; t < 2 * Math.PI; t += deltaa) {
											xx = aa * Math.sin(t * aa) / 100;
											yy = bb * Math.cos(t * bb) * 20;
											// Change the value of a and b over time
											//	x = 30 + 2 * Math.sin(frameCount * 0.01);
											//	y = 50 + 2 * Math.cos(frameCount * 0.01);
											//	vertex(xx, yy);
											randr = random(100)
											if (randr > 95) {
												//  circle(xx-10,yy,20)
											}
										}
										randrr = random(100)
										if (randrr > 95) {
											//rect(x,y,200)
										}
										endShape();
									}

									if (particle) {
										push();
										rotateX(frameCount * 0.01);
										rotateY(frameCount * 0.01);
										for (let i = 0; i < num_particles; i++) {
											particles[i].update();
											particles[i].display();
										}
										pop();
									}

									/**
									else if(mainObj==2){
										noStroke();
										rotateY(frameCount / 40.0);
										rotateX(frameCount / 600.0);

										//回転をくりかえしながら立方体を描画
										for (let i = 0; i < 1; i++) {
											push();
											//specularMaterial(i, 90, 255 - i);
											rotateX(frameCount / 240.0 + i / 2.0);
											rotateY(frameCount / 240.0 + i / 22.0);
											rotateZ(frameCount / 240.0 + i / 24.0);
											box(width / 24.0);
											pop();
										}
									}
									*/
								}
								//	}
								//	box(z_plus+i*10,random(105)+i*10,i*5,parseInt(addForce/2)*2);
								pop();
							}
						}
						pop();
					}
				}
			}
		}
	}
	t += random(2, 1) * random(0.001, 0.105) / 1;
	if (sound.isPlaying() == true) {
		count++;
	}
}


class PointObj {
	constructor() {
		this.x = random(-300, 300);
		this.y = random(-300, 300);
		this.z = random(-300, 300);
		this.xmove = random(-3, 3);
		this.ymove = random(-3, 3);
		this.zmove = random(-3, 3);
		this.preX = [];
		this.preY = [];
		this.preZ = [];
	}
	drawSphere() {
		for (var j = 0; j < trackCount; j++) {
			push();
			translate(this.preX[j], this.preY[j], this.preZ[j]);
			ambientLight(120);
			pointLight(255, 255, 255, 255, -600, -600, 300);
			ambientMaterial(255, 255, 255, 255 / (j * 5));
			sphere(3);
			pop();
		}
		push();
		translate(this.x, this.y, this.z);
		ambientLight(120);
		pointLight(255, 255, 255, 255, -600, -600, 300);
		ambientMaterial(255, 255, 255, 255);
		sphere(3);
		pop();
	}
	update() {
		this.x = this.x + this.xmove;
		this.y = this.y + this.ymove;
		this.z = this.z + this.zmove;
		if (this.x > 300 || this.x < -300) {
			this.xmove = -this.xmove;
		}
		if (this.y > 300 || this.y < -300) {
			this.ymove = -this.ymove;
		}
		if (this.z > 300 || this.z < -300) {
			this.zmove = -this.zmove;
		}
		var tmpX = [];
		var tmpY = [];
		var tmpZ = [];
		for (var j = 0; j < trackCount; j++) {
			tmpX[j] = this.preX[j];
			tmpY[j] = this.preY[j];
			tmpZ[j] = this.preZ[j];
			this.preX[j] = tmpX[j - 1];
			this.preY[j] = tmpY[j - 1];
			this.preZ[j] = tmpZ[j - 1];
		}
		this.preX[0] = this.x;
		this.preY[0] = this.y;
		this.preZ[0] = this.z;
	}
}



function Polyhedoron(ox, oy, faceSide, xScl) {
	var points0 = [];
	var points1 = [];
	var triShapes = [];
	var numFaces = 5;
	var aStep = TWO_PI / numFaces;
	for (var i = 0; i < numFaces; i++) {
		points0.push({
			x: cos(-PI / 2 + i * aStep) * faceSide,
			y: sin(-PI / 2 + i * aStep) * faceSide
		});
	}
	for (var i = 0; i < numFaces; i++) {
		points1.push({
			x: cos(-PI / 2 + (i + 0.5) * aStep) * faceSide * 1.5,
			y: sin(-PI / 2 + (i + 0.5) * aStep) * faceSide * 1.5
		});
	}
	for (var i = 0; i < numFaces; i++) {
		triShapes.push(new TriShape(0, 0, points0[i].x, points0[i].y, points0[(i + 1) % numFaces].x, points0[(i + 1) % numFaces].y));
		//  triShapes.push(new TriShape(points0[i].x, points0[i].y,points1[i].x, points1[i].y,points1[(i-1+numFaces)%numFaces].x, points1[(i-1+numFaces)%numFaces].y));
		triShapes.push(new TriShape(points0[i].x, points0[i].y, points0[(i + 1) % numFaces].x, points0[(i + 1) % numFaces].y, points1[i].x, points1[i].y));
	}
	this.show = function() {
		push();
		translate(ox, oy);
		scale(xScl);
		triShapes.forEach(function(ts) {
			ts.show();
			//  ts.run();
		});
		pop();
	};
}

function TriShape(p0x, p0y, p1x, p1y, p2x, p2y) {
	this.show = function() {
		//  colorMode(HSB);
		//fill(hCol, sCol, bCol);
		//fill(random(colors));
		fill(colorAlpha(random(colors), arpha))
		//	noFill();
		noStroke();
		stroke(random(colors));
		triangle(p0x, p0y, p1x, p1y, p2x, p2y);
		//  colorMode(RGB);
	}
}

function mouseClicked() {
	if (sound.isPlaying() == false) {
		count = 0;
		offcount = 0;
		sound.loop();
	} else {
		sound.stop();
		offcount = 0;
		count = 0;
	}
}

function keyTyped() {
	if (key === 's' || key === 'S') {
		saveCanvas('myCanvas', 'jpg');
		print("saving image");
	}
	return false;
}

function colorAlpha(aColor, alpha) {
	var c = color(aColor);
	return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}

function hexToRgb(hex) {
	hex = hex.replace('#', '');
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;
	return color(r, g, b);
}


class Particle {
	constructor() {
		this.pos = createVector(random(-width, width), random(-height, height), random(-100, 100));
		this.vel = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
		this.acc = createVector();
		this.color = random(colors)
		this.size = random(2, 10);
		this.lifespan = 10;
	}
	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.lifespan--;
		if (this.lifespan <= 0) {
			this.pos = createVector(random(-width, width), random(-height, height), random(-100, 100));
			this.vel = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
			this.lifespan = 10;
		}
	}
	display() {
		push();
		noStroke();
		specularMaterial(this.color);
		translate(this.pos.x, this.pos.y, this.pos.z);
		sphere(this.size);
		pop();
	}
}


function fractal(x, y, z, size) {
	if (size < 10) {
		return;
	}
	push();
	translate(x, y, z);
	stroke(random(colors))
	//noFill();
	box(size);
	let newsize = size * 0.2;
	fractal(-newsize, -newsize, -newsize, newsize);
	fractal(newsize, newsize, newsize, newsize);
	// fractal(-newsize, newsize, newsize, newsize);
	// fractal(newsize, -newsize, -newsize, newsize);
	pop();
}

function createDummySpectrum() {
	const dummySpectrum = new Array(1024).fill(0);

	for (let i = 0; i < dummySpectrum.length; i++) {
		dummySpectrum[i] = Math.random() * 255; //255でもいいけど
	}

	return dummySpectrum;
}

function drawLine(l) {
	if (l.type === 'solid') {
		line(l.start.x, l.start.y, l.end.x, l.end.y);
	} else {
		for (var i = 0; i <= dottedLineDensity; i++) {
			var x = lerp(l.start.x, l.end.x, i / dottedLineDensity);
			var y = lerp(l.start.y, l.end.y, i / dottedLineDensity);
			point(x, y);
		}
	}
}

function getElement(x, y) {
	var lines = [];
	var currentX = x;
	var currentY = y;
	var lineCountPossibilities = [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7];
	for (var i = 0; i < random(lineCountPossibilities); i++) {
		var nextLine = getRandomLine(currentX, currentY);
		currentX = nextLine.end.x;
		currentY = nextLine.end.y;
		lines.push(nextLine);
	}
	if (lines.length) {
		return lines;
	}
	return [{
		type: random(['solid', 'dotted']),
		start: {
			x: x,
			y: y
		},
		end: {
			x: x + lineLength,
			y: y
		}
	}];
}

function getRandomLine(x, y) {
	var angle = getRandomAngle();
	return {
		type: 'solid',
		start: {
			x: x,
			y: y
		},
		end: {
			x: x + lineLength * cos(angle),
			y: y + lineLength * sin(angle)
		}
	};
}

function getRandomAngle() {
	return floor(random(6, 361));
}

/**
function polyfill() {
	if (typeof Array.isArray === 'undefined') {
		Array.isArray = function(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		}
	}
	if (typeof Object.assign != 'function') {
		Object.assign = function(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}
			var to = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];
				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		};
	}
}
*/
`;

const genRandomAddress = () => {
  const id = crypto.randomBytes(32).toString("hex");
  const privateKey = "0x" + id;
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

describe("AsyncToSync", function () {
  it("should mint randomly", async function () {
    const terraNullius = await (await ethers.getContractFactory("TerraNullius")).deploy();
    await terraNullius.deployed();
    const cutUpGenerator = await (await ethers.getContractFactory("CutUpGeneration")).deploy(terraNullius.address);
    await cutUpGenerator.deployed();
    const renderer = await (await ethers.getContractFactory("Renderer")).deploy(cutUpGenerator.address);
    await renderer.deployed();
    const asyncToSync = await (await ethers.getContractFactory("AsyncToSync")).deploy(renderer.address);
    await asyncToSync.deployed();

    for (let i = 0; i < 40; i++) {
      const tx = await terraNullius.claim("test" + i);
      await tx.wait();
    }

	const scriptSplitRegex = /[\s\S]{1,12000}/g;
	const scripts = script.match(scriptSplitRegex);
    console.log('script length:', scripts?.length)
	for (let i = 0; i < scripts!.length; i++) {
		await (await renderer.setScript(i, scripts![i])).wait();
	}
	await (await renderer.setScriptsLength(scripts!.length)).wait();
	await (await asyncToSync.setRenderer(renderer.address)).wait();
    await (await asyncToSync.setBaseImageUrl("https://raw.githubusercontent.com/avcdsld/gen-art-music/main/metadata/image.png#")).wait();

    const totalNum = 128;
    expect(await asyncToSync.tokenRemaining()).to.equal(totalNum);

    const rarities: { [key: string]: number } = {};
    const mintedSeeds: { [key: number]: boolean } = [];
    for (let i = 5; i <= 4 + totalNum; i++) {
      const tx = await asyncToSync.mint(genRandomAddress());
      await tx.wait();
    }

    console.log(await asyncToSync.tokenURI(5));

    const preRevealTx = await asyncToSync.preReveal();
    await preRevealTx.wait();
    const revealTx = await asyncToSync.reveal();
    await revealTx.wait();

    for (let i = 5; i <= 4 + totalNum; i++) {
      const seed = await asyncToSync.seeds(i);
      expect(typeof mintedSeeds[seed]).to.equal("undefined");
      mintedSeeds[seed] = true;

      const { rhythm, oscillator, adsr, lyric, rarity } = await asyncToSync.musicParam(i);
      console.log({ rhythm, oscillator, adsr, lyric, rarity }, seed);

      if (!rarities[rarity]) {
        rarities[rarity] = 0;
      }
      rarities[rarity]++;
    }

    for (let i = 1; i <= 4; i++) {
      const seed = await asyncToSync.seeds(i);
      const { rhythm, oscillator, adsr, lyric, rarity } = await asyncToSync.musicParam(i);
      console.log({ rhythm, oscillator, adsr, lyric, rarity }, seed);
    }

    console.log(await asyncToSync.musicParam(5));
    console.log(await asyncToSync.tokenURI(5));

    console.log({ rarities });
  });
});
