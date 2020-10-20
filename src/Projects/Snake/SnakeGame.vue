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
      <v-row>
        <v-col id="instructionsContainer" class="col-md-4 col-sm-4 col-xs-12">
          <BaseCard title="Controls">
            <SnakeInstructions />
          </BaseCard>
        </v-col>

        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
          v-if="showCanvas"
          id="snakeContainer"
        >
          <SnakeCanvas
            :score="score"
            @close="showCanvas = false"
            @startGame="startGame"
            v-touch="{
              left: () => swipe('left'),
              right: () => swipe('right'),
              up: () => swipe('up'),
              down: () => swipe('down'),
            }"
          />
        </div>
        <!-- Saving score -->
        <v-col class="col-xs-12" id="saveScore">
          <BaseCard title="Snake">
            <PlayerScore
              @restartGame="showCanvas = true"
              v-if="gameState === 'end'"
              :score="currentScore"
            />
            <v-layout class="fill-height" v-else justify-center align-center>
              <BaseButton
                class="v-size--x-large"
                @click="showCanvas = true"
                title="Let's Play!"
              />
            </v-layout>
          </BaseCard>
        </v-col>

        <!-- LeaderBoard -->
        <v-col class="col-xs-12">
          <BaseCard title="Leaderboard">
            <SnakeLeaderboard v-on:LoadGame="reset()" />
          </BaseCard>
        </v-col>
        <!-- Snake Canvas -->
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import BaseCard from "../../components/BaseCard";
import BaseButton from "../../components/BaseButton";
import SnakeCanvas from "./SnakeCanvas";
import SnakeLeaderboard from "./SnakeLeaderboard";
import SnakeInstructions from "./SnakeInstructions";
import PlayerScore from "./PlayerScore";
import { roundRect, getRandomGrid } from "./helper";

export default {
  name: "Snake",
  created() {
    this.$store.dispatch("getSnakeScores");
  },
  components: {
    SnakeInstructions,
    BaseCard,
    BaseButton,
    SnakeCanvas,
    SnakeLeaderboard,
    PlayerScore,
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
      layoutObject: {
        marginTop: "0",
      },
      showCanvas: false,
    };
  },
  computed: {
    gameState() {
      return this.$store.state.SnakeGame.gameState;
    },
    currentScore: {
      get() {
        return this.$store.state.SnakeGame.currentScore;
      },
      set() {
        this.$store.commit("updateScore", this.score);
      },
    },
  },
  methods: {
    startGame() {
      this.score = 0;
      // add event listener for arrow key presses
      window.addEventListener("keydown", this.handleGlobalKeyDown);
      // find and setup canvas
      var canvas = this.$el.querySelector("canvas");
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.controlMessage = "";
      this.showInfo = false;

      // delay game start for screen to scroll to el
      setTimeout(() => {
        requestAnimationFrame(this.draw);
      }, 1000);
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
    swipe(dir) {
      if (this.snake.body.length > 1) {
        if (dir == "up" && this.dir != "down") {
          this.dir = "up";
        } else if (dir == "right" && this.dir != "left") {
          this.dir = "right";
        } else if (dir == "down" && this.dir != "up") {
          this.dir = "down";
        } else if (dir == "left" && this.dir != "right") {
          this.dir = "left";
        }
      } else {
        this.dir = dir;
      }
    },
    drawfood: function () {
      this.context.fillStyle = this.food.color;
      roundRect(
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
        roundRect(
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
      this.food.x = getRandomGrid(this.width, this.scale);
      this.food.y = getRandomGrid(this.height, this.scale);

      if (this.checkFood()) {
        return;
      }
      this.newFood();
    },
    die() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.showCanvas = false;
      this.$store.dispatch("endGame", this.score);

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
    currentThemeColor() {
      this.snake.color = this.$vuetify.theme.currentTheme.primary;
      this.food.color = this.$vuetify.theme.currentTheme.secondary;
    },
  },
};
</script>
<style scoped lang="scss">
#snakeContainer {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  display: table;
  transition: opacity 0.3s ease;
}
</style>