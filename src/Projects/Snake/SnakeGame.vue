<template>
  <div class="snakegame">
    <v-container fluid>
      <v-row>
        <v-col v-if="gameState === 'SETUP' || gameState === 'RUNNING'" id="snakeCol">
          <h3 class="text-center">Current Score: {{score}}</h3>
          <v-card-text v-model="dir" v-text="dir" class="text-center"></v-card-text>
          <v-layout class="border">
            <canvas width="200" height="200" class="absolute-center" id="canvas" />
          </v-layout>
          <v-btn
            v-if="this.controlMessage =='Start'"
            v-text="this.controlMessage"
            @click="start()"
            class="mr-4 primary"
            style="display: flex; margin: 20px auto 0 auto !important; "
          ></v-btn>
        </v-col>
        <v-col style="flex-basis: unset">
          <ScoreBoard v-on:LoadGame="this.reset" v-if="gameState === 'END'" ref="scoreBoard" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ScoreBoard from "./ScoreBoard";
export default {
  name: "Snake",
  components: {
    ScoreBoard,
  },
  mounted() {},
  data() {
    return {
      fpsInterval: 200, // 5 Frames Per Second
      now: 0,
      then: 0,
      elapsed: 0,
      vueCanvas: null,
      canvas: null,
      width: 200,
      height: 200,
      scale: 20,
      snake: {
        body: [{ x: 0, y: 0 }],
      },
      food: {
        x: 100,
        y: 100,
      },
      dir: "right",
      score: 0,
      controlMessage: "Start",
      gameState: "SETUP",
      frameRate: 0,
      xDown: null,
      yDown: null,
    };
  },
  methods: {
    start() {
      // add event listener to listen for arrow key presses
      window.addEventListener("keydown", this.handleGlobalKeyDown);

      // Mobile control listeners
      document.addEventListener("touchstart", this.handleTouchStart, false);
      document.addEventListener("touchmove", this.handleTouchMove, false);

      // find and setup canvas
      var canvas = this.$el.querySelector("canvas");
      this.canvas = canvas;
      this.vueCanvas = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.controlMessage = "";
      this.running = !this.running;
      this.gameState = "RUNNING";
      requestAnimationFrame(this.draw);
    },
    getRandomGrid(max) {
      return (
        Math.floor(Math.random() * Math.floor(max / this.scale)) * this.scale
      );
    },
    drawfood: function () {
      this.vueCanvas.beginPath();
      this.vueCanvas.fillStyle = "red";
      this.vueCanvas.rect(this.food.x, this.food.y, this.scale, this.scale);
      this.vueCanvas.fill();
    },
    updateSnake: function (x, y) {
      for (let i = 0; i < this.snake.body.length - 1; i++) {
        this.snake.body[i] = this.snake.body[i + 1];
      }
      this.snake.body[this.score] = { x, y };

      // draw snake
      this.vueCanvas.fillStyle = "rgb(0,255,0)";
      this.snake.body.forEach((body) =>
        this.vueCanvas.fillRect(body.x, body.y, this.scale, this.scale)
      );
    },
    moveSnake(d) {
      let headpos = this.snake.body.length - 1;
      if (d === "up") {
        this.updateSnake(
          this.snake.body[headpos].x,
          this.snake.body[headpos].y - this.scale
        );
      } else if (d === "right") {
        this.updateSnake(
          this.snake.body[headpos].x + this.scale,
          this.snake.body[headpos].y
        );
      } else if (d === "down") {
        this.updateSnake(
          this.snake.body[headpos].x,
          this.snake.body[headpos].y + this.scale
        );
      } else if (d === "left") {
        this.updateSnake(
          this.snake.body[headpos].x - this.scale,
          this.snake.body[headpos].y
        );
      }
    },
    draw() {
      requestAnimationFrame(this.draw);

      this.now = Date.now();
      this.elapsed = this.now - this.then;
      switch (this.gameState) {
        case "RUNNING":
          this.death();
          if (this.elapsed > 200) {
            this.vueCanvas.clearRect(
              0,
              0,
              this.canvas.width,
              this.canvas.height
            );
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.moveSnake(this.dir);
            this.eat();
            this.drawfood();
            this.frameRate += 1;
          }
          break;
        case "SETUP":
          this.vueCanvas.fillStyle = this.fontColor;
          this.vueCanvas.font = "30px Comic Sans MS";
          this.vueCanvas.textAlign = "center";
          this.vueCanvas.fillText("Snake", this.width / 2, this.height / 2);
          break;
        case "RESET":
          this.vueCanvas.fillStyle = this.fontColor;
          this.vueCanvas.font = "30px Comic Sans MS";
          this.vueCanvas.textAlign = "center";
          this.vueCanvas.fillText("You Died", this.width / 2, this.height / 2);
          this.running = false;
          this.controlMessage = "Play";
          this.dir = "right";
          break;

        default:
          break;
      }
    },
    handleGlobalKeyDown(e) {
      var kc = e.keyCode;
      if (kc === 38) {
        this.dir = "up";
      } else if (kc === 39) {
        this.dir = "right";
      } else if (kc === 40) {
        this.dir = "down";
      } else if (kc === 37) {
        this.dir = "left";
      }
    },
    eat() {
      if (
        this.snake.body[this.score].x === this.food.x &&
        this.snake.body[this.score].y === this.food.y
      ) {
        this.newFood();
        this.score++;
      }
    },
    checkFood() {
      let foodok = true;
      this.snake.body.forEach((body) => {
        if (body.x == this.food.x && body.y == this.food.y) {
          foodok = false;
        }
      });
      return foodok;
    },
    newFood() {
      this.food.x = this.getRandomGrid(this.width);
      this.food.y = this.getRandomGrid(this.height);

      if (this.checkFood()) {
        return;
      }
      this.newFood();
    },
    die() {
      this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // reset game
      this.gameState = "END";
      this.$mount();
      this.$refs.scoreBoard.sendScore(this.score);
      this.snake.body = [{ x: 0, y: 0 }];
      this.snake.x = 0;
      this.snake.y = 0;
      this.dir = "right";
      this.score = 0;
      this.controlMessage = "Start";
    },
    outsideCanvas() {
      let head = this.snake.body[this.snake.body.length - 1];
      if (head.x < 0 || head.x > 200 || head.y < 0 || head.y > 200) {
        return true;
      }
      return false;
    },
    collideWithSelf() {
      let collided = false;
      for (let index = 0; index < this.snake.body.length - 2; index++) {
        if (
          this.snake.body[index].x ===
            this.snake.body[this.snake.body.length - 1].x &&
          this.snake.body[index].y ===
            this.snake.body[this.snake.body.length - 1].y
        ) {
          collided = true;
        }
      }
      return collided;
    },
    death() {
      if (this.outsideCanvas() || this.collideWithSelf()) {
        this.die();
      }
    },
    reset() {
      console.log("reset");
      this.gameState = "SETUP";
    },
    getTouches(evt) {
      console.log("hello");
      return (
        evt.touches || evt.originalEvent.touches // browser API
      ); // jQuery
    },
    handleTouchStart(evt) {
      const firstTouch = this.getTouches(evt)[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },
    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* left swipe */

          this.dir = "left";
        } else {
          /* right swipe */
          this.dir = "right";
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          this.dir = "up";
        } else {
          /* down swipe */
          this.dir = "down";
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    },
  },
};
</script>
<style lang="scss">
.snakegame {
  touch-action: none;
}
.border {
  border: 1px;
  border-style: solid;
  border-color: currentColor;
  width: fit-content;
  height: 202px;
  margin: 0 auto;
}

canvas {
  filter: invert(100%);
  mix-blend-mode: difference;
  position: relative;
}
</style>