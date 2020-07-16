


<template>
  <div class="snakegame">
    <v-container fluid>
      <v-row>
        <v-col>
          <h3 class="text-center">Current Score: {{score}}</h3>
          <v-layout class="border">
            <canvas class="absolute-center" id="canvas" />
          </v-layout>
          <v-btn
            v-text="controlMessage"
            @click="startStop()"
            class="mr-4 primary"
            style="display: flex; margin: 20px auto 0 auto !important; "
          >Save</v-btn>
        </v-col>

        <v-col>
          <ScoreBoard ref="scoreBoard" />
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
    ScoreBoard
  },
  mounted() {
    var canvas = this.$el.querySelector("canvas");
    this.canvas = canvas;
    this.vueCanvas = this.canvas.getContext("2d");
    this.vueCanvas.left = "400px";
    this.food = {
      x: this.getRandomGrid(canvas.width),
      y: this.getRandomGrid(canvas.height)
    };
    this.timer = setInterval(this.draw, 200); // draw every 200ms (5 Frames per second)
    window.addEventListener("keydown", this.handleGlobalKeyDown);

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
        tail: [{ x: 0, y: 0 }]
      },
      food: {
        x: this.getRandomGrid(this.width),
        y: this.getRandomGrid(this.height)
      },
      timer: null,
      dir: "right",
      score: 0,
      controlMessage: "Play",
      gameState: "SETUP",
      fontColor: this.$vuetify.theme.themes.light.primary
    };
  },
  methods: {
    getRandomGrid(max) {
      return (
        Math.floor(Math.random() * Math.floor(max / this.scale)) * this.scale
      );
    },
    invertColor: function(rgb) {
      /* eslint-disable*/
      rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
      }
      return rgb;
    },
    drawfood: function() {
      this.vueCanvas.beginPath();
      this.vueCanvas.rect(this.food.x, this.food.y, this.scale, this.scale);
      this.vueCanvas.fillStyle = "red";
      this.vueCanvas.fill();
    },
    snakePos: function(x, y) {
      // update snakes position
      this.snake.x = x;
      this.snake.y = y;
      // if (this.score === this.snake.tail.length) {
      for (let i = 0; i < this.snake.tail.length - 1; i++) {
        this.snake.tail[i] = this.snake.tail[i + 1];
      }
      // }
      this.snake.tail[this.score] = { x, y };

      // draw snake
      this.vueCanvas.beginPath();
      for (let i = 0; i < this.snake.tail.length; i++) {
        this.vueCanvas.fillStyle = "rgb(0, 255, 0)";
        this.vueCanvas.fillRect(
          this.snake.tail[i].x,
          this.snake.tail[i].y,
          this.scale,
          this.scale
        ); // tail
      }
    },
    move(d) {
      if (d === "up") {
        this.snakePos(this.snake.x, this.snake.y - this.scale);
      } else if (d === "right") {
        this.snakePos(this.snake.x + this.scale, this.snake.y);
      } else if (d === "down") {
        this.snakePos(this.snake.x, this.snake.y + this.scale);
      } else if (d === "left") {
        this.snakePos(this.snake.x - this.scale, this.snake.y);
      }
    },
    draw() {
      this.vueCanvas.tra;
      this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
      switch (this.gameState) {
        case "RUNNING":
          this.move(this.dir);
          this.eat();
          this.drawfood();
          this.death();
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
          this.snake.x = 0;
          this.snake.y = 0;
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
      if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
        this.newFood();
        this.score++;
      }
    },
    startStop() {
      this.controlMessage = this.running ? "Play" : "";
      this.running = !this.running;
      if (this.running || this.gameState === "RESET") {
        this.gameState = "RUNNING";
      }
    },
    newFood() {
      let foodok = true;
      for (let i = 0; i < this.snake.tail.length; i++) {
        if (
          this.food.x === this.snake.tail[i].x &&
          this.food.y === this.snake.tail[i].y
        ) {
          this.food.x = this.getRandomGrid(this.width);
          this.food.y = this.getRandomGrid(this.height);
          foodok = false;
          console.log("food landed on snake");
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
      // didn't die straight away once left screen, need to investigate and fix
      if (
        this.snake.x < 0 ||
        this.snake.x > this.canvas.width ||
        this.snake.y < 0 ||
        this.snake.y > this.canvas.height
      ) {
        this.die();
      }

      for (let i = 1; i < this.snake.tail.length - 1; i++) {
        let pos = this.snake.tail[i];
        let d = Math.sqrt(
          Math.pow(this.snake.x - pos.x, 2) + Math.pow(this.snake.y - pos.y, 2)
        );
        if (d < 1) {
          this.die();
          this.gameState = "RESET";
          console.log(d);
          console.log("died");
        }
      }
    },
    die() {
      this.snake.tail = [];
      // this.$emit("gameEnd", this.score);
      this.$refs.scoreBoard.sendScore(this.score);
      this.score = 0;
      this.gameState = "RESET";
    }
  }
};
</script>
<style lang="scss">
.snakegame {
  // background-color: grey;
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
  -webkit-filter: invert(100%);
  mix-blend-mode: difference;
  position: relative;
}
</style>