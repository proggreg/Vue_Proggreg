
import * as p from 'p5';

let scl = 20;

export function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.update = function() {
  if (this.total === this.tail.length) {
    for (var i =0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
  }
  this.tail[this.total-1] = p.createVector(this.x,this.y);
  this.x = this.x + this.xspeed * scl;
  this.y = this.y + this.yspeed * scl;
}

    this.show = function() {
      p.fill(sc);
      p.noStroke();
        for (var i = 0; i < this.tail.length; i++) {
          p.rect(this.tail[i].x,this.tail[i].y,scl,scl); // tail
          }
      p.rect(this.x,this.y,scl,scl); // snake
    }

    this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
    }

    this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
        this.total++;
        return true;
      }
      return false;
    }

    this.pickLocation = function() {
      var cols = floor(width/scl);
      var rows = floor(height/scl);
       cols = floor(random(cols));
       rows = floor(random(rows))
      for (var i = 0; i < this.tail.length; i++) {
          if (cols == this.tail[i].x && rows == this.tail[i].y) {
            this.pickLocation();
            console.log('clash');
          }
        }

      food = createVector(cols,rows);
      food.mult(scl);
    }

    this.death = function() {
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.total = 0;
        this.tail = [];
        score = 0;
        console.log('dead');
        gameMode = "RESET";
      }
      for (var i = 0; i < this.tail.length;i++) {
        var pos = this.tail[i];
        var d = dist(this.x,this.y,pos.x,pos.y);
          if (d < 1) {
                this.total = 0;
                this.tail = [];
                score = 0;
                gameMode = "RESET";
          }
        }
      }
}
