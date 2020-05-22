


<template>
  <div class="snakegame">
      <canvas  width="400" height="400" id='canvas'/> 

      <button @click="eat()">click</button>
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
        x: 0,
        y: 0
      }
      this.timer = setInterval(this.draw,200);
      this.snakePos(0,0);
      window.addEventListener("keydown",this.handleGlobalKeyDown);
    },
    data: function() {
      return {
        canvas: null,
        vueCanvas: null,
        scale: 20,
        snake: {
          x: 0,
          y: 0
        } ,
        timer: null,
        keyCode: '',
        dir: 'right',
        score: 0
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
        // console.log('move snake')
        this.snake.x  = x;
        this.snake.y  = y;

       

        this.vueCanvas.beginPath();
        this.vueCanvas.rect(this.snake.x,this.snake.y,this.scale,this.scale);
        for (var i = 0; i < this.snake.tail.length; i++) {
          this.vueCanvas.rect(this.snake.tail[i].x,this.snake.tail[i].y,this.scale,this.scale); // tail
        }
        this.vueCanvas.fillStyle = 'green';
        this.vueCanvas.fill();
      },
      move(d) {
        // console.log(d);
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
        this.vueCanvas.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.move(this.dir);
        this.eat();
        this.drawfood();        
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

          this.snake.tail.push({x: 20,y:20});
        }

        console.log(this.snake.tail);
        

      }
      
    }
}


// function checkKeyPress(key) {
//         var kc = key.keyCode
//         if (kc === 38) {
//           this.dir = 'up'
//         } else if(kc === 39){
//             this.dir = 'right'
//         } else if(kc === 40) {
//           this.dir = 'down'
//         } else if(kc === 37) {
//           this.dir = 'left'
//         }

//         this.$el.move(this.dir);
//         console.log(this.dir);
//       }
// window.addEventListener("keydown", checkKeyPress, false);


  

</script>
<style scoped>

canvas {

  background-color: black;
}



</style>