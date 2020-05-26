import p5 from 'p5';

import {Snake} from './snake.js';

import 

var s;
var scl = 20;
var food;

var biteSound;
var fr = 10;
var score = 0;
var gameMode = "MENU";
var level = "levelOne";
var levelDesc = 'Classic Snake';
var dbg;

export default function sketch(p) {

 p.setup = function() {
 var cnvas = p.createCanvas(600,600);
 cnvas.position(p.windowWidth/2 - 300, p.windowHeight/2 - 300);
 p.frameRate(fr);

 s = new Snake();
 biteSound = new Audio();
 biteSound.src = "sounds/Bite01.wav";
 s.pickLocation();
 r2 = 0;
 g2 = 0;
 b2 = 0;
 dbg = p.createP(levelDesc);
 dbg.style('font-size', '32px');
}


p.draw = function () {
  if (score >= 5 &&score <  10) {
    level = 'levelTwo';
  } else if (score >= 10 &&score <  15) {
    level = 'levelThree';
  } else if (score >= 15 &&score <  20) {
    level = 'levelFour';
  }
dbg.html('Level: ' + levelDesc);
dbg.position(p.windowWidth/2-300,100);
    switch (level) {
      case 'levelOne':
        levelOne();
        break;
        case 'levelTwo':
        levelDesc = 'food changes colour black background';
        levelTwo();
        break;
        case 'levelThree':
        levelDesc = 'Rainbow Snake';
        levelThree();
        break;
    }

    p.background(r2,g2,b2);
    switch (gameMode) {
    case "MENU":
      loadMenu();
      break;
    case "RESET":
      resetGame();
      break;
    case "PLAY":
      launchGame();
      break;
    case "END":
      die();
  }

  // dbg.html(s.x + " " + s.y);
}



function loadMenu() {
  p.background(0);
  p.fill(100);
  p.rectMode(CENTER);
  p.fill(255);
  p.textSize(20);
  p.textAlign(CENTER);
  p.text("Press Button To Begin", width / 2, height / 2);
    if (keyIsPressed) {
      gamemode = "PLAY";
    }
  }

function  launchGame() {

  s.death();
  s.update();
  s.show();
  if (s.eat(food)) {


    s.pickLocation();
    if (level == 'levelTwo' || level == 'levelFour') {
      r = random(255);
      g = random(255);
      b = random(255);
    }
    if (level == 'levelThree' || level == 'levelFour') {
      r2 = random(255);
      g2 = random(255);
      b2= random(255);
    }
    biteSound.play();
    score++;
  }

  fill(r,g,b); // food colour
  rect(food.x,food.y,scl,scl);

  textSize(20);
  text(score,width/2, 20);
}

function resetGame() {
  level == 'levelOne';
  s.pickLocation();
  r2 = 0;
  g2 = 0;
  b2 = 0;
  r = 0;
  g = 255;
  b = 0;
  sc = color(0,255,0);
  p.textAlign(CENTER);
  p.textSize(24);
  p.text("You Died :(", width/2, height/2);
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  s.x = floor(random(cols));
  s.y = floor(random(rows));
  s.x *= scl;
  s.y *= scl;
}


// fix death caused by going backwards

// eslint-disable-next-line no-unused-vars
function keyPressed() {
  gameMode = "PLAY";
  if (keyCode === UP_ARROW && !s.dir(0,1)) {
    s.dir(0,-1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0,1);
  }  else if (keyCode === RIGHT_ARROW) {
    s.dir(1,0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1,0);
  }

}

}
