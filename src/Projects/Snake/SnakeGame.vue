<template>
  <v-layout
    :style="layoutObject"
    id="SnakeGame"
    justify-center
    align-center
    class="snakegame fill-height"
  >
    <v-container fluid class="pa-0">
      <!-- Instructions -->
      <v-row class>
        <v-col cols="12" id="instructionsContainer" class="col-md-4">
          <BaseCard
            @hideShow="isMobile() ? moveUp($event) : ''"
            :style="isMobile ? 'float: right' : ''"
            :keepTitle="true"
            :iconRight="isMobile() ? true : false"
            :collapsible="true"
            title="Controls"
          >
            <Instructions />
          </BaseCard>
        </v-col>
        <!-- Snake Canvas -->
        <v-col
          class="col-md-4"
          v-if="gameState == 'setup' || gameState === 'running'"
          id="snakeCol"
        >
          <BaseCard>
            <SnakeCanvas @startGame="start" />
          </BaseCard>
        </v-col>
        <v-col class="col-md-4" v-if="gameState === 'end'" id="saveScore">
          <BaseCard>
            <SaveScore :score="score" />
          </BaseCard>
        </v-col>

        <!-- ScoreBoard -->
        <v-col>
          <BaseCard>
            <ScoreBoard @updateScores="updateTopScores" v-on:LoadGame="reset()" />
          </BaseCard>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
/*eslint-disable */
import BaseCard from "../../components/BaseCard";
import SnakeCanvas from "./SnakeCanvas";
import ScoreBoard from "./ScoreBoard";
import Instructions from "./Instructions";
import SaveScore from "./SaveScore";

export default {
  name: "Snake",
  created() {
    this.$store.dispatch("getSnakeScores");
  },
  components: {
    Instructions,
    BaseCard,
    SnakeCanvas,
    ScoreBoard,
    SaveScore,
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
      xDown: null,
      yDown: null,
      layoutObject: {
        marginTop: "0",
      },
    };
  },
  computed: {
    gameState() {
      return this.$store.state.SnakeGame.gameState;
    },
  },
  methods: {
    moveUp(hideShow) {
      this.layoutObject.marginTop = hideShow ? "0px" : "-50px";
    },
    isMobile: mobileCheck,
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
      return (this.topFiveScores.scores = newScores.slice(0, 5));
    },
    start() {
      this.score = 0;
      // add event listener to listen for arrow key presses
      window.addEventListener("keydown", this.handleGlobalKeyDown);
      // Mobile control listeners
      this.$el.addEventListener("touchstart", this.handleTouchStart, false);
      this.$el.addEventListener("touchmove", this.handleTouchMove, false);

      // disable Scroll for mobile
      this.$emit("preventScroll");

      // Scroll to element
      this.$vuetify.goTo(this.$el);

      // find and setup canvas
      var canvas = this.$el.querySelector("canvas");
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.controlMessage = "";
      this.showInfo = false;

      this.$store.commit("startGame");

      // delay game start for screen to scroll to el
      setTimeout(() => {
        requestAnimationFrame(this.draw);
      }, 1000);
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
        this.scale - 4,
        this.scale - 4,
        5,
        true,
        true
      );
    },
    updateSnake: function (x, y) {
      // update snakes position (tail and body)
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
          this.scale - 4,
          this.scale - 4,
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
      if (this.gameState === "running") {
        requestAnimationFrame(this.draw);
      }
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

      this.$store.commit("endGame");

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
      this.$store.commit("resetGame");
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
      this.snake.color = this.$vuetify.theme.currentTheme.primary;
      this.food.color = this.$vuetify.theme.currentTheme.secondary;
    },
  },
};
</script>
<style lang="scss">
</style>