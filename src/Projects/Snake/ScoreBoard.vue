<template>
  <div id="scoreboard">
    <v-layout column justify-center>
      <h1 class="text-center">Scores</h1>
      <v-row v-if="showScoreBoard" style="width: 50%; margin: 0 auto">
        <v-col>
          <!-- TODO would be nice to have dashes to link name to score, layout could also be improved -->
          <!-- TODO Display scores with crousel  -->
          <!-- TODO Add Headers -->
          <ol>
            <li v-for="score in scores" :key="score.id">{{score.username}}</li>
          </ol>
        </v-col>
        <v-col style="width: max-content; flex-grow: unset;">
          <ol style="list-style-type: none; width: max-content;">
            <li v-for="score in scores" :key="score.id">{{score.score}}</li>
          </ol>
          <v-btn
            @click="playAgain"
            class="mr-4 primary"
            style="display: flex; margin: auto auto 0 auto !important; "
            v-if="showScoreBoard"
          >Play again</v-btn>
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
const url = "https://" + process.env.VUE_APP_API_URL + "/api/users";
export default {
  name: "ScoreBoard",
  components: {
    SaveScore,
  },
  methods: {
    getScores() {
      axios
        .get(url)
        .then((res) => {
          this.scores = res.data;
          this.$emit("updateTopScore", res.data[0]);
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
  },
  data() {
    return { scores: [], showScoreBoard: false };
  },
};
</script>
<style lang="scss">
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