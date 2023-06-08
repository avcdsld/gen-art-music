let sound;
let fft;
let band = 2048; //FFTサイズ
let position2 = []; //位置のベクトル
let velocity = []; //速度のベクトル
let friction = 0.75; //摩擦
let mass = 10.0; //質量
var seed = Math.random() * 3;
var t;
var num;
var radius, margin;
let xoff = 0;
let count = 0;
let offcount = 0;
let pp = [];
let arpha;
let afterImage;
var hed;
var aspectRatio = 16 / 9;
var ew, eh;
let colors1 = ["#EF6100", "#EF6100", "#FF9D00", "#FFC100", "#0070F6", "#D7C7DE", "#D0B3F4", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
//let colors2 = ["#A4ECFF", "#8461C9", "#EF6100", "#598200", "#DCEF25", "#FF0097", "#FF0000", ];
let colors2 = ["#A4ECFF", "#8461C9", "#EF6100", "#598200", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
//let colors3 = ["#DCEF25", "#FF0097", "#0070F6"];
let colors3 = ["#FF0097", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
let colors4 = ["#0070F6", "#FFFFFF", "#0f07af", "#FF9D00", "#CBD5DC", "#CBD5DC"];
let colors5 = ["#A4ECFF", "#0070F6", "#00AF57", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
let colors6 = ["#A4ECFF", "#8461C9", "#D0B3F4", "#FF80D2", "#FFEB36", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
let colors7 = ["#FFF100", "#C265A4", "#CBD5DC", "#0f07af", "#FFFFFF", "#000000"];
let colors8 = ["#FFF100", "#CBD5DC", "#CBD5DC", "#EA5514"];
let colors9 = ["#008CD6", "#B9A172", "#124098", "#8DC556"]; //Bright Blue base
let colors10 = ["#005BAC", "#7D7D7D", "#8D1038", "#FFFFFF", "#0f7baf"];
let colors11 = ["#EEE0C0", "#DEC69F", "#920783", "#93B4C5"]; //Beige
let colors12 = ["#C9CACA", "#EDDFD6", "#E73273", "#40cecb"]; //Red 
let colors13 = ["#EEE0C0", "#920783", "#C9CACA", "#C9CACA"]; //Beige silver purple-red 
let colors14 = ["#EEE0C0", "#0f07af3", "#C9CACA", "#0070F6"]; //Beige silver purple-red 
let colors15 = ["#EF6100", "#EF6100", "#FF9D00", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
let colors16 = ["#0070F6", "#FFFFFF", "#f2f9e7", "#0f7baf"];
let colors17 = ["#A4ECFF", "#8461C9", "#D0B3F4"];
let colors18 = ["#FF3399", "#006F86", "#f2f9e7", "#0f7baf", "#40cecb", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC",];
let colors19 = ["#DCEF25", "#FF0097", "#0070F6", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];
let colors20 = ["#0070F6", "#FFFFFF", "#f2f9e7", "#0f7baf", "#CBD5DC", "#CBD5DC", "#CBD5DC", "#CBD5DC"];

let cmColors1 = ["#00a63d", "#ced5dc"];
let cmColors2 = ["#40cecb", "#ced5dc", "#ced5dc", "#ced5dc"];
let cmColors3 = ["#367589", "#ced5dc"];
let cmColors4 = ["#6aa9de", "#ced5dc", "#6aa9de", "#ced5dc", "#0070F6"];
let cmColors5 = ["#849bab", "#ced5dc", "#0f7baf"];
let cmColors6 = ["#ceafb2", "#ced5dc", "#ceafb2", "#ced5dc", "#FF80D2"];
let cmColors7 = ["#f2f9e7", "#ced5dc", "#736f6c", "#f2f9e7", "#ced5dc", "#736f6c", "#FF9D00"];
let cmColors8 = ["#8ba26C", "#ced5dc", "#8ba26C", "#ced5dc", "#40cecb"];
let cmColors9 = ["#d6441b", "#ced5dc"];
let cmColors10 = ["#ff3403", "#ced5dc", "#f2f9e7", "#f2f9e7"];
let cmColors11 = ["#ff3403", "#ced5dc", "#ec008c", "#CBD5DC", "#CBD5DC"];
let cmColors12 = ["#ced5dc", "#9a7ccf", "#d0747c"];
let cmColors13 = ["#503c47", "#ced5dc", "#dbcabf"];
let cmColors14 = ["#28171a", "#ced5dc", "#a59089"];
let cmColors15 = ["#f9dd00", "#ced5dc", "#f5cc5e"];
let cmColors16 = ["#e6d29b", "#ced5dc", "#ddd582", "#FF9D00"];
let cmColors17 = ["#27a1a4", "#ced5dc", "#00a63d"];
let cmColors18 = ["#27a1a4", "#ced5dc", "#4166f5", "#CBD5DC", "#CBD5DC"];
let cmColors19 = ["#536fb0", "#ced5dc", "#849bab"];
let cmColors20 = ["#ff3403", "#ced5dc", "#d78152"];

let bkcolors = ["#afafb0", "#eae8e1", "#FAFAD2"]

let colorsYve = ["#00008b"];
let bkcolorsYve = ["#ced5dc"]

let whiteLine = false;
let whiteLineP1 = 20;
let whiteLineP2 = 250;
let whiteLineP3 = 250;
let whiteLineRandom = false;

// const A2S_RARITY = ["COMMON", "RARE", "SUPERRARE", "ULTRARARE","ONE_OF_ONE"];
const RHYTHMS = ["THICK", "LO_FI", "HI_FI", "GLITCH"];
const LYRICS = ["LITTLE_BOY", "FUSSY_MAN", "OLD_MANN", "LITTLE_GIRL"];
const OSCILLATORS = ["GLITCH", "LFO", "FREAK", "LYRA"];
const ADSRS = ["PIANO", "PAD", "PLUCK", "LEAD"];

/**
const A2S_TOKEN_ID = 5;
const A2S_RARITY = "COMMON";
const A2S_RHYTHM = "GLITCH";
const A2S_OSCILLATOR = "GLITCH";
const A2S_ADSR = "LEAD";
const A2S_LYRIC = "SHUFFLE";
const A2S_CU1 = "dGVzdDQ=";
const A2S_CU2 = "dGVzdDA=";
const A2S_CU3 = "dGVzdDM3";
const A2S_CU4 = "dGVzdDIy";
const A2S_CU5 = "dGVzdDEz";
const A2S_CU6 = "dGVzdDI0";
const A2S_CU7 = "dGVzdDEz";
const A2S_CU8 = "dGVzdDE5";
const A2S_CU9 = "dGVzdDk=";
const A2S_CU10 = "dGVzdDMy";
const A2S_CU11 = "dGVzdDY=";
const A2S_CU12 = "dGVzdDM0";
*/

let type;
let rhythm;
let lyric;
let osc;
let adsr;

let mainObj;
let myCamera;
let infoP;
let infoP2;
let infoP3;
let voiceRect = false;
let bigCircle = false;
let textureOn = false;
var sphereArr = [];
var sphereMax = 50;
var trackCount = 15;
let numSpheres = 10;
let spheres = [];
let particles = [];
let num_particles = 10;
let helixRadius = 200;
let helixHeight = 15;
let helixTurns = 1;
let helixStep = 0.2;
let angle = 0;
let polygons = [];
let xx = 0;
let yy = 0;
let zz = 0;
let aaa = 110;
let bbb = 128;
let ccc = 8 / 1;
let cameraX = 0,
    cameraZ = 0;
const stepX = 10,
    stepZ = 10;
let t1 = 0,
    t2 = 100;

let dotPattern;
let noiseScale = 0.002;
let noiseStrength = 1250;
let maxBranchingAngle = Math.PI / 11;
let minBranchLength = 111;
let maxBranchLength = 113;
let colors44 = ["#FFEB36", "#FF9D00", "#EF6100"];

let mic;
let micLevel;
let micMode;
let amplitude;
let micAmplitude;
let level;
let addForce;
let displayInfo = true;


class Branch {
    constructor(x, y, z, angle, length) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.angle = angle;
        this.length = length;
    }

    show() {
        stroke(random(0, 50));
        strokeWeight(0.1);
        push();
        translate(this.x, this.y, this.z);
        rotateY(this.angle);
        noFill();
        beginShape();
        rotateY(0.1)
        rotateZ(1)
        vertex(0, 0, 0);
        let n = noise(this.x * noiseScale, this.y * noiseScale, this.z * noiseScale);
        let r = map(n, 0, 1, 1, noiseStrength);
        for (let i = 0; i <= 1; i++) {
            let x = r * cos(i * 2 * Math.PI / 9);
            let y = r * sin(i * 2 * Math.PI / 7);

            rotateZ(i * 2)
            translate(x, y, i * 0.001)
            texture(dotPattern);
            translate(x + x, y + y, i * 0.001)
            fill(random(colors44))
            texture(dotPattern2);
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
    type = A2S_RARITY;
    rhythm = A2S_RHYTHM === "SHUFFLE" ? random(RHYTHMS) : A2S_RHYTHM;
    lyric = A2S_LYRIC === "SHUFFLE" ? random(LYRICS) : A2S_LYRIC;
    osc = A2S_OSCILLATOR === "SHUFFLE" ? random(OSCILLATORS) : A2S_OSCILLATOR;
    adsr = A2S_ADSR === "SHUFFLE" ? random(ADSRS) : A2S_ADSR;

    const c1 = rhythm === "THICK" ? "A" : rhythm === "LO_FI" ? "B" : rhythm === "HI_FI" ? "C" : "D";
    const c2 = lyric === "LITTLE_GIRL" ? "A" : lyric === "OLD_MAN" ? "B" : lyric === "FUSSY_MAN" ? "C" : "D";
    const c3 = osc === "LYRA" ? "A" : osc === "FREAK" ? "B" : osc === "LFO" ? "C" : "D";
    const c4 = adsr === "PIANO" ? "A" : adsr === "PAD" ? "B" : adsr === "PLUCK" ? "C" : "D";
    sound = loadSound(A2S_SOUND_BASE_URL + c1 + c2 + c3 + c4 + '.mp3');
}


function setup() {
    //amplitude = new p5.Amplitude();

    mic = new p5.AudioIn();
    fft = new p5.FFT(0.1, band);
    fft.setInput(sound);

    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
    //  micAmplitude = new p5.Amplitude();
    //  micAmplitude.setInput(mic);

    setAttributes("alpha", false);

    PARAM1 = A2S_PARAM1;
    PARAM2 = A2S_PARAM2;
    PARAM3 = A2S_PARAM3;
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
    textParams = [textParam1, textParam2, textParam3, textParam4, textParam5, textParam6, textParam7, textParam8, textParam9, textParam10, textParam11, textParam12];
    theTEXT = textParams[Math.floor(Math.random() * textParams.length)];
    //theTEXT = textParam1 + " " + textParam2 + " " + textParam3 + " " + textParam4 + " " + textParam5 + " " + textParam6 + " " + textParam7 + " " + textParam8 + " " + textParam9 + " " + textParam10 + " " + textParam11 + " " + textParam12;
    console.log(theTEXT)

    hyperStripe = false;
    hyperFlat = false;
    rotateXZ = true;

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
        textureOn = true;
        hyperStripe = true;
        afterImage = int(random(3));
    } else {
        superRare = false;
    }
    if (type == "ULTRARARE") {
        ultraRare = true;
        hyperStripe = true;
    } else {
        ultraRare = false;
    }

    if (type == "ONE_OF_ONE") {
        oneOfOne = true;

    } else {
        oneOfOne = false;
    }
    textureOn = true;
    console.log("Rarity:" + type)
    colrand = int(PARAM1);

    if (!common) {
        randCol2 = random(10)
        if (randCol2 > 5) {
            colrand = colrand + 10;
        } else {
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
        } else if (colrand == 12) {
            colors = colors12;
        } else if (colrand == 13) {
            colors = colors13;
        } else if (colrand == 14) {
            colors = colors14;
        } else if (colrand == 15) {
            colors = colors15;
        } else if (colrand == 16) {
            colors = colors16;
        } else if (colrand == 17) {
            colors = colors17;
        } else if (colrand == 18) {
            colors = colors18;
        } else if (colrand == 19) {
            colors = colors19;
        } else if (colrand == 20) {
            colors = colors20;
        } else {
            colors = colors4;
        }
    }
    if (common) {
        randCol = random(10)
        if (randCol > 5) {
            colrand = colrand + 10;
        } else {
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
        } else {
            colors = cmColors1;
        }
    }

    if (oneOfOne == true) {
        colors = colorsYve;
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

    } else if (lyric == "LITTLE_GIRL") { }

    //ランダムにサブオブジェクトを決定する
    subObj = int(random(3));
    //console.log("subObj:" + subObj)

    ////////////////after Image mode
    //ADSRによってAfter Image Modeを決定する　ADSR=["PIANO","PAD","PLUCK","LEAD"]
    if (adsr == "PIANO") {
        afterImage = 0;
    } else if (adsr == "PAD") {
        afterImage = 1;
    } else if (adsr == "PLUCK") {
        afterImage = 2;
    } else if (adsr == "LEAD") {
        afterImage = 3;
    } else {
        afterImage = int(random(3));
    }
    //console.log("ADSR:" + adsr)

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

    if (PARAM2 > 5) {
        whiteLine = false;
    } else if (PARAM2 > 3) {
        whiteLine = true;
        whiteLineP1 = 20;
        whiteLineP2 = 250;
        whiteLineP3 = 250;

    } else if (PARAM2 > 2) {
        whiteLine = true;
        whiteLineP1 = random(20);
        whiteLineP2 = random(250);
        whiteLineP3 = random(250);

    } else {
        whiteLine = true;
        whiteLineRandom = true;
    }

    /////////////////attributeObjects
    if (oneOfOne) {
        PARAM3 = 10;
    }
    if (PARAM3 > 5) {
        vrRand = random(10);
        if (vrRand > 5) {
            voiceRect = true;
        } else {
            voiceRect = false;
        }
        uneRand = random(10)
        if (uneRand > 9) {
            uneune = true;
        } else {
            uneune = false;
        }
        sprObj = true;
        conRect = false;
        baseLines = false;
        polygonLine = true;
        particle = false
    } else if (PARAM3 > 3) {
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
        sprObj = false;
        conRect = true;
        baseLines = false;
        polygonLine = true;
        particle = false;
    } else if (PARAM3 > 1) {
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
        uneune = false;
        sprObj = false;
        conRect = true;
        baseLines = true;
        polygonLine = false;
        particle = false;
    } else {
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
        uneune = false;
        sprObj = false;
        conRect = false;
        baseLines = false;
        polygonLine = false;
        particle = false;
    }

    /////////////////Osc Objects
    //OSCILLATORに合わせてoscObjを決定する　OSCILLATOR=["GLITCH","LFO","FREAK","LYRA"]
    if (osc == "GLITCH") {
        oscObj = 1;
    } else if (osc == "LFO") {
        oscObj = 2;
    } else if (osc == "FREAK") {
        oscObj = 3;
    } else if (osc == "LYRA") {
        oscObj = 4;
    }
    oscObj = 2;

    /////////////////Circle Rect
    circleRect = true;
    circleRectH = 1;
    ////////////////rotateMode
    frameRate(30);
    randomSeed(seed);
    minCanvasSize = min(windowWidth, windowHeight);
    margin = minCanvasSize / 100;
    createCanvas(windowWidth, windowHeight, WEBGL);
    textureMode(NORMAL);

    if (minCanvasSize < 500) {
        friction = 0.25;
        frameRate(30);
    }
    background(240, 240, 230, 100);

    //ULTRA RAREの場合は黒
    if (ultraRare) {
        colors = ["#000000"];
        background(0, 0, 0)
    }

    num = int(random(10, 30));
    radius = minCanvasSize * 0.75;
    t = 0;
    fft = new p5.FFT(0.1, band);
    fft.setInput(sound);
    for (let i = 0; i < band; i++) {
        velocity[i] = createVector(0, 0);
        position2[i] = createVector(0, 0);
    }
    count = 0;
    mRate = 1000 / minCanvasSize;
    myCamera = createCamera();
    infoP = createP();
    infoP2 = createP();
    infoP3 = createP();
    infoP.position(20, 0);
    infoP2.position(20, 20);
    infoP3.position(20, 40);
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

    randbkline = random(10);

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
        stroke(255 - t, 255 - t, 155, 1);
        randl = random(1000);
        if (hyperStripe && randl > 0) {
            line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
        }
        if (randl > 995) {
            if (baseLines) {
                stroke(255 - t, 255 - t, 155, 1);
                line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
            }
        }
        if (randl > 950) { }
        pop();
    }

    dotPattern = createGraphics(40, 40);
    drawDotPattern();
    dotPattern2 = createGraphics(140, 140);
    drawDotPattern();

    // クエリパラメータを取得
    //  const cap = getQueryParam("cap");
    //  console.log("cap:", cap);
}

function drawDotPattern() {
    dotPattern.background(255, 255, 255, 0);
    dotPattern.stroke(random(colors))

    for (let i = 0; i < dotPattern.width; i += 2) {
        for (let j = 0; j < dotPattern.height; j += 2) {
            rand = random(1000)
            if (rand > 980) {
                dotPattern.rect(i, j, 1, 20);
            }
        }
    }
}

function ease(x) {
    if (x < 0.5) {
        if (superRare) {
            return 8 * pow(x, 35);
        } else {
            return 8 * pow(x, 4);
        }
    }
    if (superRare) {
        return 1 - 8 * pow(1 - x, 35);
    } else {
        return 1 - 8 * pow(1 - x, 4);
    }
}

function draw() {
    const level = amplitude.getLevel()
    if (micMode) {

    } else {
        if (level < 0.001 && sound.isPlaying() == true) {
            count = 0;
        }
    }
    scale(0.9)
    //音量が0.001以下になったらカウントリセット
    if (level < 0.001 && sound.isPlaying() == true) {
        count = 0;
    } // easeの設定
    let prg = 1 - abs(240 - count % 480) / 240;
    prg = ease(prg);
    scale(1, 1, 1 + 2 * prg);
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
    if (count2 > 460) { } //250-300の間は何もしない
    count2++

    /////////////////background change setting
    if (count > 4000) {
        afterImage = 2;
    } else {
        afterImage = 3;
    }
    if (rare) {
        hyperStripe = true;
    }
    if (hyperStripe) {
        rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
    } else if (hyperFlat) {

    } else if (rotateXZ) {
        rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
        rotateZ(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
    } else {
        rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
        rotateY(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
        rotateZ(frameCount / 5 + 45 + (int(random(4)) * 360) / 4);
    }
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
        if (rorand > 80) {
            rotateX(frameCount / 5 + 45 + (int(random(4)) * 360) / 500);
        }
    }

    /////////////////// background glid setting
    for (let i = 0; i < height / 4; i++) {
        push();
        stroke(255 - i, 255 - i, 155, 255);
        pop();
    }
    for (let t = 0; t < height / 4; t++) {
        push();
        stroke(255 - t, 255 - t, 155, 100);
        pop();
    }
    for (let i = 0; i < height / 4; i++) {
        push();
        stroke(255 - i, 255 - i, 155, 255);
        pop();
    }
    for (let t = 0; t < height / 4; t++) {
        push();

        if (randbkline > 8) {
            //stroke(255 - t, 100, 100, 1);
            stroke(0, 100, 255 - t, 1);
        } else if (randbkline > 8) {
            stroke(t, 255 - t, 155, 1);
        } else if (randbkline > 6) {
            stroke(t, 255 - t, 255 - t, 1);
        } else if (randbkline > 4) {
            stroke(255 - t, t, t, 1);
        } else if (randbkline > 2) {
            stroke(t, t, t, 1);
        } else {
            stroke(235, 235, 235, 1);
        }
        randl = random(1000);
        if (hyperStripe && randl > 0) {
            push();
            strokeWeight(0.5);
            line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
            pop();
        }
        if (randl > 995) {
            if (baseLines) {
                if (randbkline > 8) {
                    stroke(255 - t, 100, 100, 2);
                } else if (randbkline > 8) {
                    stroke(t, 255 - t, 155, 2);
                } else if (randbkline > 6) {
                    stroke(t, 255 - t, 255 - t, 2);
                } else if (randbkline > 4) {
                    stroke(255 - t, t, t, 2);
                } else if (randbkline > 2) {
                    stroke(t, t, t);
                } else {
                    stroke(255, 255, 255);
                }
                line(-width, -height / 2 + t * 4, width, -height / 2 + t * 4);
            }
        }
    }
    camera(cameraX + 0, 0, cameraZ + height / 2 / tan(PI / 6), 0, 0, 0, 0, 1, 0);

    if (displayInfo) {
        if (micMode) {
            infoP.html("mainObj:" + mainObj + "    Color:" + type + "-" + colrand);
            infoP2.html('count:' + count + "   MicMode Force:" + parseFloat(addForce.toFixed(3)));
            infoP3.html(theTEXT);
        } else {
            infoP.html("mainObj:" + mainObj + "    Color:" + type + "-" + colrand);
            infoP2.html('count:' + count + "   Level:" + parseFloat(level.toFixed(5)));
            infoP3.html(theTEXT);
        }
    } else {
        infoP.html('');
        infoP2.html('');
        infoP3.html('');
    }

    rand = random(1000); //以降で利用するrand

    if (ultraRare) {
        if (rand < 100) {
            background(50, 50, 50);
        }
    }
    //////
    if (whiteLine) {
        for (let i = 0; i < 2; i++) {
            push();
            rotate(i * TWO_PI / 4);
            px = cos(frameCount * 0.005 + i * 0.1) * 200;
            py = sin(frameCount * 0.005 + i * 0.1) * 200;
            beginShape();
            if (whiteLineRandom) {
                whiteLineP1 = random(20);
                whiteLineP2 = random(250);
                whiteLineP3 = random(250);
            }
            for (let j = 0; j < 5; j++) {

                ang = j * TWO_PI / whiteLineP1;
                d1 = noise(cos(ang) * 2 + px * 0.002 + t1 * 0.002, sin(ang) * 2 + py * 0.002 + t1 * 0.002);
                d2 = noise(cos(ang) * 1.5 + px * 0.003 + t2 * 0.003, sin(ang) * 1.5 + py * 0.003 + t2 * 0.003);
                d = map(d1, 0, 1, -50, 50) + map(d2, 0, 1, -50, 50);
                x = cos(ang) * (500 + d * level * whiteLineP2);
                y = sin(ang) * (500 + d * level * whiteLineP3);
                stroke(50, 200 / i % 2, 200, 100)
                noFill();
                stroke(random(155, 255))
                if (count > 2000) {
                    cnt = 1000
                } else {
                    cnt = count;
                }
                for (let i = 0; i < cnt / 50; i++) {
                    randCu = random(1000)
                    if (randCu > 950) {
                        curveVertex(x + i, y + i);
                    }
                }
            }
            endShape(CLOSE);
            pop();
        }
    }

    //uneune=true;
    /////////////////Uneune setting
    if (uneune) {
        unerand = random(100);
        if (unerand > 90) {
            push();
            translate(-width / 2, -height / 2)
            beginShape();
            noFill();
            for (let t = 0; t <= TWO_PI * 2; t += 0.5) {
                let r = map(noise(t * 0.01, frameCount * 0.01), 0, 1, 650, 2);
                let x = r * cos(t) + width / 2;
                let y = r * sin(t) + height;
                y = map(noise(x * 0.01, frameCount * 0.01), 0, 1, 0, height);
                if (unerand > 96) {
                    vertex(x, y + 200 * mRate);
                    vertex(x, y);
                    vertex(x - 200 * mRate, y - 200 * mRate);
                }
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

    if (micMode) {
        //  音楽がplayでない時は200カウント毎にbackgroundを強制切り替え
        if (offcount % 200 == 0 && addForce < 90) {
            if (ultraRare) {
                background(50, 50, 50);
            } else {
                background(random(bkcolors));
            }
        }
        // 300カウント毎にbackgroundを強制切り替え
        if (count % 300 == 0 && addForce < 90) {
            background(240, 240, 220);
        }
        changeBK = true;
        if (changeBK && addForce < 90) {
            // 300カウント毎にbackgroundを強制切り替え
            if (count % 300 == 0) {
                background(240, 240, 220);
            }
            if (rand > 950) {
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
            }
        }
    } else {
        //  音楽がplayでない時は200カウント毎にbackgroundを強制切り替え
        if (offcount % 200 == 0 && sound.isPlaying() == false) {
            if (ultraRare) {
                background(50, 50, 50);
            } else {
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
            if (rand > 950) {
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
            }
        }
    }

    if (rand > 750 && superRare || count % 350 == 0 && superRare) {
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

    for (i = 0; i < spectrum.length; i++) {
        //スペクトルの強さを抽出
        let val = map(spectrum[i], 0, 255, 0, 1);
        //スペクトルの強さから加える力を算出
        addForce = val * minCanvasSize * mRate * i / float(band) * 1.0 + 10 * mRate;
        if (!micMode) {
            //音楽が停止している際の設定
            if (sound.isPlaying() == false) {
                addForce = random(200, 450);
                spectrum = createDummySpectrum();
                angle = getRandomAngle();
                frameCount = random(6000)
                rotateX(0.01)
                rotateY(0.01)
                rotateZ(random(-0.05, 0.05))
                //再生停止中はoffcountをカウントする
                offcount++;
            }
        }
        rand = random(1000);
        if (rand > 990) {
            push();
            fill(colorAlpha(random(colors), arpha))
            stroke(random(colors))
            ////////////////////////
            push();
            if (circleRect && spectrum[20] > 0 && circleRectH > 0) {
                stroke(0, 0, 0, 0)
            }
            pop();
            if (oscObj) {
                randip = 1000;
                randip = random(1000);
                if (count > 2500 && count < 4500 && randip > 900) {
                    translate(random(800 * mRate), random(-400 * mRate));
                    rotate(random(-2, 2));
                    if (oscObj == 1) {
                        hed.show();
                    } else if (oscObj == 2) {
                        hed.show();
                    } else if (oscObj == 3) {
                        push()
                        noFill();
                        let st = 200;
                        x1 = random(st - 100, st + 100);
                        y1 = random(st - 100, st + 100);
                        w1 = random(500);
                        translate(random(count / 10), random(count / 10));
                        for (let i = 0; i < 2; i++) {
                            circle(x1 + (-i, i), y1 + (-i, i), w1 + i + 4 + count / 5 * mRate);
                        }
                        pop();
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
            if (voiceRect) {
                rotate(random(-2, random(12)));
                let x1 = map(Math.log10(i), 0, Math.log10(spectrum.length), width / 2, width);
                let x2 = map(Math.log10(i), 0, Math.log10(spectrum.length), width / 2, 0);
                let diameter = map(pow(spectrum[i], 2), 0, pow(255, 2), 0, height);
                push();
                fill(colorAlpha(random(colors), 0.1));
                rect(x1, height / 2, diameter + level * 5 * mRate);
                rect(x2, height / 2, diameter + level * 5 * mRate);
                pop();
            }
            push();
            beginShape();
            noFill();
            rand = random(1000)
            if (rand > 900) {
                if (polygonLine) {
                    /////////////////////// BK_POLYGON Setting
                    for (let k = 0; k < polygon; k++) {
                        let angle = TWO_PI / polygon * k;
                        let px = cos(angle) * 520 / 2 * addForce / 3;
                        let py = sin(angle) * 520 / 2 * addForce / 3;
                        stroke(random(colors))
                        vertex(px, py);
                    }
                }
            }
            endShape(CLOSE);
            pop();
        }
        rand100 = random(1000);
        if (rand < 10) { }
        if (spectrum[20] < 100 && spectrum[20] > 80) {
        }
        if (addForce > 120 && addForce < 140 && rand > 935) {
        }
        if (addForce < 120 && addForce > 100 && rand > 935) {
            push();
            st = count5 * 1;
            noFill();
            strokeWeight(1);
            stroke(random(colors))
            if (conRect) {
            }
            count5 += 10;
            if (count5 > 5000) {
                count5 = 0;
            }
        }
        //////////////////////////// addForce > 450
        if (addForce > 450 && sound.isPlaying() == true) {
            background(220, 220, 220, 100);
        }
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
                push();
                stroke(220, 0, 0, 250);
                fill(0, 0, 0, 0);
                if (count > 3 && bigCircle) {
                    circle(0, 0, width - count + count / 2 * mRate);
                }
                pop();
                rand = random(1000);
                if (rand > 0) {
                    push();
                    fill(colorAlpha(random(colors), arpha))
                    rect(spectrum[20] * 2 * mRate, spectrum[20] * 2 * mRate, spectrum[20] * 2 * mRate);
                    pop();
                }
                if (circleRect && spectrum[20] * 2 > 130) {
                    rotate(random(-2, 2));
                    push();
                    rect(spectrum[20] * 2 * mRate, spectrum[20] * 2 * mRate, spectrum[20] * circleRectH * mRate, 10 * mRate);
                    pop();
                }
            }
            ///////////////////////////////addForce > 300
            if (addForce > 300) { }
            ///////////////////////////////addForce121-140
            if (addForce > 120 && addForce <= 140 && rand > 435) {
                push();
                stroke(220, 0, 0, 250);
                fill(0, 0, 0, 0);
                rect(0, 0, count + count / 2 * mRate)
                circle(-100, 0, width - count + count / 2 * mRate);
                stroke(255)
                rect(0, 0, width - count)
                line(width, width - count * 3, 0, count * 3 * mRate);
            }
            /////////////////////////////////addForce100-120
            if (addForce <= 120 && addForce >= 100) {
            }
            if (mainObj == 1) {
                randMO = 2;
            } else {
                randMO = 0.02;
            }

            for (let q = 0; q < 1 / 5; q += 2 * random(0.01, randMO)) {
                for (let j = 0; j < 1; j++) {
                    let n = noise(q * t, j * t, frameCount * 0.01);
                    rotateX(random(TAU) + sin(-t) / 5 + q);
                    rotateY(random(TAU) + cos(t) / 5 + q);
                    rotateZ(random(TAU) + sin(-t) / 5 + q);
                    noStroke();
                    fill(colorAlpha(random(colors), arpha));
                    num = 20;
                    for (let i = 0; i < num; i += 8) {
                        rotateY(frameCount * 0.009);
                        let d = random(radius / 2, radius / 4) / 1;
                        push();
                        rotateX(random(TAU) + sin(t) * random(TAU));
                        rotateY(random(TAU) + cos(-t) + n / 10 * random(TAU));
                        rotateZ(random(TAU) + 2 * sin(2 * t) + addForce / 20 * random(TAU));
                        let z_plus = 1.25 * random(-d, d) / 1 * zmag;
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
                            if (!(count > 850 && count < 1500)) {
                                stroke(random(colors));
                            }
                            pop();
                        }
                        if (ran < 300) {
                            push();
                            stroke(0, 0, 0, 0)
                            if (count > 820 && count < 1900) { }
                            pop();
                        }
                        /////////////////////////////////addForce > 250
                        if (addForce > 250) {
                            for (let i = 0; i < 10; i++) {
                                push();
                                pointLight(255, 255, 255, 250, 250, 100); //※light
                                ambientLight(220); //※light //henkou
                                ambientMaterial(random(colors)); //henkou

                                if (count > 820 && count < 2000) {
                                    if (subObj == 0) {
                                        if (mainObj == 1) {
                                            rect((z_plus + i * 10) * mRate, (random(105) + i * 1) * mRate, (i * 1) * mRate, (parseInt(addForce / 2) * 2) * mRate);
                                        } else {
                                            rect((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate, (parseInt(addForce / 2) * 2) * mRate);
                                        }
                                    } else if (subObj == 1) {
                                        circle((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate);
                                    } else {
                                        circle((z_plus + i * 10) * mRate, (random(105) + i * 10) * mRate, (i * 5) * mRate);
                                    }

                                }


                                rand = random(100)
                                if (rand > 20) {
                                    ///////////////////////////////※※※※※※※※※※※MAIN OBJECT SETTING※※※※※※※※※※※※
                                    if (mainObj == 0) {
                                        push();

                                        randm1 = random(100)
                                        if (randm1 > 50) {
                                            fill(colorAlpha(random(colors), arpha));
                                        } else if (randm1 < 20) {
                                            noFill();
                                            stroke(0)
                                        }
                                        if (textureOn) {
                                            texture(dotPattern);
                                        }
                                        box(int((z_plus + i * 10) * mRate), int((random(105) + i * 10) * mRate), int((i * 5) * mRate), int(int((parseInt(addForce / 2) * 3) * mRate)));
                                        pop();
                                    } else if (mainObj == 1) {
                                        push();
                                        noFill();
                                        rotateX(frameCount * 0.01);
                                        rotateY(frameCount * 0.01);
                                        rotateZ(frameCount * 0.201);
                                        let dt = 0.01;
                                        for (let i = 0; i < 10; i++) {
                                            let dx = aaa * (yy - xx);
                                            let dy = xx * (bbb - zz) - yy;
                                            let dz = xx * yy - ccc * zz;
                                            xx += dx * dt;
                                            yy += dy * dt;
                                            zz += dz * dt;
                                            stroke(colorAlpha(random(colors), arpha))
                                            noStroke();
                                            let r = 2;
                                            if (textureOn) { }
                                            ellipse(xx * r, yy * r, 280 * mRate, 280 * mRate);
                                        }
                                        pop();

                                        push();
                                        beginShape(TRIANGLE_STRIP);
                                        randob = random(100)
                                        if (randob > 90) {
                                            for (let i = 0; i <= helixTurns * TWO_PI; i += helixStep) {
                                                let x = helixRadius * cos(i);
                                                let y = helixRadius * sin(i);
                                                let z = helixHeight * i / helixTurns;
                                                stroke(colorAlpha(random(colors), arpha))
                                                vertex(x, y, z);
                                            }
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
                                        fractal(random(200, 600), 0, 0, 10);
                                        angle += 0.02;
                                        pop();
                                        pop();
                                    } else if (mainObj == 2) {
                                        noStroke();

                                        randm1 = random(100)
                                        if (randm1 > 50) {
                                            fill(colorAlpha(random(colors), arpha));
                                        } else if (randm1 < 20) {
                                            noFill();
                                            stroke(0)
                                        }
                                        box(int((z_plus + i * 10) * mRate), int((random(105) + i * 10) * mRate), int((i * 5) * mRate), int(int((parseInt(addForce / 2) * 3) * mRate)));
                                        //回転をくりかえしながら立方体を描画
                                        for (let i = 0; i < 1; i++) {
                                            push();
                                            rotateZ(frameCount * 0.01);
                                            noFill();
                                            stroke(random(colors));
                                            randC = random(1000);
                                            if (randC > 980) {
                                                cylinder(100 + addForce * mRate, 2, 10, 2);
                                            }
                                            pop();
                                        }
                                    } else if (mainObj == 3) {
                                        noStroke();
                                        fill(colorAlpha(random(colors), arpha));
                                        let fuzzX = 0 + map(random(), 0, 200, 0, height / 10);
                                        let fuzzY = 0 + map(random(), 0, 200, 0, height / 10);
                                        if (sound.isPlaying() == false) {
                                            rotateX(0.01);
                                            rotateY(0.01);
                                        }
                                        if (textureOn) {
                                            texture(dotPattern);
                                        }
                                        if (dist(0, 0, fuzzX, fuzzY) < height * 2) {
                                            ellipsoid(2, 180 * mRate, 40 * mRate);
                                        }
                                        if (dist(0, 0, fuzzX, fuzzY) < height) { }
                                    } else if (mainObj == 4) {
                                        randrr = random(1000)
                                        if (randrr > 985) {
                                            rotateY(frameCount * .01);
                                            rotateX(PI / 2);
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
                                                    stroke(random(colors))
                                                    curveVertex(x, y);
                                                }
                                                endShape(CLOSE);
                                                pop();
                                            }
                                            t1 += 1;
                                            t2 += 2;
                                        }
                                    } else if (mainObj == 6) {
                                        for (let x = 0; x < 5; x++) {
                                            for (let y = 0; y < 5; y++) {
                                                for (let z = 0; z < 5; z++) {
                                                    point(x * 10, y * 10, z * 10);
                                                }
                                            }
                                        }
                                    } else if (mainObj == 8) {
                                        beginShape();
                                        let aa = 30;
                                        let bb = 250;
                                        let deltaa = 0.02;
                                        let xx, yy;
                                        beginShape();
                                        for (let t = 0; t < Math.PI; t += deltaa) {
                                            xx = aa * Math.sin(t * aa) / 10;
                                            yy = bb * Math.cos(t * bb) * 10;
                                            randr = random(100)
                                            if (randr > 95) {
                                                rect(xx - 10, yy, 20)
                                            }
                                        }
                                        randrr = random(100)
                                        if (randrr > 95) { }
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
                                            randr = random(1000)
                                            if (randr > 998) {
                                                translate(100, 10)
                                                rotate(10)
                                                sphere(int(50), int(50))
                                            }
                                        }
                                        randrr = random(100)
                                        if (randrr > 95) { }
                                        endShape();
                                        let aa = 30;
                                        let bb = 250;
                                        let deltaa = 0.01;
                                        let xx, yy;
                                        beginShape();
                                        for (let t = 0; t < 2 * Math.PI; t += deltaa) {
                                            xx = aa * Math.sin(t * aa) / 100;
                                            yy = bb * Math.cos(t * bb) * 20;
                                            randr = random(100)
                                            if (randr > 95) { }
                                        }
                                        randrr = random(100)
                                        if (randrr > 95) { }
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
                                }
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
        triShapes.push(new TriShape(points0[i].x, points0[i].y, points0[(i + 1) % numFaces].x, points0[(i + 1) % numFaces].y, points1[i].x, points1[i].y));
    }
    this.show = function () {
        push();
        translate(ox * 1.2, oy * 1.2);
        translate(0, random(400, 1200));
        rotateX(0.51)
        rotateY(0.1)
        rotateZ(0.1)
        scale(xScl);
        triShapes.forEach(function (ts) {
            ts.show();
        });
        pop();
    };
}

function TriShape(p0x, p0y, p1x, p1y, p2x, p2y) {
    this.show = function () {
        fill(colorAlpha(random(colors), arpha))
        noStroke();
        stroke(random(colors));
        randt = random(100);
        if (randt > 50) {
            triangle(p0x, p0y, p1x, p1y, p2x, p2y);
        }
        if (randt > 75 && oscObj == 2) {
            triangle(p0x + 100, p0y + 100, p1x + 100, p1y + 100, p2x + 100, p2y + 100);
        }
    }
}

// 共通の処理を行う関数
function handleEvent() {
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

// タッチイベントがサポートされているかどうかをチェック
if ('ontouchstart' in window) {
    // タッチイベントがサポートされている場合、touchStarted関数を設定
    function touchStarted() {
        handleEvent();
        return false; // 追加のブラウザの動作を防ぐ
    }
} else {
    // タッチイベントがサポートされていない場合、mouseClicked関数を設定
    function mouseClicked() {
        handleEvent();
    }
}

function keyTyped() {
    if (key === 'd' || key === 'D') {
        displayInfo = !displayInfo; // Toggle the display state
    }
    if (key === 's' || key === 'S') {
        saveCanvas('myCanvas', 'jpg');
        print("saving image");
    }

    if (key === 'm' || key === 'M') {
        micMode = !micMode;

        if (micMode) {
            mic.start();
            //   micAmplitude.setInput(mic);
            fft.setInput(mic);
        } else {
            mic.stop();
            amplitude.setInput(sound);
            fft.setInput(sound);
        }
    }
}

function colorAlpha(aColor, alpha) {
    var c = color(aColor);
    return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
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
    box(size);
    let newsize = size * 0.2;
    fractal(-newsize, -newsize, -newsize, newsize);
    fractal(newsize, newsize, newsize, newsize);
    pop();
}

function createDummySpectrum() {
    const dummySpectrum = new Array(1024).fill(0);

    for (let i = 0; i < dummySpectrum.length; i++) {
        dummySpectrum[i] = Math.random() * 255; //255でもいいけど
    }

    return dummySpectrum;
}

function getRandomAngle() {
    return floor(random(6, 361));
}
