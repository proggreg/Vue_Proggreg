<template>
  <div id="scoreboard">
    <v-layout column justify-center>
      <v-row v-if="showScoreBoard" style="margin: 0 auto">
        <v-col>
          <h1 style="white-space: nowrap" class="text-center primary--text">Scores</h1>
        </v-col>
      </v-row>
      <v-row v-if="showScoreBoard" style=" min-width: 100%" align="center">
        <v-col class="navCol">
          <v-btn
            class="secondary primary--text"
            style="float: right;"
            rounded
            v-if="start > 0"
            @click="moveBackward()"
          >Back</v-btn>
        </v-col>
        <v-col style="padding: 0" align-self="start">
          <v-list dense style="background: none">
            <v-list-item
              style="padding:0; margin:0;"
              v-for="(score,i) in filterlist"
              :key="score._id"
            >
              <v-list-item-content style="padding: 0">
                <v-layout>
                  <v-col style="flex-grow: 0">
                    <h3 class="primary--text">{{start+i+1}}</h3>
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
        </v-col>
        <v-col class="navCol">
          <v-btn
            style="margin: 0 auto"
            class="primary secondary--text"
            rounded
            v-if="end < scores.length"
            @click="moveForward()"
          >next</v-btn>
        </v-col>
      </v-row>

      <v-col align-self="start">
        <SaveScore v-if="showScoreBoard == false" v-on:getNewScores="getScores" ref="saveScore" />
      </v-col>
      <v-btn
        @click="playAgain"
        class="mr-4 primary secondary--text"
        style="display: flex; margin: auto auto 0 auto !important; transition-timing-function: ease-in-out; "
      >Play again</v-btn>
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
  beforeUpdate: function () {
    var data;
    axios
      .get(url)
      .then((res) => {
        data = res.data;
        this.scores = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getScores() {
      // TODO not delt with draws

      var data;
      axios
        .get(url)
        .then((res) => {
          data = res.data;
          this.scores = data;
        })
        .catch((err) => {
          console.log(err);
        });

      this.$emit("updateTopScore");
    },
    sendScore(score) {
      this.$refs.saveScore.setScore(score);
    },
    playAgain() {
      this.$emit("LoadGame");
      this.showScoreBoard = false;
      this.$mount();
    },
    moveBackward() {
      this.start -= 10;
      this.end -= 10;
    },
    moveForward() {
      this.start += 10;
      this.end += 10;
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