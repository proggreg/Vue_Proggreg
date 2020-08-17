<template>
  <v-layout justify-center align-center class="snakegame fill-height" style="touch-action: none;">
    <v-container fluid class="pa-0 fill-height" style="touch-action: none;">
      <v-row class="fill-height" style="height: 100%">
        <v-col v-if="showScores === false"></v-col>
        <v-col v-if="gameState === 'SETUP' || gameState === 'RUNNING'" id="snakeCol">
          <h3 style="margin-bottom: 20px" class="text-center primary--text">Current Score: {{score}}</h3>
          <v-layout class="border">
            <canvas width="200" height="200" class="absolute-center" id="canvas" />
          </v-layout>
          <v-btn
            id="startBtn"
            v-if="this.controlMessage =='Start'"
            v-text="this.controlMessage"
            @click="start()"
            class="mr-4 primary secondary--text"
            style="display: flex; margin: 20px auto 0 auto !important; "
          ></v-btn>
        </v-col>
        <ScoreBoard
          v-if="gameState == 'END'"
          @updateScores="updateTopScores"
          v-on:LoadGame="reset()"
          ref="scoreBoard"
        />
        <v-col v-if="showScores === false">
          <v-layout justify-center>
            <div v-if="topFiveScores.length != 0" id="topScores" style="padding: 0; width: 100%;">
              <h2 style="margin-bottom: 20px" class="text-center primary--text">Top 5 Scores</h2>
              <v-list style="background: none">
                <v-list-item v-for="(score,i) in topFiveScores" :key="score._id">
                  <v-list-item-content>
                    <v-layout>
                      <v-col style="flex-grow: 0">
                        <h3 class="primary--text">{{i+1}}</h3>
                      </v-col>
                      <v-col>
                        <v-list-item-title class="primary--text">{{score.username}}</v-list-item-title>
                      </v-col>
                      <v-col>
                        <v-list-item-subtitle
                          style="float: right;"
                          class="primary--text"
                        >{{score.score}}</v-list-item-subtitle>
                      </v-col>
                    </v-layout>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div v-else id="topScores" style="padding: 0; width: 100%;">
              <h2 style="margin-bottom: 20px" class="text-center primary--text">Loading Top Scores</h2>
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import ScoreBoard from "./ScoreBoard";
import Axios from "axios";
export default {
  name: "Snake",
  components: {
    ScoreBoard,
  },
  mounted() {
    const url = process.env.VUE_APP_API_URL + "/api/users";

    // window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    Axios.get(url)
      .then((res) => {
        this.topFiveScores = res.data.slice(0, 5);
      })
      .catch((err) => console.log(err));
  },
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
        color: "",
      },
      food: {
        x: 100,
        y: 100,
        color: "rgb(178, 0, 0)",
      },
      dir: "right",
      score: 0,
      controlMessage: "Start",
      gameState: "SETUP",
      frameRate: 0,
      xDown: null,
      yDown: null,
      showScores: false,
      topFiveScores: [],
      showTopFive: true,
    };
  },
  methods: {
    disableScroll() {
      // TODO impletment this
      // Get the current page scroll position
      // let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      //   // if any scroll is attempted, set this to the previous value
      //   (window.onscroll = function () {
      //     window.scrollTo(scrollLeft, scrollTop);
      //   });
    },
    updateTopScores(newScores) {
      this.topFiveScores = newScores.slice(0, 5);
      this.showScoreBoard();
    },
    showScoreBoard() {
      this.showTopFive = false;
      this.showScores = true;
      this.$mount();
      this.$refs.scoreBoard.showScoreBoard = true;
    },
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

      let vm = this.$parent;
      while (vm) {
        vm.$emit("gameStarted");
        vm = vm.$parent;
      }
    },
    getRandomGrid(max) {
      return (
        Math.floor(Math.random() * Math.floor(max / this.scale)) * this.scale
      );
    },
    drawfood: function () {
      this.vueCanvas.beginPath();
      this.vueCanvas.fillStyle = this.food.color;
      this.vueCanvas.rect(this.food.x, this.food.y, this.scale, this.scale);
      this.vueCanvas.fill();
    },
    updateSnake: function (x, y) {
      for (let i = 0; i < this.snake.body.length - 1; i++) {
        this.snake.body[i] = this.snake.body[i + 1];
      }
      this.snake.body[this.score] = { x, y };

      // TODO implement rounded corners
      // TODO get primary color from vuetify theme
      this.currentThemeColor();
      // draw snake
      this.vueCanvas.fillStyle = this.snake.color;
      // this.vueCanvas.lineJoin = "round";
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
      // prevent snake from going in oppsite direction and eating self
      if (this.snake.body.length > 1) {
        if (kc === 38 && this.dir != "down") {
          this.dir = "up";
        } else if (kc === 39 && this.dir != "left") {
          this.dir = "right";
        } else if (kc === 40 && this.dir != "up") {
          this.dir = "down";
        } else if (kc === 37 && this.dir != "right") {
          this.dir = "left";
        }
      } else {
        if (kc === 38) {
          this.dir = "up";
        } else if (kc === 39) {
          this.dir = "right";
        } else if (kc === 40) {
          this.dir = "down";
        } else if (kc === 37) {
          this.dir = "left";
        }
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

      this.gameState = "END";
      this.$mount();
      this.$refs.scoreBoard.sendScore(this.score);

      // resetting game
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
      this.gameState = "SETUP";
      this.showScores = false;
    },
    getTouches(evt) {
      return evt.touches || evt.originalEvent.touches;
    },
    handleTouchStart(evt) {
      const firstTouch = this.getTouches(evt)[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },
    handleTouchMove(evt) {
      let length = this.snake.body.length;
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

          // TODO doesn't prevent snake from going in opposite direction
          if (length > 1 && this.dir != "right") {
            this.dir = "left";
          } else {
            this.dir = "left";
          }
        } else {
          /* right swipe */
          if (length > 1 && this.dir != "left") {
            this.dir = "right";
          } else {
            this.dir = "right";
          }
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          if (length > 1 && this.dir != "down") {
            this.dir = "up";
          } else {
            this.dir = "up";
          }
        } else {
          /* down swipe */
          if (length > 1 && this.dir != "up") {
            this.dir = "down";
          } else {
            this.dir = "down";
          }
        }
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    },
    currentThemeColor() {
      // TODO improvement only change when theme is changed
      var elem = document.getElementById("app");
      var c = getComputedStyle(elem).getPropertyValue("--v-primary-base");
      this.snake.color = c;

      var fc = getComputedStyle(elem).getPropertyValue("--v-accent-base");
      this.food.color = fc;
    },
  },
};
</script>
<style lang="scss">
#canvas {
  touch-action: none;
}
.border {
  border: 1px;
  border-style: solid;
  border-color: var(--v-primary-base);
  width: fit-content;
  height: 202px;
  margin: 0 auto;
}

canvas {
  // filter: invert(100%);
  // mix-blend-mode: difference;
  position: relative;
}
</style>