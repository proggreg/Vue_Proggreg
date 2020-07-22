<template>
  <div id="scoreboard">
    <v-layout column justify-center>
      <v-btn
        @click="playAgain"
        class="mr-4 primary"
        style="display: flex; margin: auto auto 0 auto !important; "
        v-if="showScoreBoard"
      >Play again</v-btn>
      <h1 class="text-center">Scores</h1>
      <v-row v-if="showScoreBoard" style="width: 50%; margin: 0 auto">
        <v-col>
          <!-- would be nice to have dashes to link name to score, layout could also be improved -->
          <ol>
            <li v-for="score in sortedArray" :key="score.id">{{score.username}}</li>
          </ol>
        </v-col>
        <v-col style="width: max-content; flex-grow: unset;">
          <ol style="list-style-type: none; width: max-content;">
            <li v-for="score in sortedArray" :key="score.id">{{score.score}}</li>
          </ol>
        </v-col>
      </v-row>

      <v-col>
        <SaveScore v-if="showScoreBoard == false" v-on:getNewScores="getScores" ref="saveScore" />
      </v-col>
    </v-layout>
  </div>
</template>
<script>
import SaveScore from "./SaveScore";

import axios from "axios";

export default {
  name: "ScoreBoard",
  components: {
    SaveScore,
  },
  methods: {
    getScores() {
      axios.get("http://localhost:4000/api/users").then((res) => {
        this.scores = res.data;
      });

      this.showScoreBoard = true;
    },
    sendScore(score) {
      this.$refs.saveScore.setScore(score);
    },
    playAgain() {
      this.$emit("LoadGame");
    },
  },
  data() {
    return { scores: [], showScoreBoard: false };
  },

  computed: {
    sortedArray: function () {
      function compare(a, b) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.scores.sort(compare);
    },
  },
};
</script>
<style lang="scss">
#scoreboard {
  width: 100%;
  height: 100%;
  display: inline-block;

  // text-align: center;
  color: currentColor;

  li {
    font-size: 0.8vw;
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