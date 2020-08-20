<template>
  <v-layout justify-center align-center class="snakegame fill-height">
    <v-container fluid class="pa-0 fill-height">
      <!-- Instructions -->
      <v-row class="fill-height" style="height: 100%">
        <v-col v-if="gameState === 'SETUP' || gameState === 'RUNNING'">
          <Instructions />
        </v-col>
        <!-- Snake Game -->
        <v-col v-if="gameState === 'SETUP' || gameState === 'RUNNING'" id="snakeCol">
          <v-card class="pa-4 secondary lighten-2 absolute-center">
            <v-layout column justify-center align-center>
              <h3 style="margin-bottom: 20px;" class="primary--text">Current Score: {{score}}</h3>

              <v-layout style="width: 200px; height: 200px" class="border">
                <canvas width="200" height="200" id="canvas" />
              </v-layout>

              <v-layout class="mt-4" align-center justify-center>
                <v-btn
                  id="startBtn"
                  v-if="this.controlMessage === 'Start'"
                  v-text="this.controlMessage"
                  @click="start()"
                  class="primary secondary--text center"
                ></v-btn>

                <!-- <v-btn @click="SaveImg">Save Image</v-btn> -->
              </v-layout>
            </v-layout>
          </v-card>
        </v-col>

        <!-- ScoreBoard -->
        <v-col v-if="gameState == 'END'">
          <v-layout justify-center align-center>
            <ScoreBoard
              @updateScores="updateTopScores"
              v-on:LoadGame="reset()"
              v-bind:score="this.score"
              :showSaveScore="this.showScores"
              @HideSaveScores="something"
              ref="scoreBoard"
            />
          </v-layout>
        </v-col>

        <!-- Top Scores -->
        <v-col v-if="gameState === 'SETUP' || gameState === 'RUNNING'">
          <v-card class="pa-4 pa-4 secondary lighten-2 primary--text">
            <v-layout column align-center justify-center class="primary--text">
              <h2 style="margin-bottom: 20px" class="primary--text">Top 5</h2>

              <div style="width: 100%" v-if="topFive.scores.length != 0" id="topScores">
                <v-data-table
                  id="topFiveTable"
                  hide-default-footer
                  disable-pagination
                  style="color: red"
                  disable-sort
                  class="secondary lighten-2 primary--text"
                  :headers="topFive.headers"
                  :items="topFive.scores"
                ></v-data-table>
              </div>
              <div v-else id="topScores" class="primary--text" style="padding: 0; width: 100%;">
                <h2 style="margin-bottom: 20px" class="text-center">Loading Top Scores</h2>
              </div>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import ScoreBoard from "./ScoreBoard";
import Instructions from "./Instructions";
import Axios from "axios";
export default {
  name: "Snake",
  components: {
    ScoreBoard,
    Instructions,
  },
  mounted() {
    const url = process.env.VUE_APP_API_URL + "/api/users";

    Axios.get(url)
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          res.data[index].index = index + 1;
        }

        this.topFive.scores = res.data.slice(0, 5);
      })
      .catch((err) => console.log(err));
  },
  data() {
    return {
      fpsInterval: 200, // 200 ms ~= 5 Frames Per Second
      now: 0,
      then: 0,
      elapsed: 0,
      context: null,
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
        color: "",
      },
      dir: "right",
      score: 0,
      controlMessage: "Start",
      gameState: "SETUP",
      xDown: null,
      yDown: null,
      topFive: {
        headers: [
          {
            align: "end",
            text: "Rank",
            value: "index",
            width: 1,
          },
          {
            text: "Name",
            value: "username",
            align: "center",
          },
          {
            text: "Score",
            value: "score",
            align: "end",
          },
        ],
        scores: [],
      },
      showScores: false,
    };
  },
  state: {},
  methods: {
    // SaveImg() {
    //   var canvas = document.getElementById("canvas");
    //   var img = canvas.toDataURL("image/png");
    //   document.write('<img src="' + img + '"/>');
    // },
    roundRect(context, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === "undefined") {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      context.beginPath();
      context.moveTo(x + radius.tl, y);
      context.lineTo(x + width - radius.tr, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      context.lineTo(x + width, y + height - radius.br);
      context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
      );
      context.lineTo(x + radius.bl, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      context.lineTo(x, y + radius.tl);
      context.quadraticCurveTo(x, y, x + radius.tl, y);
      context.closePath();
      if (fill) {
        context.fill();
      }
      if (stroke) {
        context.stroke();
      }
    },
    updateTopScores(newScores) {
      this.topFive.scores = newScores.slice(0, 5);
    },
    start() {
      // add event listener to listen for arrow key presses
      window.addEventListener("keydown", this.handleGlobalKeyDown);
      // Mobile control listeners
      document.addEventListener("touchstart", this.handleTouchStart, false);
      document.addEventListener("touchmove", this.handleTouchMove, false);

      // disable Scroll for mobile
      let app = document.getElementById("app");
      app.style.touchAction = "none";

      // find and setup canvas
      var canvas = this.$el.querySelector("canvas");
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
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
      this.context.fillStyle = this.food.color;
      this.roundRect(
        this.context,
        this.food.x + 2,
        this.food.y + 2,
        this.scale - 2,
        this.scale - 2,
        5,
        true,
        true
      );
    },
    updateSnake: function (x, y) {
      for (let i = 0; i < this.snake.body.length - 1; i++) {
        this.snake.body[i] = this.snake.body[i + 1];
      }
      this.snake.body[this.score] = { x, y };

      this.currentThemeColor();
      // draw snake
      this.context.fillStyle = this.snake.color;

      this.snake.body.forEach((body) => {
        this.roundRect(
          this.context,
          body.x + 2,
          body.y + 2,
          this.scale - 2,
          this.scale - 2,
          5,
          true,
          true
        );
      });
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
      switch (this.gameState) {
        case "RUNNING":
          requestAnimationFrame(this.draw);
          this.now = Date.now();
          this.elapsed = this.now - this.then;
          if (this.elapsed > 200) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.moveSnake(this.dir);
            this.death();
            this.eat();
            this.drawfood();
          }
          break;
        case "SETUP":
          this.context.fillStyle = this.fontColor;
          this.context.font = "30px Comic Sans MS";
          this.context.textAlign = "center";
          this.context.fillText("Snake", this.width / 2, this.height / 2);
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
      // re-enable scroll for mobile
      let app = document.getElementById("app");
      app.style.touchAction = "unset";

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.gameState = "END";

      // resetting game
      this.snake.body = [{ x: 0, y: 0 }];
      this.newFood();
      this.dir = "right";
      this.controlMessage = "Start";
    },
    outsideCanvas() {
      let head = this.snake.body[this.snake.body.length - 1];
      if (
        head.x < 0 ||
        head.x > this.width ||
        head.y < 0 ||
        head.y > this.height
      ) {
        console.log("Outside Canvas");
        return true;
      }
      return false;
    },
    collideWithSelf() {
      let collided = false;

      if (this.snake.body.length < 2) {
        return collided;
      }
      for (let index = 0; index < this.snake.body.length - 2; index++) {
        if (
          this.snake.body[index].x ===
            this.snake.body[this.snake.body.length - 1].x &&
          this.snake.body[index].y ===
            this.snake.body[this.snake.body.length - 1].y
        ) {
          this.food.x = this.getRandomGrid(this.width);
          collided = true;
          break;
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
#topFiveTable {
  thead {
    th {
      color: var(--v-primary-base);
    }
  }
  tr:hover {
    background: transparent;
    cursor: default;
  }
}
#canvas {
}
.border {
  border: 1px;
  border-style: solid;
  border-color: var(--v-primary-base);
  width: fit-content;
  height: fit-content;
  // margin: 0 auto;
}

canvas {
  // filter: invert(100%);
  // mix-blend-mode: difference;
  position: relative;
}
</style>