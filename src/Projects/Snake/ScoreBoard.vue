<template>
  <div id="scoreboard">
    <v-layout column justify-center>
      <v-row v-if="showScoreBoard" style="margin: 0 auto">
        <v-col>
          <h1 style="white-space: nowrap" class="text-center">Scores</h1>
        </v-col>
      </v-row>
      <v-row v-if="showScoreBoard" style=" min-width: 100%" align="center">
        <v-col class="navCol">
          <v-btn
            class="secondary"
            style="float: right;"
            rounded
            v-if="start > 0"
            @click="moveBackward()"
          >Back</v-btn>
        </v-col>
        <v-col style="padding: 0" align-self="start">
          <ol style="list-style: none; padding: 0">
            <li v-for="(score,index) in filterlist" :key="score._id">
              {{index + 1 + start}} {{score.username}}
              <span style="float: right;">{{score.score}}</span>
            </li>
          </ol>
        </v-col>
        <v-col class="navCol">
          <v-btn
            style="margin: 0 auto"
            class="primary"
            rounded
            v-if="end < scores.length"
            @click="moveForward()"
          >next</v-btn>
        </v-col>
      </v-row>
      <v-btn
        @click="playAgain"
        class="mr-4 primary"
        style="display: flex; margin: auto auto 0 auto !important; transition-timing-function: ease-in-out; "
        v-if="showScoreBoard"
      >Play again</v-btn>

      <v-col align-self="start">
        <SaveScore v-if="showScoreBoard == false" v-on:getNewScores="getScores" ref="saveScore" />
      </v-col>
    </v-layout>
  </div>
</template>
<script>
import SaveScore from "./SaveScore";

import axios from "axios";
const url = process.env.VUE_APP_API_URL + "/api/users";
export default {
  name: "ScoreBoard",
  components: {
    SaveScore,
  },
  methods: {
    getScores() {
      // TODO not delt with draws
      axios
        .get(url)
        .then((res) => {
          this.scores = res.data;
          console.log(this.scores);
          this.$emit("updateTopScore", res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      this.showScoreBoard = true;
    },
    sendScore(score) {
      this.$refs.saveScore.setScore(score);
    },
    playAgain() {
      this.$emit("LoadGame");
    },
    moveBackward() {
      console.log("Backward");
      this.start -= 10;
      this.end -= 10;
    },
    moveForward() {
      console.log("forward");
      this.start += 10;
      this.end += 10;
      // this.filterlist();
    },
  },
  data() {
    return { scores: [], showScoreBoard: false, start: 0, end: 10 };
  },
  computed: {
    filterlist: function () {
      return this.scores.slice(this.start, this.end);
    },
  },
};
</script>
<style lang="scss">
.navCol {
  display: flex;
  justify-content: center;
}
#scoreboard {
  width: 100%;
  height: 100%;
  display: inline-block;
  color: currentColor;
  li {
    font-size: 16px;
  }
  .title {
    filter: invert(100%);
    -webkit-backdrop-filter: invert(100%);
  }
}

form {
  font-size: 2vw;
}
</style>