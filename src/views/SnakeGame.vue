


<template>
  <div class="snakegame">
    <v-container fluid>
      <h3 >Your score: {{score}}</h3>
      <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col><canvas id='canvas'/></v-col>
        
       <v-col><ScoreBoard/></v-col>
       <v-col></v-col>
      
      </v-row>
      <br>
      <button v-text="controlMessage" @click="startStop()">hell</button>
      </v-container>
      
  </div>  
</template>
<script>

import ScoreBoard from '../components/ScoreBoard';

export default {
    name: 'SnakeGame',
    components:{
      ScoreBoard
    },
    mounted() {
      var canvas = this.$el.querySelector('canvas');
      this.canvas = canvas;
      this.vueCanvas = this.canvas.getContext('2d');
      this.food = {
        x: this.getRandomGrid(canvas.width),
        y: this.getRandomGrid(canvas.height)
      }
      this.timer = setInterval(this.draw,200); // draw every 200ms (5 Frames per second)
      window.addEventListener("keydown",this.handleGlobalKeyDown);

      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
    data: function() {
      return {
        vueCanvas: null,
        canvas: null,
        width: 200,
        height: 200,
        scale: 20,
        snake: {
          x: 0,
          y: 0,
          tail: [{x:0,y:0}]
        },
        food: {
          x: this.getRandomGrid(this.width),
          y: this.getRandomGrid(this.height)
        },
        timer: null, 
        dir: 'right',
        score: 0,
        controlMessage: 'Play',
        gameState: 'SETUP'
      }
    },
    methods: {
      getRandomGrid(max) {
        return Math.floor(Math.random() * Math.floor(max / this.scale)) * this.scale;
      },
      drawfood:function() {
        this.vueCanvas.beginPath();
        this.vueCanvas.rect(this.food.x,this.food.y,this.scale,this.scale);
        this.vueCanvas.fillStyle = 'red';
        this.vueCanvas.fill();
      },
      snakePos:function(x,y) {

        // update snakes position
        this.snake.x  = x;
        this.snake.y  = y;  
        // if (this.score === this.snake.tail.length) {
          for (let i = 0; i < this.snake.tail.length-1; i++) {
              this.snake.tail[i] = this.snake.tail[i+1];
            }
        // }
        this.snake.tail[this.score] = {x,y};

        // draw snake
        this.vueCanvas.beginPath(); 
        for (let i = 0; i < this.snake.tail.length; i++) {
          this.vueCanvas.fillStyle = "rgb(0, 255, 0)";
          this.vueCanvas.fillRect(this.snake.tail[i].x,this.snake.tail[i].y,this.scale,this.scale); // tail
        }
      },
      move(d) {
        if (d === 'up') {
          this.snakePos(this.snake.x, this.snake.y - this.scale)
        } else if (d === 'right'){
            this.snakePos(this.snake.x + this.scale, this.snake.y)
        } else if (d === 'down') {
          this.snakePos(this.snake.x, this.snake.y + this.scale)
        } else if (d === 'left') {
          this.snakePos(this.snake.x - this.scale, this.snake.y)
        }
      },
      draw() {
        this.vueCanvas.clearRect(0,0,this.canvas.width,this.canvas.height);
        switch (this.gameState) {
          case 'RUNNING':
            this.move(this.dir);
            this.eat();
            this.drawfood();  
            this.death();
            break;
          case 'SETUP':
            this.vueCanvas.fillStyle = "white";
            this.vueCanvas.font = "30px Comic Sans MS";
            this.vueCanvas.textAlign = "center";
            this.vueCanvas.fillText("Snake",this.width / 2,this.height / 2);
            break;
          case 'RESET':
            this.vueCanvas.fillStyle = "white";
            this.vueCanvas.font = "30px Comic Sans MS";
            this.vueCanvas.textAlign = "center";
            this.vueCanvas.fillText("You Died",this.width / 2,this.height / 2);
            this.running = false;
            this.controlMessage = "Play";
            this.dir = "right";
            this.snake.x = 0;
            this.snake.y = 0;
            break;
        
          default:
            break;
        }    
      },
      drawGrid() {
        this.vueCanvas.strokeStyle = 'white';
        for (let y = 0; y < this.height; y+=this.scale) {
          for (let x =0; x < this.width; x+=this.scale) {
            this.vueCanvas.beginPath();
            this.vueCanvas.moveTo(x,0);
            this.vueCanvas.lineTo(x,this.canvas.height);
            this.vueCanvas.stroke()

            this.vueCanvas.beginPath();
            this.vueCanvas.moveTo(0,y);
            this.vueCanvas.lineTo(this.canvas.height,y);
            this.vueCanvas.stroke();
          } 
        }
      },
      handleGlobalKeyDown(e) {
        var kc = e.keyCode
        if (kc === 38) {
          this.dir = 'up';
        } else if (kc === 39){
          this.dir = 'right';
        } else if (kc === 40) {
          this.dir = 'down'
        } else if (kc === 37) {
          this.dir = 'left'
        }
      },
      eat() {
        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
          this.newFood();
          this.score++;
        }
      },
      startStop() {
        this.controlMessage = this.running ? 'Play' : 'Pause';
        this.running = !this.running;
          if (this.running || this.gameState === 'RESET') {
           this.gameState = 'RUNNING'
        }
    
      },
      newFood() {
        let foodok = true;
          for (let i = 0; i < this.snake.tail.length;i++) {
            if (this.food.x === this.snake.tail[i].x && this.food.y === this.snake.tail[i].y) {
              this.food.x = this.getRandomGrid(this.width);
              this.food.y = this.getRandomGrid(this.height);
              foodok = false;
              console.log('food landed on snake');
              break;
            }
          }
          if (foodok) {
            return;
          } else {
            this.newFood();
          }
      },
      death() {
          if (this.snake.x < 0 ||
              this.snake.x > this.canvas.width ||
              this.snake.y < 0 ||
              this.snake.y > this.canvas.height) {
              this.die();
          }
        
          for (let i = 1; i < this.snake.tail.length - 1;i++) {
          let pos = this.snake.tail[i];
          let d = Math.sqrt(Math.pow((this.snake.x-pos.x), 2) + Math.pow((this.snake.y-pos.y), 2));
            if (d < 1) {
                  this.die();
                  this.gameState = 'RESET';
                  console.log(d);
                  console.log('died');
            }
          }  
      },
      die(){
        this.snake.tail = [];
        this.score = 0;
        this.gameState = 'RESET';
      }
    }
}  

</script>
<style scoped>
canvas {
  background-color: black;
}
v-col {
  background-color: pink;
}
</style>