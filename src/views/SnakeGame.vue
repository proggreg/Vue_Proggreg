


<template>
  <div class="snakegame">
      <canvas  width="600" height="600" id='canvas'/> 

      <button v-text="controlMessage" @click="startStop()"></button>
      <h3>{{score}}</h3>
  </div>  
</template>



<script>
export default {
    name: 'SnakeGame',
    mounted() {
      var canvas = this.$el.querySelector('canvas');
      var ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.vueCanvas = ctx;
      this.snake = {
        x: 0,
        y: 0,
        tail: []
      }
      this.food = {
        x: this.randomint(this.canvas.width / this.scale) * this.scale,
        y: this.randomint(this.canvas.height / this.scale) * this.scale
      }
      this.timer = setInterval(this.draw,200);
      this.snakePos(0,0);
      window.addEventListener("keydown",this.handleGlobalKeyDown);

      this.snake.tail[0] = {x:0,y:0};
    },
    data: function() {
      return {
        canvas: null,
        vueCanvas: null,
        scale: 20,
        snake: {
          x: 0,
          y: 0,
          tail: []
        },
        timer: null, 
        dir: 'right',
        score: 0,
        running: false,
        controlMessage: 'Play'
      }
    },
    methods: {
      randomint:function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      drawfood:function() {
        this.vueCanvas.beginPath();
        this.vueCanvas.rect(this.food.x,this.food.y,this.scale,this.scale);
        this.vueCanvas.fillStyle = 'red';
        this.vueCanvas.fill();
      },
      snakePos:function(x,y) {
        this.snake.x  = x;
        this.snake.y  = y;  
        // if (this.score === this.snake.tail.length) {
          for (let i = 0; i < this.snake.tail.length-1; i++) {
              this.snake.tail[i] = this.snake.tail[i+1];
            }
        // }
        this.snake.tail[this.score] = {x,y};
        this.vueCanvas.beginPath(); 
        
        for (let i = 0; i < this.snake.tail.length; i++) {
          this.vueCanvas.fillStyle = 'green';
          this.vueCanvas.fillRect(this.snake.tail[i].x,this.snake.tail[i].y,this.scale,this.scale); // tail
        }
      },
      move(d) {
        if (d === 'up') {
          this.snakePos(this.snake.x, this.snake.y - this.scale)
        } else if(d === 'right'){
            this.snakePos(this.snake.x + this.scale, this.snake.y)
        } else if(d === 'down') {
          this.snakePos(this.snake.x, this.snake.y + this.scale)
        } else if(d === 'left') {
          this.snakePos(this.snake.x - this.scale, this.snake.y)
        }
      }
      ,
      draw() {
        this.drawGrid();
        if (this.running) {
          this.vueCanvas.clearRect(0,0,this.canvas.width,this.canvas.height);
          this.move(this.dir);
          this.eat();
          this.drawfood();  
          this.death();
        }      
      },
      drawGrid() {
        this.vueCanvas.strokeStyle = 'white';
        for (let y = 0; y < this.canvas.height; y+=this.scale) {
          for (let x =0; x < this.canvas.width; x+=this.scale) {
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
        } else if(kc === 39){
          this.dir = 'right';
        } else if(kc === 40) {
          this.dir = 'down'
        } else if(kc === 37) {
          this.dir = 'left'
        }
      },
      eat() {
        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
          this.food.x = this.randomint(this.canvas.width / this.scale) * this.scale;
          this.food.y = this.randomint(this.canvas.height / this.scale) * this.scale;
          this.score++;
        }
      },
      startStop() {
        this.controlMessage = this.running ? 'Play' : 'Pause';
        this.running = !this.running;
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
                  // gameMode = "RESET";
                  console.log(d);
                  console.log('died');
            }
          }  
      }, die(){
        this.snake.tail = [];
        this.score = 0;
      }


    }
}  

</script>
<style scoped>

canvas {

  background-color: black;
}



</style>