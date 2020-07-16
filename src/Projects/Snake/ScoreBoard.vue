<template>
  <div id="scoreboard">
    <v-layout>
      <v-col>
        <h1 style>Scores</h1>
        <ol>
          <li
            v-for="score in sortedArray"
            :key="score.username"
          >{{score.username + ' '+ score.score}}</li>
        </ol>
      </v-col>
      <v-col>
        <SaveScore ref="saveScore" v-on:getNewScores="getScores()" />
      </v-col>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */

import SaveScore from "./SaveScore";

import axios from "axios";

export default {
  name: "ScoreBoard",
  mounted() {
    this.getScores();
  },
  components: {
    SaveScore
  },
  methods: {
    getScores() {
      console.log("getting new scores");
      // var x;
      axios.get("http://localhost:4000/api/users").then(res => {
        this.scores = res.data;
      });
    },
    sendScore(score) {
      this.$refs.saveScore.setScore(score);
    }
  },
  data() {
    return { scores: [] };
  },

  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      }

      return this.scores.sort(compare);
    }
  }
};
</script>
<style lang="scss">
#scoreboard {
  width: 100%;
  height: 100%;
  display: inline-block;
  // position: relative;
  text-align: center;
  color: currentColor;

  li {
    // filter: invert(100%);
    // -webkit-backdrop-filter: invert(100%);
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